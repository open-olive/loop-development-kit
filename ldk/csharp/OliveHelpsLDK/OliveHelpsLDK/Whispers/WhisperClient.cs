using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using OliveHelpsLDK.Whispers.Forms;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    internal class WhisperClient : BaseClient<Proto.Whisper.WhisperClient>, IWhisperService
    {
        private readonly IWhisperFormParser _parser;
        private IWhisperFormBuilder _builder;


        public WhisperClient(ChannelBase channel, Session session, IWhisperFormBuilder formBuilder = null,
            IWhisperFormParser parser = null)
        {
            _parser = parser;
            _builder = formBuilder ?? new WhisperFormBuilder();
            _client = new Whisper.WhisperClient(channel);
            _session = session;
        }

        public Task MarkdownAsync(WhisperMarkdown message, CancellationToken cancellationToken = default)
        {
            var request = new WhisperMarkdownRequest
            {
                Markdown = message.Markdown,
                Session = CreateSession(),
                Meta = _builder.BuildMeta(message.Config)
            };
            var whisperMarkdownAsync =
                _client.WhisperMarkdownAsync(request, new CallOptions(cancellationToken: cancellationToken));
            return whisperMarkdownAsync.ResponseAsync;
        }

        public Task<bool> ConfirmAsync(WhisperConfirm message, CancellationToken cancellationToken = default)
        {
            var request = new WhisperConfirmRequest
            {
                Markdown = message.Markdown,
                Session = CreateSession(),
                Meta = _builder.BuildMeta(message.Config),
                RejectLabel = message.RejectLabel,
                ResolveLabel = message.ResolveLabel,
            };
            var call = _client.WhisperConfirmAsync(request, new CallOptions(cancellationToken: cancellationToken));
            return call.ResponseAsync.ContinueWith(resp => resp.Result.Response, cancellationToken);
        }

        public IStreamingCall<IWhisperFormResponse> FormAsync(WhisperForm message,
            CancellationToken cancellationToken = default)
        {
            var request = _builder.BuildRequest(message, CreateSession());
            var call = _client.WhisperForm(request, CreateOptions(cancellationToken));
            return new StreamingCall<Proto.WhisperFormStreamResponse, IWhisperFormResponse>(call,
                response => _parser.ParseResponse(response));
        }
    }
}