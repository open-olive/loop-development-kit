using System;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    public class LoopServiceFacade : ILoopServices
    {
        public IWhisperService WhisperClient;

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