using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace OliveHelpsLDK.Keyboard
{
    public interface IKeyboardService
    {
        IStreamingCall<bool> StreamHotKey(HotKey hotkey, CancellationToken cancellationToken = default);

        IStreamingCall<ScanCodeEvent> StreamScancode(CancellationToken cancellationToken = default);

        IStreamingCall<string> StreamText(CancellationToken cancellationToken = default);

        IStreamingCall<string> StreamChar(CancellationToken cancellationToken = default);
    }

    public struct HotKey
    {
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
        public int Modifiers()
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

    public struct ScanCodeEvent
    {
        public int Scancode;
        public bool Pressed;
    }
}