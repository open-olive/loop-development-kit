using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Storage
{
    /// <summary>
    /// Provides access to the system secure storage (Keychain in OSX, Windows Credential Manager in Windows).
    /// </summary>
    public interface IStorageService
    {
        /// <summary>
        /// Gets whether a key has been set.
        /// </summary>
        /// <param name="key">The key to check.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<bool> HasKey(string key, CancellationToken cancellationToken = default);

        /// <summary>
        /// Reads a value from the storage. 
        /// </summary>
        /// <param name="key">The key to read.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A task resolving if the value has been read, failing if there is no value to read.</returns>
        Task<string> Read(string key, CancellationToken cancellationToken = default);

        /// <summary>
        /// Deletes a key from the secure storage.
        /// </summary>
        /// <param name="key">The key to delete.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A task resolving if the value has been deleted, failing if the deletion fails or there was no value to delete.</returns>
        Task Delete(string key, CancellationToken cancellationToken = default);

        /// <summary>
        /// Writes a value to the secure storage, overwriting any existing values.
        /// </summary>
        /// <param name="key">The key to store the value in.</param>
        /// <param name="value">The value to write to storage.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A task resolving if the value has been written successfully, failing if the write fails.</returns>
        Task Write(string key, string value, CancellationToken cancellationToken = default);
    }
}