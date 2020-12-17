using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Network
{
    /// <summary>
    /// The NetworkService provides access to HTTP requests.
    /// </summary>
    public interface INetworkService
    {
        /// <summary>
        /// Initiates a HTTP request.
        /// </summary>
        /// <param name="request">The Request to send.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A Task resolving with the response.</returns>
        Task<HTTPResponse> HTTPRequest(HTTPRequest request, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Defines the HTTP Request to be sent.
    /// </summary>
    /// <remarks>
    /// All requests are sent with the headers <c>Content-type: application/json</c> by default. 
    /// </remarks>
    public struct HTTPRequest
    {
        /// <summary>
        /// The URL to make the request to.
        /// </summary>
        public string URL;

        /// <summary>
        /// The HTTP Method to apply.
        /// </summary>
        public string Method;

        /// <summary>
        /// The Body of the message as a byte stream.
        /// </summary>
        public byte[] Body;

        public IDictionary<string, IList<string>> Headers;
    }

    /// <summary>
    /// The HTTP Response received.
    /// </summary>
    public struct HTTPResponse
    {
        /// <summary>
        /// The HTTP Status Code in the response.
        /// </summary>
        public int ResponseCode;

        /// <summary>
        /// The response body as a byte stream.
        /// </summary>
        public byte[] Data;

        public IDictionary<string, IList<string>> Headers;
    }
}