using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Storage;
using OliveHelpsLDK.UI;
using OliveHelpsLDK.Whispers;

namespace OliveHelpsLDK
{
    /// <summary>
    /// ILoopServices provides access to all the services offered by Olive Helps to Loop Consumers.
    /// </summary>
    public interface ILoopServices
    {
        IWhisperService Whisper { get; }

        IClipboardService Clipboard { get; }

        IFilesystemService Filesystem { get; }

        ICursorService Cursor { get; }

        IKeyboardService Keyboard { get; }

        INetworkService Network { get; }

        IProcessService Process { get; }

        // TODO: Uncomment once available in Olive Helps.
        // IBrowserService Browser { get ;}

        // TODO: Uncomment once available in Olive Helps.
        // IHoverService Hover { get; }

        // TODO: Uncomment once available in Olive Helps.
        // IWindowService Window { get; }

        IStorageService Storage { get; }

        IUIService UI { get; }
    }
}