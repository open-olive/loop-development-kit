using System;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    internal class LoopServiceFacade : ILoopServices
    {
        private IWhisperService _whisper;

        private IClipboardService _clipboard;

        internal async Task Connect(ConnectionInfo connectionInfo, Session session)
        {
            var address = connectionInfo.Network == "unix"
                ? $"unix://{connectionInfo.Address}"
                : connectionInfo.Address;

            var channel = new Grpc.Core.Channel(address, ChannelCredentials.Insecure);
            await channel.ConnectAsync();
            Console.Error.WriteLine("[DEBUG] GRPC Channel Connected");
            _whisper = new WhisperClient(channel, session);
            _clipboard = new ClipboardClient(channel, session);
        }

        public IWhisperService Whisper()
        {
            return _whisper;
        }

        public IClipboardService Clipboard()
        {
            return _clipboard;
        }
    }
}