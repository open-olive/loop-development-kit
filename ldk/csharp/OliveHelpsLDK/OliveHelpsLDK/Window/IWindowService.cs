using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Window
{
    public interface IWindowService
    {
        Task<WindowInfo> QueryActive(CancellationToken cancellationToken = default);

        IStreamingCall<WindowInfo> StreamActive(CancellationToken cancellationToken = default);

        Task<WindowInfo[]> QueryState(CancellationToken cancellationToken = default);

        IStreamingCall<WindowEvent> StreamState(CancellationToken cancellationToken = default);
    }

    public struct WindowInfo
    {
        public string Title;
        public string Path;
        public long Pid;
        public int X;
        public int Y;
        public int Width;
        public int Height;
    }

    public enum WindowEventAction
    {
        Unknown,
        Focused,
        Unfocused,
        Opened,
        Closed,
        TitleChanged,
        Moved,
        Resized
    }

    public struct WindowEvent
    {
        public WindowInfo Window;
        public WindowEventAction Action;
    }
}
