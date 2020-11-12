using System;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    public class LoopServiceFacade : ILoopServices
    {
        public IWhisperService Whisper;

        public IClipboardService Clipboard;

        public async Task Connect(ConnectionInfo connectionInfo, Session session)
        {
            var address = connectionInfo.Network == "unix"
                ? $"unix://{connectionInfo.Address}"
                : connectionInfo.Address;

            var channel = new Grpc.Core.Channel(address, ChannelCredentials.Insecure);
            await channel.ConnectAsync();
            Console.Error.WriteLine("[DEBUG] GRPC Channel Connected");
            Whisper = new WhisperClient(channel, session);
            Clipboard = new ClipboardClient(channel, session);
        }
    }
}