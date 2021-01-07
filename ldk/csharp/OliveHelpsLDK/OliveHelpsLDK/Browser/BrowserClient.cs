using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Browser
{
    internal class BrowserClient : BaseClient<Proto.Browser.BrowserClient>, IBrowserService
    {
        internal BrowserClient(Proto.Browser.BrowserClient client, Session session, ILogger logger) : base(
            client, session, logger, "browser")
        {
        }

        internal BrowserClient(CallInvoker channelBase, Session session, ILogger logger) : this(
            new Proto.Browser.BrowserClient(channelBase), session, logger)
        {
        }

        public Task<string> QueryActiveURL(CancellationToken cancellationToken = default)
        {
            var request = new BrowserActiveURLRequest
            {
                Session = CreateSession()
            };
            var loggedParser = LoggedParser<Task<BrowserActiveURLResponse>, string>(task => task.Result.Url);
            return Client.BrowserActiveURLAsync(request, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<string> StreamActiveURL(CancellationToken cancellationToken = default)
        {
            var request = new BrowserActiveURLStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.BrowserActiveURLStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<BrowserActiveURLStreamResponse, string>(resp => resp.Url);
            return new StreamingCall<BrowserActiveURLStreamResponse, string>(call, loggedParser);
        }

        public Task<SelectedText> QuerySelectedText(CancellationToken cancellationToken = default)
        {
            var request = new BrowserSelectedTextRequest
            {
                Session = CreateSession()
            };
            var loggedParser =
                LoggedParser<Task<BrowserSelectedTextResponse>, SelectedText>(task => FromProto(task.Result));
            return Client.BrowserSelectedTextAsync(request, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<SelectedText> StreamSelectedText(CancellationToken cancellationToken = default)
        {
            var request = new BrowserSelectedTextStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.BrowserSelectedTextStream(request, CreateOptions(cancellationToken));
            var loggedParser =
                LoggedParser<BrowserSelectedTextStreamResponse, SelectedText>(response => FromProto(response));
            return new StreamingCall<BrowserSelectedTextStreamResponse, SelectedText>(call,
                loggedParser);
        }

        internal static SelectedText FromProto(BrowserSelectedTextResponse response)
        {
            return new SelectedText
            {
                TabTitle = response.TabTitle,
                Text = response.Text,
                URL = response.Url,
            };
        }

        internal static SelectedText FromProto(BrowserSelectedTextStreamResponse response)
        {
            return new SelectedText
            {
                TabTitle = response.TabTitle,
                Text = response.Text,
                URL = response.Url,
            };
        }
    }
}