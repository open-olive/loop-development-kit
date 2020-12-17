using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Network
{
    public interface INetworkService
    {
        Task<HTTPResponse> HTTPRequest(HTTPRequest request, CancellationToken cancellationToken = default);
    }

    public struct HTTPRequest
    {
        public string URL;

        public string Method;

        public byte[] Body;

        public IDictionary<string, IList<string>> Headers;
    }

    public struct HTTPResponse
    {
        public int ResponseCode;

        public byte[] Data;

        public IDictionary<string, IList<string>> Headers;
    }
}