using System.Threading;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Keyboard
{
    internal class KeyboardClient : BaseClient<Proto.Keyboard.KeyboardClient>, IKeyboardService
    {
        internal KeyboardClient(Proto.Keyboard.KeyboardClient client, Session session, ILogger logger) : base(
            client, session, logger, "keyboard")
        {
        }

        internal KeyboardClient(ChannelBase channelBase, Session session, ILogger logger) : this(
            new Proto.Keyboard.KeyboardClient(channelBase), session, logger)
        {
        }

        public IStreamingCall<bool> StreamHotKey(HotKey hotkey, CancellationToken cancellationToken = default)
        {
            var req = new KeyboardHotkeyStreamRequest
            {
                Session = CreateSession(),
                Hotkey = ToProto(hotkey),
            };
            var call = Client.KeyboardHotkeyStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardHotkeyStreamResponse, bool>(call,
                LoggedParser<KeyboardHotkeyStreamResponse, bool>(response => response.Scanned));
        }

        public IStreamingCall<ScanCodeEvent> StreamScancode(CancellationToken cancellationToken = default)
        {
            var req = new KeyboardScancodeStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.KeyboardScancodeStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardScancodeStreamResponse, ScanCodeEvent>(call,
                LoggedParser<KeyboardScancodeStreamResponse, ScanCodeEvent>(FromProto));
        }

        public IStreamingCall<string> StreamText(CancellationToken cancellationToken = default)
        {
            var req = new KeyboardTextStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.KeyboardTextStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardTextStreamResponse, string>(call,
                LoggedParser<KeyboardTextStreamResponse, string>(resp => resp.Text));
        }

        public IStreamingCall<string> StreamChar(CancellationToken cancellationToken = default)
        {
            var req = new KeyboardCharacterStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.KeyboardCharacterStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardCharacterStreamResponse, string>(call,
                LoggedParser<KeyboardCharacterStreamResponse, string>(resp => resp.Text));
        }

        private static KeyboardHotkey ToProto(HotKey hotKey)
        {
            return new KeyboardHotkey
            {
                Key = hotKey.Key,
                Modifiers = hotKey.Modifiers()
            };
        }

        private static ScanCodeEvent FromProto(KeyboardScancodeStreamResponse response)
        {
            return new ScanCodeEvent
            {
                Scancode = response.Scancode,
                Pressed = response.Pressed,
            };
        }
    }
}