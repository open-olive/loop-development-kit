using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK.Whispers.Forms;

namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperService
    {
        Task MarkdownAsync(Whispers.WhisperMarkdown message, CancellationToken cancellationToken = default);
        Task<bool> ConfirmAsync(Whispers.WhisperConfirm message, CancellationToken cancellationToken = default);
        IStreamingCall<IWhisperFormResponse> FormAsync(Whispers.WhisperForm message, CancellationToken cancellationToken = default);
    }
}