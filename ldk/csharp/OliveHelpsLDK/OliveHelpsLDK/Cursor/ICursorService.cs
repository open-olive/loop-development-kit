using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Cursor
{
    /// <summary>
    /// Provides access to the mouse's cursor position.
    /// </summary>
    public interface ICursorService
    {
        /// <summary>
        /// Gets the current position of the cursor.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<CursorPosition> Query(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a streaming call receiving updates whenever the mouse's position changes.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<CursorPosition> Stream(CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Captures the cursor position data.
    /// </summary>
    public struct CursorPosition
    {
        /// <summary>
        /// Pixels from left.
        /// </summary>
        public int X;

        /// <summary>
        /// Pixels from top.
        /// </summary>
        public int Y;
    }
}