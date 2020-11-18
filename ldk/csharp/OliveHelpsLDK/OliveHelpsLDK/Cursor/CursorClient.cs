using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Proto;

namespace OliveHelpsLDK.Cursor
{
    internal class CursorClient : BaseClient<Proto.Cursor.CursorClient>, ICursorService
    {

        internal CursorClient(ChannelBase channelBase, Session session)
        {
            Client = new Proto.Cursor.CursorClient(channelBase);
            Session = session;
        }
        
        public Task<CursorPosition> Query(CancellationToken cancellationToken = default)
        {
            var request = new CursorPositionRequest
            {
                Session = CreateSession()
            };
            return Client.CursorPositionAsync(request, CreateOptions(cancellationToken))
                .ResponseAsync
                .ContinueWith(task => ToPosition(task.Result), cancellationToken);
        }

        public IStreamingCall<CursorPosition> Stream(CancellationToken cancellationToken = default)
        {
            var request = new CursorPositionStreamRequest
            {
                Session = CreateSession()
            };
            var call = Client.CursorPositionStream(request, CreateOptions(cancellationToken));
            return new StreamingCall<CursorPositionStreamResponse, CursorPosition>(call, ToPosition);
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