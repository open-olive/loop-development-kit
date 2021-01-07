using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Process
{
    internal class ProcessClient : BaseClient<Proto.Process.ProcessClient>, IProcessService
    {
        internal ProcessClient(Proto.Process.ProcessClient client, Session session, ILogger logger) : base(
            client, session, logger, "process")
        {
        }

        internal ProcessClient(CallInvoker channelBase, Session session, ILogger logger) : this(
            new Proto.Process.ProcessClient(channelBase), session, logger)
        {
        }

        public Task<ProcessInfo[]> Query(CancellationToken cancellationToken = default)
        {
            var request = new ProcessStateRequest
            {
                Session = CreateSession(),
            };
            var loggedParser = LoggedParser<Task<ProcessStateResponse>, ProcessInfo[]>(task => FromProto(task.Result));
            return Client.ProcessStateAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<ProcessEvent> Stream(CancellationToken cancellationToken = default)
        {
            var request = new ProcessStateStreamRequest
            {
                Session = CreateSession(),
            };
            var call = Client.ProcessStateStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<ProcessStateStreamResponse, ProcessEvent>(FromProto);
            return new StreamingCall<ProcessStateStreamResponse, ProcessEvent>(call, loggedParser);
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
            return response.Processes.Select(FromProto).ToArray();
        }
    }
}