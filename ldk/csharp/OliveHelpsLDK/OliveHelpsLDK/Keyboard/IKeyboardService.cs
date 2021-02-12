using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace OliveHelpsLDK.Keyboard
{
    /// <summary>
    /// Provides access to read keyboard activity.
    /// </summary>
    public interface IKeyboardService
    {
        /// <summary>
        /// Creates a stream receiving updates when the configured hot key is pressed.
        /// </summary>
        /// <param name="hotkey">The Hotkey configuration to use.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A streaming call that sends updates when the combination is pressed (true) or released (false).</returns>
        IStreamingCall<bool> StreamHotKey(HotKey hotkey, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream that receives updates when specific scan codes are pressed and released.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<ScanCodeEvent> StreamScancode(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream that receives updates when blocks of text are entered.
        /// </summary>
        /// <remarks>
        /// The stream will not emit updates while the Olive Helps Global Search or Search field has focus. 
        /// </remarks>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> StreamText(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream that receives updates when individual character are entered.
        /// </summary>
        /// <remarks>
        /// The stream will not emit updates while the Olive Helps Global Search or Search field has focus. 
        /// </remarks> 
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> StreamChar(CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// The HotKey struct defines the hot key combination to be observed.
    /// To use: create the struct and populate at least the Key value and one of the modifier key properties.
    /// </summary>
    /// <remarks>
    /// All the modifier keys set to true must be pressed in order for the HotKey stream to receive an update.
    /// 
    /// On MacOS - Alt is the Option key, Meta is the Command key.<br/>
    /// On Windows - Meta (Left) is the Windows key, Meta (right) is the Menu key.<br/>
    /// 
    /// Each modifier key (Alt, Ctrl, Shift, Meta) has three properties that can be set to true (Left, Right, position insensitive):
    /// <br/>
    /// - AltL - Alt Left<br/>
    /// - AltR - Alt Right<br/>
    /// - Alt - Either Alt<br/>
    /// <br/>
    /// You generally want to use the position insensitive version unless you're targeting the Windows key (MetaL)
    /// or Menu key (MetaR) in Windows.
    ///
    /// 
    /// </remarks>
    public struct HotKey
    {
        /// <summary>
        /// A single character string containing the letter to be observed.
        /// </summary>
        public string Key;

        public bool AltL;
        public bool AltR;
        public bool Alt;
        public bool CtrlL;
        public bool CtrlR;
        public bool Ctrl;
        public bool MetaL;
        public bool MetaR;
        public bool Meta;
        public bool ShiftL;
        public bool ShiftR;
        public bool Shift;

        // bit 0  = altL
        // bit 1  = altR
        // bit 2  = alt
        // bit 3  = ctrlL
        // bit 4  = ctrlR
        // bit 5  = ctrl
        // bit 6  = metaL
        // bit 7  = metaR
        // bit 8  = meta
        // bit 9  = shiftL
        // bit 10 = shiftR
        // bit 11 = shift
        internal int Modifiers()
        {
            var values = new List<int>
            {
                AltL ? 1 << 0 : 0,
                AltR ? 1 << 1 : 0,
                Alt ? 1 << 2 : 0,
                CtrlL ? 1 << 3 : 0,
                CtrlR ? 1 << 4 : 0,
                Ctrl ? 1 << 5 : 0,
                MetaL ? 1 << 6 : 0,
                MetaR ? 1 << 7 : 0,
                Meta ? 1 << 8 : 0,
                ShiftL ? 1 << 9 : 0,
                ShiftR ? 1 << 10 : 0,
                Shift ? 1 << 11 : 0,
            };
            return values.Sum();
        }
    }

    /// <summary>
    /// The ScanCodeEvent struct contains the scancode and whether the key was pressed or released.
    /// </summary>
    public struct ScanCodeEvent
    {
        /// <summary>
        /// The scancode value.
        /// </summary>
        public int Scancode;

        /// <summary>
        /// <code>True</code> if pressed, <code>false</code> if released.
        /// </summary>
        public bool Pressed;
    }
}