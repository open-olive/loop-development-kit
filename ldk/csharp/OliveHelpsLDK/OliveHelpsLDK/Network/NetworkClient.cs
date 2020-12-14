using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Google.Protobuf;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;
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

            message.Headers.Add(request.Headers);

            return Client.HTTPRequestAsync(message, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(LoggedParser<Task<HTTPResponseMsg>, HTTPResponse>(task => FromProto(task.Result)),
                    cancellationToken);
        }

        internal static HTTPResponse FromProto(HTTPResponseMsg response)
        {
            var clientResponse = new HTTPResponse
            {
                Data = response.ToByteArray(),
                ResponseCode = checked((int) response.ResponseCode)
            };

            clientResponse.Headers = ParseHeaders(response.Headers);

            return clientResponse;
        }

        private static IDictionary<string, IList<string>> ParseHeaders(MapField<string, ListValue> headers)
        {
            var parsedHeaders = new Dictionary<string, IList<string>>();

            foreach (var kvp in headers) parsedHeaders.Add(kvp.Key, ParseHeaderValues(kvp.Value));

            return parsedHeaders;
        }

        private static IList<string> ParseHeaderValues(ListValue listValue)
        {
            var values = new List<string>();

            foreach (var value in listValue.Values) values.Add(value.StringValue);

            return values;
        }
    }
}