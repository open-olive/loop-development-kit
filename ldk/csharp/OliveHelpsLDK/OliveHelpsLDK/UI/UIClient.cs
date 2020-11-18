using System.Threading;
using Grpc.Core;

namespace OliveHelpsLDK.UI
{
    internal class UIClient : BaseClient<Proto.UI.UIClient>, IUIService
    {
        internal UIClient(ChannelBase channelBase, Session session)
        {
            Client = new Proto.UI.UIClient(channelBase);
            Session = session;
        }

        public IStreamingCall<string> StreamGlobalSearch(CancellationToken cancellationToken = default)
        {
            var request = new Proto.GlobalSearchStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.GlobalSearchStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<Proto.GlobalSearchStreamResponse, string>(call, response => response.Text);
        }

        public IStreamingCall<string> StreamSearchbar(CancellationToken cancellationToken = default)
        {
            var request = new Proto.SearchbarStreamRequest()
            {
                Session = CreateSession()
            };
            var call = Client.SearchbarStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<Proto.SearchbarStreamResponse, string>(call, response => response.Text);
        }
    }
}