using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Clipboard
{
    internal class ClipboardClient : BaseClient<Proto.Clipboard.ClipboardClient>, IClipboardService
    {
        internal ClipboardClient(Proto.Clipboard.ClipboardClient client, Session session, ILogger logger) : base(
            client, session, logger, "clipboard")
        {
        }

        internal ClipboardClient(CallInvoker channel, Session session, ILogger logger) : this(
            new Proto.Clipboard.ClipboardClient(channel), session, logger)
        {
        }

        public Task<string> Read(CancellationToken cancellationToken = default)
        {
            var request = new ClipboardReadRequest
            {
                Session = CreateSession(),
            };
            var loggedParser = LoggedParser<Task<ClipboardReadResponse>, string>(task => task.Result.Text);
            return Client.ClipboardReadAsync(request, new CallOptions(cancellationToken: cancellationToken))
                .ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public Task Write(string contents, CancellationToken cancellationToken = default)
        {
            var request = new ClipboardWriteRequest
            {
                Session = CreateSession(),
                Text = contents
            };
            return Client.ClipboardWriteAsync(request, new CallOptions(cancellationToken: cancellationToken))
                .ResponseAsync;
        }

        public IStreamingCall<string> Stream(CancellationToken cancellationToken = default)
        {
            var request = new ClipboardReadStreamRequest
            {
                Session = CreateSession(),
            };
            var call = Client.ClipboardReadStream(request, new CallOptions(cancellationToken: cancellationToken));
            var loggedParser = LoggedParser<ClipboardReadStreamResponse, string>(response => response.Text);
            return new StreamingCall<ClipboardReadStreamResponse, string>(call, loggedParser);
        }
    }
}