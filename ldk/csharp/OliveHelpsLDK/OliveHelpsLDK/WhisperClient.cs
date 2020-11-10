using System;
using System.Threading.Tasks;
using Proto;

namespace OliveHelpsLDK
{
    public class WhisperClient
    {
        public static readonly string BackgroundColor = "#FFF";
        public static readonly string PrimaryColor = "#666";
        public static readonly string HighlightColor = "#651FFF";

        private Proto.Whisper.WhisperClient client;

        private Session _session;

        public WhisperClient(Grpc.Core.Channel channel, Session session)
        {
            client = new Whisper.WhisperClient(channel);
            _session = session;
        }

        public Task MarkdownAsync()
        {
            var request = new WhisperMarkdownRequest
            {
                Markdown = "Whispered!",
                Session = new Proto.Session
                {
                    LoopID = _session.LoopId,
                    Token = _session.Token,
                },
                Meta = new Proto.WhisperMeta
                {
                    Icon = "bathtub",
                    Label = "Hello Whisper!",
                    Style = new WhisperStyle
                    {
                        BackgroundColor = WhisperClient.BackgroundColor,
                        PrimaryColor = WhisperClient.PrimaryColor,
                        HighlightColor = WhisperClient.HighlightColor,
                    }
                }
            };
            Console.Error.WriteLine("[DEBUG] Whisper Sent");
            return client.WhisperMarkdownAsync(request).ResponseAsync;
        }
    }
}