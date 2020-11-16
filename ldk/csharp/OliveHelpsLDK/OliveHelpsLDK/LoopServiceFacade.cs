using System;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Browser;
using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Hover;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Storage;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Window;

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

        private IBrowserService _browser;

        private IHoverService _hover;

        private IWindowService _window;
        private IStorageService _storage;

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
            _browser = new BrowserClient(channel, session);
            _hover = new HoverClient(channel, session);
            _window = new WindowClient(channel, session);
            _storage = new StorageClient(channel, session);
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

        public IStorageService Storage()
        {
            return _storage;
        }

        public IBrowserService Browser()
        {
            return _browser;
        }

        public IHoverService Hover()
        {
            return _hover;
        }

        public IWindowService Window()
        {
            return _window;
        }
    }
}