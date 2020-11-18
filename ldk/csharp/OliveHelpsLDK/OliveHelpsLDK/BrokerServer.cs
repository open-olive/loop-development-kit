using System;
using System.Threading.Tasks;
using Grpc.Core;
using Plugin;

namespace OliveHelpsLDK
{
    public struct ConnectionInfo
    {
        public string Network;

        public uint ServiceId;

        public string Address;
    }

    
    public class BrokerServer : GRPCBroker.GRPCBrokerBase
    {
        private readonly TaskCompletionSource<ConnectionInfo> tcs = new TaskCompletionSource<ConnectionInfo>();

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
                tcs.SetResult(conStruct);
                Console.Error.WriteLine($"[INFO] connInfo #{connInfo.Address} #{connInfo.Network} #{connInfo.ServiceId}");
            }
        }

        public Task<ConnectionInfo> ConnectionInfo => tcs.Task;
    }
}