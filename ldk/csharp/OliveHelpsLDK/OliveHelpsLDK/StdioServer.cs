using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Plugin;

namespace OliveHelpsLDK
{
    public class StdioServer : GRPCStdio.GRPCStdioBase
    {
        public override async Task StreamStdio(Empty request, IServerStreamWriter<StdioData> responseStream,
            ServerCallContext context)
        {
            while (true)
            {
                await Task.Delay(1000);
            }
        }
    }
}