using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Storage;
using OliveHelpsLDK.UI;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Window;

namespace OliveHelpsLDK
{
    public interface ILoopSensors
    {
        IWhisperSensor Whisper { get; }

        IClipboardSensor Clipboard { get; }

        IFilesystemSensor Filesystem { get; }

        ICursorSensor Cursor { get; }

        IKeyboardSensor Keyboard { get; }

        INetworkSensor Network { get; }

        IProcessSensor Process { get; }

        // TODO: Uncomment once available in Olive Helps.
        // IBrowserSensor Browser { get ;}

        // TODO: Uncomment once available in Olive Helps.
        // IHoverSensor Hover { get; }

        IWindowSensor Window { get; }

        IStorageSensor Storage { get; }

        IUISensor UI { get; }
    }
}