using System;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Browser
{
    internal class BrowserClient : BaseClient<Proto.Browser.BrowserClient>, IBrowserService
    {
        internal BrowserClient(ChannelBase channelBase, Session session, ILogger logger) : base(
            new Proto.Browser.BrowserClient(channelBase), session, logger, "browser")
        {
        }

        public Task<string> QueryActiveURL(CancellationToken cancellationToken = default)
        {
            var request = new Proto.BrowserActiveURLRequest
            {
                Session = CreateSession()
            };
            var continuationFunction =
                LoggedParser<Task<Proto.BrowserActiveURLResponse>, string>(task => task.Result.Url);
            return Client.BrowserActiveURLAsync(request, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(continuationFunction,
                    cancellationToken);
        }

        public IStreamingCall<string> StreamActiveURL(CancellationToken cancellationToken = default)
        {
            var request = new Proto.BrowserActiveURLStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.BrowserActiveURLStream(request, CreateOptions(cancellationToken));
            var transformer =
                LoggedParser<BrowserActiveURLStreamResponse, string>(resp => resp.Url);
            return new StreamingCall<Proto.BrowserActiveURLStreamResponse, string>(call, transformer);
        }

        public Task<SelectedText> QuerySelectedText(CancellationToken cancellationToken = default)
        {
            var request = new Proto.BrowserSelectedTextRequest()
            {
                Session = CreateSession()
            };
            var continuationFunction =
                LoggedParser<Task<BrowserSelectedTextResponse>, SelectedText>(task => FromProto(task.Result));
            return Client.BrowserSelectedTextAsync(request, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(continuationFunction, cancellationToken);
        }

        public IStreamingCall<SelectedText> StreamSelectedText(CancellationToken cancellationToken = default)
        {
            var request = new Proto.BrowserSelectedTextStreamRequest()
            {
                Session = CreateSession()
            };
            var call = Client.BrowserSelectedTextStream(request, CreateOptions(cancellationToken));
            var transformer =
                LoggedParser<BrowserSelectedTextStreamResponse, SelectedText>(response => FromProto(response));
            return new StreamingCall<Proto.BrowserSelectedTextStreamResponse, SelectedText>(call,
                transformer);
        }

        internal static SelectedText FromProto(Proto.BrowserSelectedTextResponse response)
        {
            return new SelectedText
            {
                TabTitle = response.TabTitle,
                Text = response.Text,
                URL = response.Url,
            };
        }

        internal static SelectedText FromProto(Proto.BrowserSelectedTextStreamResponse response)
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