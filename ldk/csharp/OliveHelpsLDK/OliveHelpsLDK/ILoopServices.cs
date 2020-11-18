using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Storage;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    public interface ILoopServices
    {
        IWhisperService Whisper();

        IClipboardService Clipboard();

        IFilesystemService Filesystem();

        ICursorService Cursor();

        IKeyboardService Keyboard();

        INetworkService Network();

        IProcessService Process();

        // TODO: Uncomment once available in Olive Helps.
        // IBrowserService Browser();

        // TODO: Uncomment once available in Olive Helps.
        // IHoverService Hover();

        // TODO: Uncomment once available in Olive Helps.
        // IWindowService Window();

        IStorageService Storage();

    }
}