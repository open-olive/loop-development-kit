using System.Threading;

namespace OliveHelpsLDK.UI
{
    public interface IUISensor
    {
        IStreamingCall<string> StreamGlobalSearch(CancellationToken cancellationToken = default);

        IStreamingCall<string> StreamSearchbar(CancellationToken cancellationToken = default);
    }
}