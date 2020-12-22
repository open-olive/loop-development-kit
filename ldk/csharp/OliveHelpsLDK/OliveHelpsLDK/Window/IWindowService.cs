using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Window
{
    public interface IWindowService
    {
        /// <summary>
        /// Gets the active/focused window.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<WindowInfo> QueryActive(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream receiving updates whenever the active/focused window changes.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<WindowInfo> StreamActive(CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets a list of all active windows.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<WindowInfo[]> QueryState(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream receiving updates whenever a window's state changes (focused/unfocused, opened/closed)
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<WindowEvent> StreamState(CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Represents an open window.
    /// </summary>
    public struct WindowInfo
    {
        /// <summary>
        /// The title of the window.
        /// </summary>
        public string Title;

        /// <summary>
        /// The application path for the window.
        /// </summary>
        public string Path;

        /// <summary>
        /// The process ID the window is opened under.
        /// </summary>
        public long Pid;

        /// <summary>
        /// The distance, in pixels, from the left of the screen, to the top-left corner of the window.
        /// </summary>
        public int X;

        /// <summary>
        /// The distance, in pixels, from the top of the screen, to the top-left corner of the window.
        /// </summary>        
        public int Y;

        /// <summary>
        /// The width, in pixels, of the window.
        /// </summary>
        public int Width;

        /// <summary>
        /// The height, in pixels, of the window.
        /// </summary>
        public int Height;
    }

    /// <summary>
    /// The type of change taking place in the Window.
    /// </summary>
    public enum WindowEventAction
    {
        /// <summary>
        /// Unknown value. Not expected to occur in production.
        /// </summary>
        Unknown,

        /// <summary>
        /// This Window has received focus, and/or was launched with focus.
        /// </summary>
        Focused,

        /// <summary>
        /// This Window has lost focus.
        /// </summary>
        Unfocused,

        /// <summary>
        /// The Window has opened. If the window was opened with focus, then only a <see cref="Focused"/> action
        /// will be triggered.
        /// </summary>
        Opened,

        /// <summary>
        /// The Window has closed.
        /// </summary>
        Closed
    }

    /// <summary>
    /// A change to a window.
    /// </summary>
    public struct WindowEvent
    {
        /// <summary>
        /// The Window information. None of this, except the process ID, remains stable.
        /// </summary>
        public WindowInfo Window;

        /// <summary>
        /// The type of action happening to the window.
        /// </summary>
        public WindowEventAction Action;
    }
}