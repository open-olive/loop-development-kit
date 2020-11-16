using System.Threading;
using System.Threading.Tasks;
using Proto;

namespace OliveHelpsLDK.Storage
{
    public interface IStorageService
    {
        Task<bool> HasKey(string key, CancellationToken cancellationToken = default);
        Task<string> Read(string key, CancellationToken cancellationToken = default);
        Task Delete(string key, CancellationToken cancellationToken = default);
        Task Write(string key, string value, CancellationToken cancellationToken = default);
    }
}