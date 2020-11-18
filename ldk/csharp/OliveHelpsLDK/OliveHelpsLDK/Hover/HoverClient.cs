using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;

namespace OliveHelpsLDK.Hover
{
    internal class HoverClient : BaseClient<Proto.Hover.HoverClient>, IHoverService
    {
        internal HoverClient(ChannelBase channelBase, Session session, ILogger logger) : base(
            new Proto.Hover.HoverClient(channelBase), session, logger, "hover")
        {
        }

        public Task<string> Query(HoverRequest request, CancellationToken cancellationToken = default)
        {
            var msg = new Proto.HoverReadRequest
            {
                Session = CreateSession(),
                XFromCenter = checked((uint) request.XFromCenter),
                YFromCenter = checked((uint) request.YFromCenter),
            };
            return Client.HoverReadAsync(msg, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(task => task.Result.Text, cancellationToken);
        }

        public IStreamingCall<string> Stream(HoverRequest request, CancellationToken cancellationToken = default)
        {
            var msg = new Proto.HoverReadStreamRequest
            {
                Session = CreateSession(),
                XFromCenter = checked((uint) request.XFromCenter),
                YFromCenter = checked((uint) request.YFromCenter),
            };
            var call = Client.HoverReadStream(msg, CreateOptions(cancellationToken));
            return new StreamingCall<Proto.HoverReadStreamResponse, string>(call, response => response.Text);
        }
    }
}