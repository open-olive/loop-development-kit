using System;
using System.Linq;
using Grpc.Core;

namespace OliveHelpsLDK
{
    public class LoopServer
    {
        public static void Start()
        {
            Server server = new Server
            {
                Services =
                {
                    Plugin.GRPCBroker.BindService(new BrokerServer()),
                    Plugin.GRPCStdio.BindService(new StdioServer())
                },
                Ports = {new ServerPort("localhost", 0, ServerCredentials.Insecure)}
            };
            var currentPort = server.Ports.First();
            server.Start();
            Console.Out.WriteLine($"1|1|tcp|127.0.0.1:#{currentPort.Port}|grpc");
        }
    }
}