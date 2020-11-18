using System;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Plugin;
using Proto;

namespace OliveHelpsLDK
{
    public class LoopServer : Loop.LoopBase
    {
        private readonly BrokerServer _brokerServer = new BrokerServer();

        private readonly LoopServiceFacade _facade = new LoopServiceFacade();

        private readonly ILoop _loop;

        private readonly ILogger _logger;

        internal LoopServer(ILoop loop, ILogger logger)
        {
            _loop = loop;
            _logger = logger;
        }

        public static void Start(ILoop loop, ILogger logger)
        {
            var loopServer = new LoopServer(loop, logger);
            var server = new Server
            {
                Services =
                {
                    Loop.BindService(loopServer),
                    GRPCBroker.BindService(loopServer._brokerServer),
                    GRPCStdio.BindService(new StdioServer())
                },
                Ports = {new ServerPort("localhost", 0, ServerCredentials.Insecure)}
            };
            server.Start();
            var currentPort = server.Ports.First();
            Console.Out.WriteLine($"1|1|tcp|127.0.0.1:{currentPort.BoundPort}|grpc");
            System.Diagnostics.Process.GetCurrentProcess().WaitForExit();
        }

        public override async Task<Empty> LoopStart(LoopStartRequest request, ServerCallContext context)
        {
            _logger.Debug("Received Loop Start Request");
            var session = new Session
            {
                LoopId = request.Session.LoopID,
                Token = request.Session.Token
            };
            var connectionInfo = await _brokerServer.ConnectionInfo;
            await _facade.Connect(connectionInfo, session, _logger);
            #pragma warning disable 4014
            // Intentional disable - Loop is intended to run indefinitely but should not delay LoopStart response.
            _loop.Start(_facade);
            #pragma warning restore 4014
            return new Empty();
        }

        public override async Task<Empty> LoopStop(Empty request, ServerCallContext context)
        {
            _logger.Debug("Received Loop Stop Request");
            await _loop.Stop();
            return new Empty();
        }
    }
}