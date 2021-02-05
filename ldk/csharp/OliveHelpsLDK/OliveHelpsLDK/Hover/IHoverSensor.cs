using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Hover
{
    public interface IHoverSensor
    {
        Task<string> Query(HoverRequest request, CancellationToken cancellationToken = default);

        IStreamingCall<string> Stream(HoverRequest request, CancellationToken cancellationToken = default);
    }

    public struct HoverRequest
    {
        public int XFromCenter;
        public int YFromCenter;
    }
}