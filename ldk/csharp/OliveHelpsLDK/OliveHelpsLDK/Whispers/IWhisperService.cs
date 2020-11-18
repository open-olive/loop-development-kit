using System.Collections.Generic;
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
    
    public struct WhisperStyle
    {
        public string BackgroundColor;
        public string PrimaryColor;
        public string HighlightColor;
    }

    public struct WhisperConfig
    {
        public string Icon;
        public string Label;
        public WhisperStyle Style;
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
        public IDictionary<string, Forms.Inputs.IBase> Inputs;
    }
}