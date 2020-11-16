using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Browser
{
    public interface IBrowserService
    {
        Task<string> QueryActiveURL(CancellationToken cancellationToken = default);
        IStreamingCall<string> StreamActiveURL(CancellationToken cancellationToken = default);

        Task<SelectedText> QuerySelectedText(CancellationToken cancellationToken = default);
        IStreamingCall<SelectedText> StreamSelectedText(CancellationToken cancellationToken = default);
    }

    public struct SelectedText
    {
        public string Text;
        public string URL;
        public string TabTitle;
    }
}