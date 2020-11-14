using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    public interface ILoopServices
    {
        IWhisperService Whisper();

        IClipboardService Clipboard();

        IFilesystemService Filesystem();

        ICursorService Cursor();
    }
}