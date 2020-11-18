using System;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers;

namespace Console
{
    class Program
    {
        public static void Main(string[] args)
        {
            ILogger logger = new Logger("csharp-clipboard-example");
            LoopServer.Start(new Loop
            {
                Logger = logger
            }, logger);
        }
    }

    class Loop : ILoop
    {
        private ILoopServices _services;

        private IStreamingCall<string> _clipboardStream;

        public ILogger Logger;

        public Task Start(ILoopServices services)
        {
            _services = services;
            _clipboardStream = _services.Clipboard().Stream();
            Task.Run(async () =>
            {
                while (await _clipboardStream.MoveNext())
                {
                    var current = _clipboardStream.Current();
                    Logger.Info($"Received Clipboard Update {current}");
                    try
                    {
                        var ccs = new CancellationTokenSource();
                        ccs.CancelAfter(5000);
                        _services.Whisper().MarkdownAsync(new WhisperMarkdown
                        {
                            Markdown = $"Clipboard Content {current}",
                            Config = new WhisperConfig
                            {
                                Icon = "bathtub",
                                Label = "C# Whisper"
                            }
                        }, ccs.Token);
                        Logger.Info($"Sent Clipboard Update {current}");
                    }
                    catch (Exception e)
                    {
                        Logger.Error(e.ToString());
                    }
                }
            });
            return Task.CompletedTask;
        }

        public Task Stop()
        {
            _services = null;
            _clipboardStream?.Dispose();
            return Task.CompletedTask;
        }
    }
}