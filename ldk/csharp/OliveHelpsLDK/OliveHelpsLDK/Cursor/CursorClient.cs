using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Cursor
{
    internal class CursorClient : BaseClient<Proto.Cursor.CursorClient>, ICursorService
    {
        internal CursorClient(Proto.Cursor.CursorClient client, Session session, ILogger logger) : base(
            client, session, logger, "cursor")
        {
        }

        internal CursorClient(CallInvoker channelBase, Session session, ILogger logger) : this(
            new Proto.Cursor.CursorClient(channelBase), session, logger)
        {
        }

        public Task<CursorPosition> Query(CancellationToken cancellationToken = default)
        {
            var request = new CursorPositionRequest
            {
                Session = CreateSession()
            };
            var loggedParser = LoggedParser<Task<CursorPositionResponse>, CursorPosition>(ToPosition);
            return Client.CursorPositionAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public IStreamingCall<CursorPosition> Stream(CancellationToken cancellationToken = default)
        {
            var request = new CursorPositionStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.CursorPositionStream(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<CursorPositionStreamResponse, CursorPosition>(ToPosition);
            return new StreamingCall<CursorPositionStreamResponse, CursorPosition>(call, loggedParser);
        }

        private static CursorPosition ToPosition(Task<CursorPositionResponse> task)
        {
            var response = task.Result;
            return new CursorPosition
            {
                Screen = checked((int) response.Screen),
                X = response.X,
                Y = response.Y
            };
        }

        private static CursorPosition ToPosition(CursorPositionStreamResponse response)
        {
            return new CursorPosition
            {
                Screen = checked((int) response.Screen),
                X = response.X,
                Y = response.Y
            };
        }
    }
}