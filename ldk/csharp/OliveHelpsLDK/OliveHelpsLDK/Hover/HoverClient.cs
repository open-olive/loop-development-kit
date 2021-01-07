using System;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Hover
{
    internal class HoverClient : BaseClient<Proto.Hover.HoverClient>, IHoverService
    {
        internal HoverClient(Proto.Hover.HoverClient client, Session session, ILogger logger) : base(
            client, session, logger, "hover")
        {
        }

        internal HoverClient(CallInvoker channelBase, Session session, ILogger logger) : this(
            new Proto.Hover.HoverClient(channelBase), session, logger)
        {
        }

        public Task<string> Query(HoverRequest request, CancellationToken cancellationToken = default)
        {
            var msg = new HoverReadRequest
            {
                Session = CreateSession(),
                XFromCenter = checked((uint) request.XFromCenter),
                YFromCenter = checked((uint) request.YFromCenter),
            };
            Func<Task<HoverReadResponse>, string> continuationFunction = task => task.Result.Text;
            var loggedParser = LoggedParser(continuationFunction);
            return Client.HoverReadAsync(msg, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<string> Stream(HoverRequest request, CancellationToken cancellationToken = default)
        {
            var msg = new HoverReadStreamRequest
            {
                Session = CreateSession(),
                XFromCenter = checked((uint) request.XFromCenter),
                YFromCenter = checked((uint) request.YFromCenter),
            };
            var call = Client.HoverReadStream(msg, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<HoverReadStreamResponse, string>(response => response.Text);
            return new StreamingCall<HoverReadStreamResponse, string>(call, loggedParser);
        }
    }
}