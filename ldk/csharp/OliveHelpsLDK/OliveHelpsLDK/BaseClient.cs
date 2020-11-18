using System.Collections.Generic;
using System.Threading;
using Grpc.Core;
using OliveHelpsLDK.Logging;

namespace OliveHelpsLDK
{
    internal abstract class BaseClient<TClient>
    {
        protected TClient Client { get; set; }

        protected ILogger Logger { get; set; }

        internal Session Session { get; set; }

        internal BaseClient(TClient client, Session session, ILogger logger, string service)
        {
            Client = client;
            Session = session;
            Logger = logger.WithFields(new Dictionary<string, object>
                {
                    {
                        "service", service
                    }
                }
            );
        }

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