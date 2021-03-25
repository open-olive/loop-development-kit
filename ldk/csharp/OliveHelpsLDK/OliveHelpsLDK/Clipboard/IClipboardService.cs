using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Clipboard
{
    /// <summary>
    /// Provides access to the contents of the Clipboard.
    /// </summary>
    public interface IClipboardService
    {
        /// <summary>
        /// Reads the clipboard's contents.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns>A Task resolving with the string contents of the clipboard.</returns>
        Task<string> Read(CancellationToken cancellationToken = default);

        /// <summary>
        /// Writes the provided text to the clipboard.
        /// </summary>
        /// <param name="contents">The text to write to the clipboard.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A Task resolving when the request is completed.</returns>
        Task Write(string contents, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream receiving updates when the clipboard's contents change.
        /// </summary>
        /// <param name="includeOliveHelpTraffic">Configuration if returning clipboard event text captured from internal olive help windows needs to be returned as part of the stream</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A clipboard strings stream</returns>
        IStreamingCall<string> Stream(bool includeOliveHelpTraffic = false, CancellationToken cancellationToken = default);
    }
}