using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;

namespace OliveHelpsLDK.Storage
{
    internal class StorageClient : BaseClient<Proto.Storage.StorageClient>, IStorageService
    {
        internal StorageClient(ChannelBase channelBase, Session session)
        {
            _client = new Proto.Storage.StorageClient(channelBase);
            _session = session;
        }

        public Task<bool> HasKey(string key, CancellationToken cancellationToken = default)
        {
            var req = new Proto.StorageExistsRequest
            {
                Key = key,
                Session = CreateSession()
            };
            return _client.StorageExistsAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(task => task.Result.Exists, cancellationToken);
        }

        public Task<string> Read(string key, CancellationToken cancellationToken = default)
        {
            var req = new Proto.StorageReadRequest()
            {
                Key = key,
                Session = CreateSession()
            };
            return _client.StorageReadAsync(req, CreateOptions(cancellationToken)).ResponseAsync
                .ContinueWith(task => task.Result.Value, cancellationToken);
        }

        public Task Delete(string key, CancellationToken cancellationToken = default)
        {
            var req = new Proto.StorageDeleteRequest()
            {
                Key = key,
                Session = CreateSession()
            };
            return _client.StorageDeleteAsync(req, CreateOptions(cancellationToken)).ResponseAsync;
        }

        public Task Write(string key, string value, CancellationToken cancellationToken = default)
        {
            var req = new Proto.StorageWriteRequest()
            {
                Key = key,
                Session = CreateSession()
            };
            return _client.StorageWriteAsync(req, CreateOptions(cancellationToken)).ResponseAsync;
        }
    }
}