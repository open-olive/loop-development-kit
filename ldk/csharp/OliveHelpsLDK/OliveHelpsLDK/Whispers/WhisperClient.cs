using System;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    public class WhisperClient : BaseClient, IWhisperService
    {
        public const string BackgroundColor = "#FFF";
        public const string PrimaryColor = "#666";
        public const string HighlightColor = "#651FFF";

        private Proto.Whisper.WhisperClient client;


        public WhisperClient(ChannelBase channel, Session session)
        {
            client = new Whisper.WhisperClient(channel);
            _session = session;
        }

        public Task MarkdownAsync(WhisperMarkdown message, CancellationToken cancellationToken = default)
        {
            var request = new WhisperMarkdownRequest
            {
                Markdown = message.Markdown,
                Session = CreateSession(),
                Meta = GenerateMeta(message.Config)
            };
            Console.Error.WriteLine("[DEBUG] Whisper Sent");
            var whisperMarkdownAsync =
                client.WhisperMarkdownAsync(request, new CallOptions(cancellationToken: cancellationToken));
            return whisperMarkdownAsync.ResponseAsync;
        }

        public Task<bool> ConfirmAsync(WhisperConfirm message, CancellationToken cancellationToken = default)
        {
            var request = new WhisperConfirmRequest
            {
                Markdown = message.Markdown,
                Session = CreateSession(),
                Meta = GenerateMeta(message.Config),
                RejectLabel = message.RejectLabel,
                ResolveLabel = message.ResolveLabel,
            };
            Console.Error.WriteLine("[DEBUG] Whisper Confirm Sent");
            var call = client.WhisperConfirmAsync(request, new CallOptions(cancellationToken: cancellationToken));
            return call.ResponseAsync.ContinueWith(resp => resp.Result.Response, cancellationToken);
        }

        public async Task FormAsync(WhisperForm message, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        private static WhisperMeta GenerateMeta(WhisperConfig config)
        {
            var styleBackgroundColor =
                CoerceColor(config.Style.BackgroundColor, BackgroundColor);
            var stylePrimaryColor = CoerceColor(config.Style.PrimaryColor,
                PrimaryColor);
            var styleHighlightColor = CoerceColor(config.Style.HighlightColor, HighlightColor);
            return new WhisperMeta
            {
                Icon = config.Icon,
                Label = config.Label,
                Style = new Proto.WhisperStyle
                {
                    BackgroundColor = styleBackgroundColor,
                    PrimaryColor = stylePrimaryColor,
                    HighlightColor = styleHighlightColor,
                }
            };
        }

        private static string CoerceColor(string input, string defaultColor)
        {
            return string.IsNullOrEmpty(input) ? defaultColor : input;
        }
    }
}