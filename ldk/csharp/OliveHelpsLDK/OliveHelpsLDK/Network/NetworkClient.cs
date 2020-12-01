using System.Threading;
using System.Threading.Tasks;
using Google.Protobuf;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Network
{
    internal class NetworkClient : BaseClient<Proto.Network.NetworkClient>, INetworkService
    {
        internal NetworkClient(Proto.Network.NetworkClient client, Session session, ILogger logger) : base(client,
            session, logger, "network")
        {
        }

        internal NetworkClient(ChannelBase channelBase, Session session, ILogger logger) : this(
            new Proto.Network.NetworkClient(channelBase), session, logger)
        {
        }


        public Task<HTTPResponse> HTTPRequest(HTTPRequest request, CancellationToken cancellationToken = default)
        {
            var message = new HTTPRequestMsg
            {
                Session = CreateSession(),
                Body = ByteString.CopyFrom(request.Body),
                Method = request.Method,
                Url = request.URL
            };
            return Client.HTTPRequestAsync(message, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(LoggedParser<Task<HTTPResponseMsg>, HTTPResponse>(task => FromProto(task.Result)),
                    cancellationToken);
        }

        internal static HTTPResponse FromProto(HTTPResponseMsg response)
        {
            return new HTTPResponse
            {
                Data = response.ToByteArray(),
                ResponseCode = checked((int) response.ResponseCode)
            };
        }
    }
}