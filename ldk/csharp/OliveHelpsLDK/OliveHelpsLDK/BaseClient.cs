using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
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

        protected Func<TResult, TResponse> LoggedParser<TResult, TResponse>(
            Func<TResult, TResponse> expression, [CallerMemberName] string callerMemberName = "")
        {
            return func =>
            {
                var dictionary = new Dictionary<string, object> {{"method", callerMemberName}};
                try
                {
                    Logger.Trace("Parsing Result", dictionary);
                    return expression(func);
                }
                catch (Exception e)
                {
                    Logger.Error("Parsing Caller Failed",
                        dictionary);
                    throw new ParsingException($"Parsing Failed in {callerMemberName}", e);
                }
            };
        }
    }
}