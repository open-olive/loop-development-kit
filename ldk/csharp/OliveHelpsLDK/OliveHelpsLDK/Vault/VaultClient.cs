using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Vault
{
    internal class VaultClient : BaseClient<Proto.Vault.VaultClient>, IVaultService
    {
        internal VaultClient(Proto.Vault.VaultClient client, Session session, ILogger logger) : base(
            client, session, logger, "vault")
        {
        }

        internal VaultClient(CallInvoker callInvoker, Session session, ILogger logger) : this(
            new Proto.Vault.VaultClient(callInvoker), session, logger)
        {
        }

        public Task<bool> ContainsKey(string key, CancellationToken cancellationToken = default)
        {
            var req = new VaultExistsRequest
            {
                Key = key,
                Session = CreateSession()
            };
            var loggedParser = LoggedParser<Task<VaultExistsResponse>, bool>(task => task.Result.Exists);
            return Client.VaultExistsAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public Task<string> Read(string key, CancellationToken cancellationToken = default)
        {
            var req = new VaultReadRequest
            {
                Key = key,
                Session = CreateSession()
            };
            var loggedParser = LoggedParser<Task<VaultReadResponse>, string>(task => task.Result.Value);
            return Client.VaultReadAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(loggedParser, cancellationToken, TaskContinuationOptions.OnlyOnRanToCompletion,
                    TaskScheduler.Current);
        }

        public Task Delete(string key, CancellationToken cancellationToken = default)
        {
            var req = new VaultDeleteRequest
            {
                Key = key,
                Session = CreateSession()
            };
            return Client.VaultDeleteAsync(req, CreateOptions(cancellationToken)).ResponseAsync;
        }

        public Task Write(string key, string value, CancellationToken cancellationToken = default)
        {
            var req = new VaultWriteRequest
            {
                Key = key,
                Value = value,
                Session = CreateSession()
            };
            return Client.VaultWriteAsync(req, CreateOptions(cancellationToken)).ResponseAsync;
        }
    }
}