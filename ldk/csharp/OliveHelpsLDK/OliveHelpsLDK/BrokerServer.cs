using System;
using System.Threading.Tasks;
using Grpc.Core;
using Plugin;

namespace OliveHelpsLDK
{
    public class BrokerServer : Plugin.GRPCBroker.GRPCBrokerBase
    {
        public override async Task StartStream(IAsyncStreamReader<ConnInfo> requestStream,
            IServerStreamWriter<ConnInfo> responseStream, ServerCallContext context)
        {
            while (await requestStream.MoveNext())
            {
                var connInfo = requestStream.Current;
                Console.Error.WriteLine($"connInfo #{connInfo.Address} #{connInfo.Network} #{connInfo.ServiceId}");
            }
        }
    }
}