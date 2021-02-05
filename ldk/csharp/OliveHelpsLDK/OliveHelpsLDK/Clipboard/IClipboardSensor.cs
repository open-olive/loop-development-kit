using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Clipboard
{
    public interface IClipboardSensor
    {
        Task<string> Read(CancellationToken cancellationToken = default);
        Task Write(string contents, CancellationToken cancellationToken = default);

        IStreamingCall<string> Stream(CancellationToken cancellationToken = default);
    }
}