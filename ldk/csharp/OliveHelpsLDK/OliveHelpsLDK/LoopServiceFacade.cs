using System;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Core.Interceptors;
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
        internal async Task Connect(ConnectionInfo connectionInfo, Session session, ILogger logger)
        {
            var address = connectionInfo.Network == "unix"
                ? $"unix://{connectionInfo.Address}"
                : connectionInfo.Address;

            var channel = new Channel(address, ChannelCredentials.Insecure);
            await channel.ConnectAsync();
            var interceptedChannel = channel.Intercept(new ExceptionLoggingInterceptor(logger));

            Console.Error.WriteLine("[DEBUG] GRPC Channel Connected");
            Whisper = new WhisperClient(interceptedChannel, session, logger);
            Clipboard = new ClipboardClient(interceptedChannel, session, logger);
            Filesystem = new FilesystemClient(interceptedChannel, session, logger);
            Cursor = new CursorClient(interceptedChannel, session, logger);
            Keyboard = new KeyboardClient(interceptedChannel, session, logger);
            Network = new NetworkClient(interceptedChannel, session, logger);
            Process = new ProcessClient(interceptedChannel, session, logger);
            Browser = new BrowserClient(interceptedChannel, session, logger);
            Hover = new HoverClient(interceptedChannel, session, logger);
            Window = new WindowClient(interceptedChannel, session, logger);
            Storage = new StorageClient(interceptedChannel, session, logger);
            UI = new UIClient(interceptedChannel, session, logger);
        }

        public IWhisperService Whisper { get; private set; }

        public IClipboardService Clipboard { get; private set; }

        public IFilesystemService Filesystem { get; private set; }

        public ICursorService Cursor { get; private set; }

        public IKeyboardService Keyboard { get; private set; }

        public INetworkService Network { get; private set; }

        public IProcessService Process { get; private set; }

        public IStorageService Storage { get; private set; }

        public IBrowserService Browser { get; private set; }

        public IHoverService Hover { get; private set; }

        public IWindowService Window { get; private set; }

        public IUIService UI { get; private set; }
    }
}