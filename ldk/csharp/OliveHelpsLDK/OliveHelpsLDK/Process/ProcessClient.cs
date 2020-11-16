using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Proto;

namespace OliveHelpsLDK.Process
{
    internal class ProcessClient : BaseClient<Proto.Process.ProcessClient>, IProcessService
    {
        internal ProcessClient(ChannelBase channelBase, Session session)
        {
            _client = new Proto.Process.ProcessClient(channelBase);
            _session = session;
        }

        public Task<ProcessInfo[]> Query(CancellationToken cancellationToken = default)
        {
            var request = new ProcessStateRequest
            {
                Session = CreateSession(),
            };
            return _client.ProcessStateAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(task => FromProto(task.Result), cancellationToken);
        }

        public IStreamingCall<ProcessEvent> Stream(CancellationToken cancellationToken = default)
        {
            var request = new ProcessStateStreamRequest
            {
                Session = CreateSession(),
            };
            var call = _client.ProcessStateStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<ProcessStateStreamResponse,ProcessEvent>(call, FromProto);
        }

        private static ProcessInfo FromProto(Proto.ProcessInfo info)
        {
            return new ProcessInfo
            {
                Arguments = info.Arguments,
                Command = info.Command,
                Pid = info.Pid
            };
        }

        private static ProcessEventAction FromProto(ProcessAction action)
        {
            return action switch
            {
                ProcessAction.Unknown => ProcessEventAction.Unknown,
                ProcessAction.Started => ProcessEventAction.Started,
                ProcessAction.Stopped => ProcessEventAction.Stopped,
                _ => throw new ArgumentOutOfRangeException(nameof(action), action, null),
            };
        }

        private static ProcessEvent FromProto(ProcessStateStreamResponse response)
        {
            return new ProcessEvent
            {
                Action = FromProto(response.Action),
                Process = FromProto(response.Process)
            };
        }

        private static ProcessInfo[] FromProto(ProcessStateResponse response)
        {
            return response.Processes.Select(process => FromProto(process)).ToArray();
        }
    }
}