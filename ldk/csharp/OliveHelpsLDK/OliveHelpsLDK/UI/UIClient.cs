using System.Threading;
using Grpc.Core;

namespace OliveHelpsLDK.UI
{
    internal class UIClient : BaseClient<Proto.UI.UIClient>, IUIService
    {
        internal UIClient(ChannelBase channelBase, Session session)
        {
            _client = new Proto.UI.UIClient(channelBase);
            _session = session;
        }

        public IStreamingCall<string> StreamGlobalSearch(CancellationToken cancellationToken = default)
        {
            var request = new Proto.GlobalSearchStreamRequest
            {
                Session = CreateSession()
            };
            var call = _client.GlobalSearchStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<Proto.GlobalSearchStreamResponse, string>(call, response => response.Text);
        }

        public IStreamingCall<string> StreamSearchbar(CancellationToken cancellationToken = default)
        {
            var request = new Proto.SearchbarStreamRequest()
            {
                Session = CreateSession()
            };
            var call = _client.SearchbarStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<Proto.SearchbarStreamResponse, string>(call, response => response.Text);
        }
    }
}