using System.Threading;
using Grpc.Core;

namespace OliveHelpsLDK
{
    internal abstract class BaseClient<TClient>
        {
        protected TClient _client;
        
        internal Session _session;

        protected Proto.Session CreateSession()
        {
            return new Proto.Session
            {
                LoopID = _session.LoopId,
                Token = _session.Token,
            };
        }

        protected Grpc.Core.CallOptions CreateOptions(CancellationToken token)
        {
            return new CallOptions(cancellationToken: token);
        }
    }
}