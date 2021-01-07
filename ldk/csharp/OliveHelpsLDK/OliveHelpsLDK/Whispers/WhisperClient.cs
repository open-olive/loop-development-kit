using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers.Forms;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    internal class WhisperClient : BaseClient<Whisper.WhisperClient>, IWhisperService
    {
        internal IWhisperFormParser Parser { get; }
        internal IWhisperFormBuilder Builder { get; }

        public WhisperClient(Whisper.WhisperClient client, Session session, ILogger logger,
            IWhisperFormBuilder formBuilder = null,
            IWhisperFormParser parser = null) : base(client, session, logger, "whisper")
        {
            Parser = parser ?? new WhisperFormParser();
            Builder = formBuilder ?? new WhisperFormBuilder();
        }

        public WhisperClient(CallInvoker channel, Session session, ILogger logger,
            IWhisperFormBuilder formBuilder = null,
            IWhisperFormParser parser = null) : this(new Whisper.WhisperClient(channel), session, logger)
        {
            Parser = parser ?? new WhisperFormParser();
            Builder = formBuilder ?? new WhisperFormBuilder();
        }

        public Task MarkdownAsync(WhisperMarkdown message, CancellationToken cancellationToken = default)
        {
            var request = new WhisperMarkdownRequest
            {
                Markdown = message.Markdown,
                Session = CreateSession(),
                Meta = Builder.BuildMeta(message.Config)
            };
            var whisperMarkdownAsync =
                Client.WhisperMarkdownAsync(request, new CallOptions(cancellationToken: cancellationToken));
            return whisperMarkdownAsync.ResponseAsync;
        }

        public Task<bool> ConfirmAsync(WhisperConfirm message, CancellationToken cancellationToken = default)
        {
            var request = new WhisperConfirmRequest
            {
                Markdown = message.Markdown,
                Session = CreateSession(),
                Meta = Builder.BuildMeta(message.Config),
                RejectLabel = message.RejectLabel,
                ResolveLabel = message.ResolveLabel,
            };
            var call = Client.WhisperConfirmAsync(request, new CallOptions(cancellationToken: cancellationToken));
            var loggedParser = LoggedParser<Task<WhisperConfirmResponse>, bool>(resp => resp.Result.Response);
            return call.ResponseAsync.ContinueWith(loggedParser, cancellationToken,
                TaskContinuationOptions.OnlyOnRanToCompletion, TaskScheduler.Current);
        }

        public IStreamingCall<IWhisperFormResponse> FormAsync(WhisperForm message,
            CancellationToken cancellationToken = default)
        {
            var request = Builder.BuildRequest(message, CreateSession());
            var call = Client.WhisperForm(request, CreateOptions(cancellationToken));
            var loggedParser = LoggedParser<WhisperFormStreamResponse, IWhisperFormResponse>(response =>
                Parser.ParseResponse(response));
            return new StreamingCall<WhisperFormStreamResponse, IWhisperFormResponse>(call, loggedParser);
        }

        public Task ListAsync(WhisperList message, CancellationToken cancellationToken = default)
        {
            var request = Builder.BuildRequest(message, CreateSession());
            var call = Client.WhisperListAsync(request, CreateOptions(cancellationToken));
            return call.ResponseAsync;
        }
    }
}