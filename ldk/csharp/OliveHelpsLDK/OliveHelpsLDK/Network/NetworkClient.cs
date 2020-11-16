using System.Threading;
using System.Threading.Tasks;
using Google.Protobuf;
using Grpc.Core;

namespace OliveHelpsLDK.Network
{
    internal class NetworkClient : BaseClient<Proto.Network.NetworkClient>, INetworkService
    {
        internal NetworkClient(ChannelBase channelBase, Session session)
        {
            _client = new Proto.Network.NetworkClient(channelBase);
            _session = session;
        }


        public Task<HTTPResponse> HTTPRequest(HTTPRequest request, CancellationToken cancellationToken = default)
        {
            var message = new Proto.HTTPRequestMsg()
            {
                Session = CreateSession(),
                Body = ByteString.CopyFrom(request.Body),
                Method = request.Method,
                Url = request.URL
            };
            return _client.HTTPRequestAsync(message, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(task => FromProto(task.Result), cancellationToken);
        }

        internal static HTTPResponse FromProto(Proto.HTTPResponseMsg response)
        {
            return new HTTPResponse
            {
                Data = response.ToByteArray(),
                ResponseCode = checked((int) response.ResponseCode)
            };
        }
    }
}