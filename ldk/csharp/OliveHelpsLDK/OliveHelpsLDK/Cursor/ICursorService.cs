using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Cursor
{
    public interface ICursorService
    {
        Task<CursorPosition> Query(CancellationToken cancellationToken = default);
        IStreamingCall<CursorPosition> Stream(CancellationToken cancellationToken = default);
    }

    public struct CursorPosition
    {
        public int X;
        public int Y;
        public int Screen;
    }
}