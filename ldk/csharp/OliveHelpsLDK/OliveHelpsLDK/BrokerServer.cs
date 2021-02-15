using System;
using System.Threading.Tasks;
using Grpc.Core;
using Plugin;

namespace OliveHelpsLDK
{
    internal struct ConnectionInfo
    {
        public string Network;

        public uint ServiceId;

        public string Address;
    }


    internal class BrokerServer : GRPCBroker.GRPCBrokerBase
    {
        private TaskCompletionSource<ConnectionInfo> TaskCompletionSource { get; } =
            new TaskCompletionSource<ConnectionInfo>();

        public override async Task StartStream(IAsyncStreamReader<ConnInfo> requestStream,
            IServerStreamWriter<ConnInfo> responseStream, ServerCallContext context)
        {
            while (await requestStream.MoveNext())
            {
                var connInfo = requestStream.Current;
                var conStruct = new ConnectionInfo
                {
                    Network = connInfo.Network,
                    Address = connInfo.Address,
                    ServiceId = connInfo.ServiceId
                };
                TaskCompletionSource.SetResult(conStruct);
                Console.Error.WriteLine(
                    $"[INFO] connInfo #{connInfo.Address} #{connInfo.Network} #{connInfo.ServiceId}");
            }
        }

        public Task<ConnectionInfo> ConnectionInfo => TaskCompletionSource.Task;
    }
}