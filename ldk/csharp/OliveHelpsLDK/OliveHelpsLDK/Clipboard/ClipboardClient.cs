using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Proto;

namespace OliveHelpsLDK.Clipboard
{
    internal class ClipboardClient : BaseClient<Proto.Clipboard.ClipboardClient>, IClipboardService
    {

        internal ClipboardClient(ChannelBase channel, Session session)
        {
            _client = new Proto.Clipboard.ClipboardClient(channel);
            _session = session;
        }

        public Task<string> Read(CancellationToken cancellationToken = default)
        {
            var request = new ClipboardReadRequest
            {
                Session = CreateSession(),
            };
            return _client.ClipboardReadAsync(request, new CallOptions(cancellationToken: cancellationToken))
                .ResponseAsync.ContinueWith(task => task.Result.Text, cancellationToken);
        }

        public Task Write(string contents, CancellationToken cancellationToken = default)
        {
            var request = new ClipboardWriteRequest
            {
                Session = CreateSession(),
                Text = contents
            };
            return _client.ClipboardWriteAsync(request, new CallOptions(cancellationToken: cancellationToken))
                .ResponseAsync;
        }

        public IStreamingCall<string> Stream(CancellationToken cancellationToken = default)
        {
            var request = new ClipboardReadStreamRequest
            {
                Session = CreateSession(),
            };
            var call = _client.ClipboardReadStream(request, new CallOptions(cancellationToken: cancellationToken));
            return new StreamingCall<Proto.ClipboardReadStreamResponse, string>(call, response => response.Text);
        }
    }
}