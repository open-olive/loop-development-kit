using System.Threading;
using Grpc.Core;

namespace OliveHelpsLDK
{
    internal abstract class BaseClient<TClient>
    {
        protected TClient Client { get; set; }

        internal Session Session { get; set; }

        protected Proto.Session CreateSession()
        {
            return new Proto.Session
            {
                LoopID = Session.LoopId,
                Token = Session.Token,
            };
        }

        protected CallOptions CreateOptions(CancellationToken token)
        {
            return new CallOptions(cancellationToken: token);
        }
    }
}