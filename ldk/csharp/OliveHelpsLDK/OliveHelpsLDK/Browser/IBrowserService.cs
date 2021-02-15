using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Browser
{
    /// <summary>
    /// The IBrowserService provides access to the Browser data like the active URL and selected text.
    /// </summary>
    /// <remarks>Not yet implemented. Browser must have the appropriate Olive Helps extension installed.</remarks>
    public interface IBrowserService
    {
        /// <summary>
        /// Gets the current active URL.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns>A Task resolving with the active URL as a string.</returns>
        Task<string> QueryActiveURL(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream that is updated whenever the browser active URL changes.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> StreamActiveURL(CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets the currently selected text.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns>Task resolving with the Selected Text data.</returns>
        Task<SelectedText> QuerySelectedText(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream to receive updates to the selected text in Browser.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<SelectedText> StreamSelectedText(CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// The SelectedText data.
    /// </summary>
    public struct SelectedText
    {
        /// <summary>
        /// The currently selected text.
        /// </summary>
        public string Text;

        /// <summary>
        /// The URL of the page where the text was selected.
        /// </summary>
        public string URL;

        /// <summary>
        /// The Page Title of the page where the text was selected.
        /// </summary>
        public string TabTitle;
    }
}