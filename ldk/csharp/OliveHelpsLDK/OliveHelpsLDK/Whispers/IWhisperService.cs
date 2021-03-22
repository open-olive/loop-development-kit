using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK.Whispers.Disambiguation;
using OliveHelpsLDK.Whispers.Forms;
using OliveHelpsLDK.Whispers.Forms.Inputs;

namespace OliveHelpsLDK.Whispers
{
    /// <summary>
    /// Provides the ability to create various types of Whispers.
    /// </summary>
    public interface IWhisperService
    {
        /// <summary>
        /// Generates a Markdown formatted whisper.
        /// </summary>
        /// <param name="message">The whisper to be presented.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A Task that resolves once the whisper is closed by the user.</returns>
        Task MarkdownAsync(WhisperMarkdown message, CancellationToken cancellationToken = default);

        /// <summary>
        /// Generates a Confirm whisper where the user can click on one of two buttons.
        /// </summary>
        /// <param name="message">The whisper configuration to present.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>A Task that resolves with whether the user has clicked the resolve button (<c>true</c>), or
        /// <c>false</c> when the user either closed the whisper or clicked the reject button.</returns>
        Task<bool> ConfirmAsync(WhisperConfirm message, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream that receives updates to a Whisper with form elements that is presented to the user.
        /// </summary>
        /// <remarks>
        ///
        /// </remarks>
        /// <param name="message"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<IWhisperFormResponse> FormAsync(WhisperForm message,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Generates a List Whisper.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task ListAsync(WhisperList message, CancellationToken cancellationToken = default);

        /// <summary>
        /// Generates a Disambiguation Whisper.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<IWhisperDisambiguationResponse> DisambiguationAsync(WhisperDisambiguation message, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Whisper configuration data.
    /// </summary>
    public struct WhisperConfig
    {
        /// <summary>
        /// The Label of the tweet.
        /// </summary>
        public string Label;
    }

    /// <summary>
    /// Markdown Whisper configuration.
    /// </summary>
    public struct WhisperMarkdown
    {
        /// <summary>
        /// Markdown formatted string to present as data.
        /// </summary>
        public string Markdown;

        /// <summary>
        /// Whisper configuration.
        /// </summary>
        public WhisperConfig Config;
    }

    /// <summary>
    /// Confirmation Whisper (Whisper with Resolve and Reject buttons) configuration.
    /// </summary>
    public struct WhisperConfirm
    {
        /// <summary>
        /// Markdown formatted string to be rendered in the whisper.
        /// </summary>
        public string Markdown;

        /// <summary>
        /// Whisper configuration.
        /// </summary>
        public WhisperConfig Config;

        /// <summary>
        /// The button label on the Resolve button.
        /// </summary>
        public string ResolveLabel;

        /// <summary>
        /// 
        /// </summary>
        public string RejectLabel;
    }

    /// <summary>
    /// Form Whisper configuration data.
    /// </summary>
    public struct WhisperForm
    {
        /// <summary>
        /// Markdown formatted string displayed at the top of the form.
        /// </summary>
        public string Markdown;

        /// <summary>
        /// Whisper configuration.
        /// </summary>
        public WhisperConfig Config;

        /// <summary>
        /// The label on the Submit button.
        /// </summary>
        public string SubmitLabel;

        /// <summary>
        /// The label on the Cancel button.
        /// </summary>
        public string CancelLabel;

        /// <summary>
        /// A Dictionary of form keys and their input configurations. See <see cref="IBase"/> for instructions on how to use this.
        /// </summary>
        public IDictionary<string, IBase> Inputs;
    }

    /// <summary>
    /// Configures a List Whisper
    /// </summary>
    public struct WhisperList
    {
        /// <summary>
        /// Whisper configuration.
        /// </summary>
        public WhisperConfig Config;

        /// <summary>
        /// Markdown formatted string displayed at the top of the form.
        /// </summary>
        public string Markdown;

        /// <summary>
        /// The list elements for this field.
        /// </summary>
        public IDictionary<string, List.ListBase> Elements;
    }

    /// <summary>
    /// Configures a Disambiguation Whisper
    /// </summary>
    public struct WhisperDisambiguation
    {
        /// <summary>
        /// Whisper configuration.
        /// </summary>
        public WhisperConfig Config;

        /// <summary>
        /// Markdown formatted string displayed at the top of the form.
        /// </summary>
        public string Markdown;

        /// <summary>
        /// The list elements for this field.
        /// </summary>
        public IDictionary<string, Disambiguation.Base> Elements;
    }
}