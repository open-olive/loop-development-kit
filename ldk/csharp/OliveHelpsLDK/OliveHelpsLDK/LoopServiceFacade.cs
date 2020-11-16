using System;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    internal class LoopServiceFacade : ILoopServices
    {
        private IWhisperService _whisper;

        private IClipboardService _clipboard;

        private IFilesystemService _filesystem;

        private ICursorService _cursor;

        private IKeyboardService _keyboard;

        private INetworkService _network;

        private IProcessService _process;

        internal async Task Connect(ConnectionInfo connectionInfo, Session session)
        {
            var address = connectionInfo.Network == "unix"
                ? $"unix://{connectionInfo.Address}"
                : connectionInfo.Address;

            var channel = new Channel(address, ChannelCredentials.Insecure);
            await channel.ConnectAsync();
            Console.Error.WriteLine("[DEBUG] GRPC Channel Connected");
            _whisper = new WhisperClient(channel, session);
            _clipboard = new ClipboardClient(channel, session);
            _filesystem = new FilesystemClient(channel, session);
            _cursor = new CursorClient(channel, session);
            _keyboard = new KeyboardClient(channel, session);
            _network = new NetworkClient(channel, session);
            _process = new ProcessClient(channel, session);
        }

        public IWhisperService Whisper()
        {
            return _whisper;
        }

        public IClipboardService Clipboard()
        {
            return _clipboard;
        }

        public IFilesystemService Filesystem()
        {
            return _filesystem;
        }

        public ICursorService Cursor()
        {
            return _cursor;
        }

        public IKeyboardService Keyboard()
        {
            return _keyboard;
        }

        public INetworkService Network()
        {
            return _network;
        }

        public IProcessService Process()
        {
            return _process;
        }
    }
}