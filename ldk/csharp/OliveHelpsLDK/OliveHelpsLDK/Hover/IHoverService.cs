using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Hover
{
    /// <summary>
    /// Provides access to read text underneath the cursor via OCR.
    /// </summary>
    public interface IHoverService
    {
        /// <summary>
        /// Reads the text currently under the cursor.
        /// </summary>
        /// <param name="request">The size of the hover window.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<string> Query(HoverRequest request, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a streaming call that receives updates whenever the cursor moves and the text under the
        /// cursor changes.
        /// </summary>
        /// <param name="request">The size of the hover window.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<string> Stream(HoverRequest request, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// The size of the hover window.
    /// </summary>
    public struct HoverRequest
    {
        /// <summary>
        /// The size, in pixels, of the distance between the cursor position and the sides of the box being scanned.
        /// </summary>
        public int XFromCenter;

        /// <summary>
        /// The size, in pixels, of the distance between the cursor position and the top or bottom of the box
        /// being scanned.
        /// </summary>
        public int YFromCenter;
    }
}