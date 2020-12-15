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
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> Stream(CancellationToken cancellationToken = default);
    }
}