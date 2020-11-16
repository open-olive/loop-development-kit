using System.Threading;

namespace OliveHelpsLDK.UI
{
    public interface IUIService
    {
        IStreamingCall<string> StreamGlobalSearch(CancellationToken cancellationToken = default);

        IStreamingCall<string> StreamSearchbar(CancellationToken cancellationToken = default);
    }
}