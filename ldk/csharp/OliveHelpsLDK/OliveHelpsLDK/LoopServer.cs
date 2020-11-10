using System;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Proto;
using Process = System.Diagnostics.Process;
using System.Text.Json;

namespace OliveHelpsLDK
{
    public class LoopServer : Proto.Loop.LoopBase
    {
        public static async void Start()
        {
            var loopServer = new LoopServer();
            Server server = new Server
            {
                Services =
                {
                    Proto.Loop.BindService(loopServer),
                    Plugin.GRPCBroker.BindService(new BrokerServer()),
                    Plugin.GRPCStdio.BindService(new StdioServer())
                },
                Ports = {new ServerPort("localhost", 0, ServerCredentials.Insecure)}
            };
            server.Start();
            var currentPort = server.Ports.First();
            Console.Out.WriteLine($"1|1|tcp|127.0.0.1:{currentPort.BoundPort}|grpc");
            Process.GetCurrentProcess().WaitForExit();
        }

        public override async Task<Empty> LoopStart(LoopStartRequest request, ServerCallContext context)
        {
            var requestJson = JsonSerializer.Serialize(request);
            await Console.Error.WriteLineAsync("Received Loop Start Request");
            Console.Error.WriteLine(request);
            return new Empty();
        }

        public override async Task<Empty> LoopStop(Empty request, ServerCallContext context)
        {
            await Console.Error.WriteLineAsync("Received Loop Stop Request");
            return new Empty();
        }
    }
    
    
}