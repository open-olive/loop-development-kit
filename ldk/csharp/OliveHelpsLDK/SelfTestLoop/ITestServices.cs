using OliveHelpsLDK;
using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Storage;
using OliveHelpsLDK.UI;
using OliveHelpsLDK.Window;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Window;

namespace SelfTestLoop
{
    public interface ITestServices : ILoopServices
    {
        public ILogger Logger { get; }
    }

    public class TestServices : ITestServices
    {
        public ILoopServices Services { get; set; }

        public ILogger Logger { get; set; }
        public IWhisperService Whisper => Services.Whisper;

        public IClipboardService Clipboard => Services.Clipboard;

        public IFilesystemService Filesystem => Services.Filesystem;

        public ICursorService Cursor => Services.Cursor;

        public IKeyboardService Keyboard => Services.Keyboard;

        public INetworkService Network => Services.Network;

        public IProcessService Process => Services.Process;

        public IStorageService Storage => Services.Storage;

        public IWindowService Window => Services.Window;

        public IUIService UI => Services.UI;

        public IWindowService Window => Services.Window;
    }
}