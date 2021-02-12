using System;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Plugin;
using Proto;

[assembly: InternalsVisibleTo("OliveHelpsLDK.Test")]

namespace OliveHelpsLDK
{
    /// <summary>
    /// The LoopServer is used to start a Loop.
    /// Loop programs must call <see cref="LoopServer.Start">LoopServer.Start</see> on program start.
    /// </summary>
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

        /// <param name="loop">The Loop you're running.</param>
        /// <param name="loggerName">The name of the logger.</param>
        /// <inheritdoc cref="Start(OliveHelpsLDK.ILoop,ILogger)"/>
        public static void Start(ILoop loop, string loggerName)
        {
            var logger = new Logger(loggerName);
            Start(loop, logger);
        }

        /// <summary>
        /// Starts a Loop Server and prepares the process to connect to Olive Helps.
        /// </summary>
        /// <remarks>
        /// Only one Loop can be run per process.
        /// </remarks>
        /// <param name="loop">The Loop you're running.</param>
        /// <param name="logger">The Logger you're using.</param>
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

        /// <summary>
        /// Receives and responds to LoopStart messages.
        /// </summary>
        /// <param name="request">The LoopStartRequest, containing the session data.</param>
        /// <param name="context">The Call context</param>
        /// <returns>A Task resolving with the Empty response.</returns>
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

        /// <summary>
        /// Receives and responds to LoopStop messages.
        /// </summary>
        /// <param name="request">The Empty request.</param>
        /// <param name="context">The call context.</param>
        /// <returns>A Task resolving with Empty response when the Loop has been stopped.</returns>
        public override async Task<Empty> LoopStop(Empty request, ServerCallContext context)
        {
            _logger.Debug("Received Loop Stop Request");
            await _loop.Stop();
            return new Empty();
        }
    }
}