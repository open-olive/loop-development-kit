using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK.Whispers.Forms;
using OliveHelpsLDK.Whispers.Forms.Inputs;

namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperSensor
    {
        Task MarkdownAsync(WhisperMarkdown message, CancellationToken cancellationToken = default);
        Task<bool> ConfirmAsync(WhisperConfirm message, CancellationToken cancellationToken = default);

        IStreamingCall<IWhisperFormResponse> FormAsync(WhisperForm message,
            CancellationToken cancellationToken = default);

        Task ListAsync(WhisperList message, CancellationToken cancellationToken = default);
    }

    public struct WhisperConfig
    {
        public string Label;
    }

    public struct WhisperMarkdown
    {
        public string Markdown;
        public WhisperConfig Config;
    }

    public struct WhisperConfirm
    {
        public string Markdown;
        public WhisperConfig Config;
        public string ResolveLabel;
        public string RejectLabel;
    }

    public struct WhisperForm
    {
        public string Markdown;
        public WhisperConfig Config;
        public string SubmitLabel;
        public string CancelLabel;
        public IDictionary<string, IBase> Inputs;
    }

    public struct WhisperList
    {
        public WhisperConfig Config;
        public IDictionary<string, List.ListBase> Elements;
    }
}