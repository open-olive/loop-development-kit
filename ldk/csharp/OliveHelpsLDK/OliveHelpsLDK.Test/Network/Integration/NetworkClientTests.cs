using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using NUnit.Framework;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Network;

namespace OliveHelpsLDK.Test.Network.Integration
{
    [TestFixture]
    public class NetworkClientTests
    {
        private INetworkService Client;
        private ILogger Logger = new Logger("integration-test-logger");

        [OneTimeSetUp]
        public void ConnectClient()
        {
            var channel = new Channel("localhost:4770", ChannelCredentials.Insecure);
            var session = new Session()
            {
                LoopId = "LOOP",
                Token = "TOKEN"
            };
            Client = new NetworkClient(channel, session, Logger);
        }

        [Test]
        public async Task GetsHTTPResponse()
        {
            var request = new HTTPRequest()
            {
                URL = "http://test.example.com",
                Headers = new Dictionary<string, string>()
                {
                    {"Cookie", "monster=true"}
                },
                Method = "GET",
                Body = new byte[] { 0x20 } 
            };

            var response = await Client.HTTPRequest(request);

            Assert.That(response.ResponseCode, Is.Positive);
            Assert.That(response.Data, Is.Not.Empty);
            Assert.That(response.Headers, Is.Not.Empty);
        }
    }
}