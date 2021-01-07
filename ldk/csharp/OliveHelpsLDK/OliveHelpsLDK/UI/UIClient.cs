using System.Threading;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.UI
{
    internal class UIClient : BaseClient<Proto.UI.UIClient>, IUIService
    {
        internal UIClient(CallInvoker channelBase, Session session, ILogger logger) : base(
            new Proto.UI.UIClient(channelBase), session, logger, "ui")
        {
        }

        internal UIClient(Proto.UI.UIClient client, Session session, ILogger logger) : base(
            client, session, logger, "ui")
        {
        }

        public IStreamingCall<string> StreamGlobalSearch(CancellationToken cancellationToken = default)
        {
            var request = new GlobalSearchStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.GlobalSearchStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<GlobalSearchStreamResponse, string>(response => response.Text);
            return new StreamingCall<GlobalSearchStreamResponse, string>(call, loggedParser);
        }

        public IStreamingCall<string> StreamSearchbar(CancellationToken cancellationToken = default)
        {
            var request = new SearchbarStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.SearchbarStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<SearchbarStreamResponse, string>(response => response.Text);
            return new StreamingCall<SearchbarStreamResponse, string>(call, loggedParser);
        }
    }
}