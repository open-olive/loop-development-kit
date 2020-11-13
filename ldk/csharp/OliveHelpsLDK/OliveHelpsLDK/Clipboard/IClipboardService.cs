using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK
{
}

namespace OliveHelpsLDK.Clipboard
{
    public interface IClipboardService
    {
        Task<string> Read(CancellationToken cancellationToken = default);
        Task Write(string contents, CancellationToken cancellationToken = default);

        IStreamingCall<string> Stream(CancellationToken cancellationToken = default);
    }
}