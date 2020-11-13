using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperService
    {
        Task MarkdownAsync(Whispers.WhisperMarkdown message, CancellationToken cancellationToken = default);
        Task<bool> ConfirmAsync(Whispers.WhisperConfirm message, CancellationToken cancellationToken = default);
        // TODO: Implement form.
        Task FormAsync(Whispers.WhisperForm message, CancellationToken cancellationToken = default);
    }
}