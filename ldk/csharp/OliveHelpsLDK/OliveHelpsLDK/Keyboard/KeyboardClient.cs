using System.Threading;
using Grpc.Core;
using Proto;

namespace OliveHelpsLDK.Keyboard
{
    internal class KeyboardClient : BaseClient<Proto.Keyboard.KeyboardClient>, IKeyboardService
    {
        internal KeyboardClient(ChannelBase channelBase, Session session)
        {
            _client = new Proto.Keyboard.KeyboardClient(channelBase);
            _session = session;
        }

        public IStreamingCall<bool> StreamHotKey(HotKey hotkey, CancellationToken cancellationToken = default)
        {
            var req = new KeyboardHotkeyStreamRequest
            {
                Session = CreateSession(),
                Hotkey = ToProto(hotkey),
            };
            var call = _client.KeyboardHotkeyStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardHotkeyStreamResponse, bool>(call, response => response.Scanned);
        }

        public IStreamingCall<ScanCodeEvent> StreamScancode(CancellationToken cancellationToken = default)
        {
            var req = new KeyboardScancodeStreamRequest
            {
                Session = CreateSession()
            };
            var call = _client.KeyboardScancodeStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardScancodeStreamResponse, ScanCodeEvent>(call, FromProto);
        }

        public IStreamingCall<string> StreamText(CancellationToken cancellationToken = default)
        {
            var req = new KeyboardTextStreamRequest()
            {
                Session = CreateSession()
            };
            var call = _client.KeyboardTextStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardTextStreamResponse, string>(call, resp => resp.Text);
        }

        public IStreamingCall<string> StreamChar(CancellationToken cancellationToken = default)
        {
            var req = new KeyboardCharacterStreamRequest()
            {
                Session = CreateSession()
            };
            var call = _client.KeyboardCharacterStream(req, CreateOptions(cancellationToken));
            return new StreamingCall<KeyboardCharacterStreamResponse, string>(call, resp => resp.Text);
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