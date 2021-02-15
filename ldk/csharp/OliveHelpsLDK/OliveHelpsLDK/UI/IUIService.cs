using System.Threading;

namespace OliveHelpsLDK.UI
{
    /// <summary>
    /// Provides access to interactions the user makes with the Olive Helps UI.
    /// </summary>
    public interface IUIService
    {
        /// <summary>
        /// Creates a stream receiving updates whenever the user enters a search in the Olive Helps Global Search.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> StreamGlobalSearch(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream receiving updates whenever the user enters a search in the Olive Helps Searchbar.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> StreamSearchbar(CancellationToken cancellationToken = default);
    }
}