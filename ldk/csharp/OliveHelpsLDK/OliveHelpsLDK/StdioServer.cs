using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Plugin;

namespace OliveHelpsLDK
{
    public class StdioServer : Plugin.GRPCStdio.GRPCStdioBase
    {
        public override async Task StreamStdio(Empty request, IServerStreamWriter<StdioData> responseStream, ServerCallContext context)
        {
            
        }
    }
}