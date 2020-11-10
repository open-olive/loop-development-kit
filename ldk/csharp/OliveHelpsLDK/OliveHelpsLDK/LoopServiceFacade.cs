using System;
using System.Threading.Tasks;
using Grpc.Core;

namespace OliveHelpsLDK
{
    public class LoopServiceFacade : ILoopServices
    {
        public WhisperClient WhisperClient;

        public async Task Connect(ConnectionInfo connectionInfo, Session session)
        {
            var address = connectionInfo.Network == "unix"
                ? $"unix://{connectionInfo.Address}"
                : connectionInfo.Address;

            var channel = new Grpc.Core.Channel(address, ChannelCredentials.Insecure);
            await channel.ConnectAsync();
            Console.Error.WriteLine("[DEBUG] GRPC Channel Connected");
            WhisperClient = new WhisperClient(channel, session);
        }
    }
}