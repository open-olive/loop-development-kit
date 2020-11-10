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
    public struct Session
    {
        public string LoopId;

        public string Token;
    }

    public class LoopServer : Proto.Loop.LoopBase
    {
        private readonly BrokerServer _brokerServer = new BrokerServer();

        private readonly LoopServiceFacade _facade = new LoopServiceFacade();

        public static void Start()
        {
            var loopServer = new LoopServer();
            var server = new Server
            {
                Services =
                {
                    Proto.Loop.BindService(loopServer),
                    Plugin.GRPCBroker.BindService(loopServer._brokerServer),
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
            await Console.Error.WriteLineAsync("[DEBUG] Received Loop Start Request");
            Console.Error.WriteLine("[DEBUG] " + request);
            var session = new Session
            {
                LoopId = request.Session.LoopID,
                Token = request.Session.Token
            };
            _brokerServer.ConnectionInfo.ContinueWith(async (task) =>
            {
                Console.Error.WriteLine("[INFO] Start Facade Connection");
                await _facade.Connect(task.Result, session);
                _facade.WhisperClient.MarkdownAsync();
                Console.Error.WriteLine("[INFO] Whisper Sent Without Await");
            });
            return new Empty();
        }

        public override async Task<Empty> LoopStop(Empty request, ServerCallContext context)
        {
            await Console.Error.WriteLineAsync("[DEBUG] Received Loop Stop Request");
            return new Empty();
        }
    }
}