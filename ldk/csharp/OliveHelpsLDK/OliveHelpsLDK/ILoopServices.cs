using OliveHelpsLDK.Clipboard;
using OliveHelpsLDK.Cursor;
using OliveHelpsLDK.Filesystem;
using OliveHelpsLDK.Keyboard;
using OliveHelpsLDK.Network;
using OliveHelpsLDK.Process;
using OliveHelpsLDK.Vault;
using OliveHelpsLDK.UI;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Window;

namespace OliveHelpsLDK
{
    /// <summary>
    /// ILoopServices provides access to all the sensors offered by Olive Helps to Loops.
    /// </summary>
    public interface ILoopServices
    {
        /// <summary>
        /// Provides access to the Whisper Sensor.
        /// </summary>
        IWhisperService Whisper { get; }

        /// <summary>
        /// Provides access to the Clipboard Sensor.
        /// </summary>
        IClipboardService Clipboard { get; }

        /// <summary>
        /// Provides access to the Clipboard Sensor.
        /// </summary>
        IFilesystemService Filesystem { get; }

        /// <summary>
        /// Provides access to the Cursor Sensor.
        /// </summary>
        ICursorService Cursor { get; }

        /// <summary>
        /// Provides access to the Keyboard Sensor.
        /// </summary>
        IKeyboardService Keyboard { get; }

        /// <summary>
        /// Provides access to the Network Sensor.
        /// </summary>
        INetworkService Network { get; }

        /// <summary>
        /// Provides access to the Process Sensor.
        /// </summary>
        IProcessService Process { get; }

        // TODO: Uncomment once available in Olive Helps.
        // IBrowserService Browser { get ;}

        // TODO: Uncomment once available in Olive Helps.
        // IHoverService Hover { get; }

        /// <summary>
        /// Provides access to the Window Sensor.
        /// </summary>
        IWindowService Window { get; }

        /// <summary>
        /// Provides access to the Vault Sensor.
        /// </summary>
        IVaultService Vault { get; }

        /// <summary>
        /// Provides access to the UI Sensor.
        /// </summary>
        IUIService UI { get; }
    }
}