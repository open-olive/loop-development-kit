using System;
using System.Reflection.Metadata.Ecma335;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Cursor
{
    internal class CursorClient : BaseClient<Proto.Cursor.CursorClient>, ICursorService
    {
        internal CursorClient(ChannelBase channelBase, Session session, ILogger logger) : base(
            new Proto.Cursor.CursorClient(channelBase), session, logger, "cursor")
        {
        }

        public Task<CursorPosition> Query(CancellationToken cancellationToken = default)
        {
            var request = new CursorPositionRequest
            {
                Session = CreateSession()
            };
            var continuationFunction =
                LoggedParser<Task<Proto.CursorPositionResponse>, CursorPosition>(ToPosition);
            return Client.CursorPositionAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(continuationFunction, cancellationToken);
        }

        public IStreamingCall<CursorPosition> Stream(CancellationToken cancellationToken = default)
        {
            var request = new CursorPositionStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.CursorPositionStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<CursorPositionStreamResponse, CursorPosition>(call,
                LoggedParser<Proto.CursorPositionStreamResponse, CursorPosition>(ToPosition));
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

        private static CursorPosition ToPosition(CursorPositionResponse response)
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