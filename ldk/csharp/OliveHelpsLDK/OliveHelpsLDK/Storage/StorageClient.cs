using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using Proto;

namespace OliveHelpsLDK.Storage
{
    internal class StorageClient : BaseClient<Proto.Storage.StorageClient>, IStorageService
    {
        internal StorageClient(Proto.Storage.StorageClient client, Session session, ILogger logger) : base(
            client, session, logger, "storage")
        {
        }

        internal StorageClient(CallInvoker channelBase, Session session, ILogger logger) : this(
            new Proto.Storage.StorageClient(channelBase), session, logger)
        {
        }

        public Task<bool> HasKey(string key, CancellationToken cancellationToken = default)
        {
            var req = new StorageExistsRequest
            {
                Key = key,
                Session = CreateSession()
            };
            return Client.StorageExistsAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(LoggedParser<Task<StorageExistsResponse>, bool>(task => task.Result.Exists),
                    cancellationToken);
        }

        public Task<string> Read(string key, CancellationToken cancellationToken = default)
        {
            var req = new StorageReadRequest
            {
                Key = key,
                Session = CreateSession()
            };
            return Client.StorageReadAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(LoggedParser<Task<StorageReadResponse>, string>(task => task.Result.Value),
                    cancellationToken);
        }

        public Task Delete(string key, CancellationToken cancellationToken = default)
        {
            var req = new StorageDeleteRequest
            {
                Key = key,
                Session = CreateSession()
            };
            return Client.StorageDeleteAsync(req, CreateOptions(cancellationToken)).ResponseAsync;
        }

        public Task Write(string key, string value, CancellationToken cancellationToken = default)
        {
            var req = new StorageWriteRequest
            {
                Key = key,
                Session = CreateSession()
            };
            return Client.StorageWriteAsync(req, CreateOptions(cancellationToken)).ResponseAsync;
        }
    }
}