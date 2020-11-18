using System;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Browser;
using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Hover;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Storage;
using OliveHelpsLDK.UI;
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

        private IUIService _ui;

        internal async Task Connect(ConnectionInfo connectionInfo, Session session, ILogger logger)
        {
            var address = connectionInfo.Network == "unix"
                ? $"unix://{connectionInfo.Address}"
                : connectionInfo.Address;

            var channel = new Channel(address, ChannelCredentials.Insecure);
            await channel.ConnectAsync();
            Console.Error.WriteLine("[DEBUG] GRPC Channel Connected");
            _whisper = new WhisperClient(channel, session, logger);
            _clipboard = new ClipboardClient(channel, session, logger);
            _filesystem = new FilesystemClient(channel, session, logger);
            _cursor = new CursorClient(channel, session, logger);
            _keyboard = new KeyboardClient(channel, session, logger);
            _network = new NetworkClient(channel, session, logger);
            _process = new ProcessClient(channel, session, logger);
            _browser = new BrowserClient(channel, session, logger);
            _hover = new HoverClient(channel, session, logger);
            _window = new WindowClient(channel, session, logger);
            _storage = new StorageClient(channel, session, logger);
            _ui = new UIClient(channel, session, logger);
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

        public IUIService UI()
        {
            return _ui;
        }
    }
}