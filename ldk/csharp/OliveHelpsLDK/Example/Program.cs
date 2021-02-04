using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Whispers.Forms;
using OliveHelpsLDK.Whispers.Forms.Outputs;
using OliveHelpsLDK.Window;
using Checkbox = OliveHelpsLDK.Whispers.Forms.Inputs.Checkbox;
using Email = OliveHelpsLDK.Whispers.Forms.Inputs.Email;
using IBase = OliveHelpsLDK.Whispers.Forms.Inputs.IBase;
using ICheckbox = OliveHelpsLDK.Whispers.Forms.Outputs.ICheckbox;
using IEmail = OliveHelpsLDK.Whispers.Forms.Outputs.IEmail;
using IMarkdown = OliveHelpsLDK.Whispers.Forms.Outputs.IMarkdown;
using ListAlign = OliveHelpsLDK.Whispers.List.Align;
using ListBase = OliveHelpsLDK.Whispers.List.ListBase;
using ListLink = OliveHelpsLDK.Whispers.List.ListLink;
using ListPair = OliveHelpsLDK.Whispers.List.ListPair;
using Markdown = OliveHelpsLDK.Whispers.Forms.Inputs.Markdown;
using Number = OliveHelpsLDK.Whispers.Forms.Inputs.Number;
using Password = OliveHelpsLDK.Whispers.Forms.Inputs.Password;
using Radio = OliveHelpsLDK.Whispers.Forms.Inputs.Radio;
using Select = OliveHelpsLDK.Whispers.Forms.Inputs.Select;
using Telephone = OliveHelpsLDK.Whispers.Forms.Inputs.Telephone;
using Text = OliveHelpsLDK.Whispers.Forms.Inputs.Text;
using Time = OliveHelpsLDK.Whispers.Forms.Inputs.Time;

namespace Example
{
    class Program
    {
        public static void Main(string[] args)
        {
            ILogger logger = new Logger("csharp-clipboard-example");
            TaskScheduler.UnobservedTaskException += (sender, eventArgs) =>
            {
                logger.Error("Unhandled Task Exception",
                    new Dictionary<string, object>() {{"error", eventArgs.Exception}});
            };
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

        private IStreamingCall<string> _textStream;

        public ILogger Logger;

        public Task Start(ILoopServices services)
        {
            _services = services;
            ClipboardStream();
            return Task.CompletedTask;
        }

        public Task Stop()
        {
            _services = null;
            _clipboardStream?.Dispose();
            return Task.CompletedTask;
        }

        private void ClipboardStream()
        {
            _clipboardStream = _services.Clipboard.Stream();
            Logger.Info("Started Streaming Clipboard");
            Task.Run(async () =>
            {
                await foreach (var clipboardContent in _clipboardStream.ToAsyncEnumerable())
                {
                    try
                    {
                        Logger.Info($"Received Clipboard Update \"{clipboardContent}\"");
                        switch (clipboardContent)
                        {
                            case "fileinfo":
                                Logger.Info("Starting File Info");
                                try
                                {
                                    var fileInfoStream = FileInfoStream();
                                    fileInfoStream.ContinueWith(
                                        continuationAction: (task =>
                                        {
                                            Logger.Error("Handled Exception", task.Exception);
                                        }), TaskContinuationOptions.OnlyOnFaulted);
                                }
                                catch (Exception e)
                                {
                                    Logger.Error("Exception Caught",
                                        new Dictionary<string, object>() {{"error", e.ToString()}});
                                }

                                break;
                            case "formnew":
                                FormStream();
                                Logger.Info("Starting Form Stream");
                                break;
                            case "keystart":
                                KeyboardStream();
                                break;
                            case "keystop":
                                KeyboardStream(false);
                                break;
                            case "windowtest":
                                WindowStream();
                                break;
                            case "listtest":
                                EmitListWhisper();
                                break;
                            default:
                                EmitWhisper(clipboardContent);
                                break;
                        }
                    }
                    catch (Exception e)
                    {
                        Logger.Error(e.ToString());
                    }
                }
            });
        }

        private void WindowStream()
        {
            var stream = _services.Window.StreamState();
            Task.Run(async () =>
            {
                while (await stream.MoveNext())
                {
                    if (stream.Current().Action == WindowEventAction.TitleChanged)
                    {
                        Logger.Info("Window Title Changed Action Received");
                        continue;
                    }

                    if (stream.Current().Action == WindowEventAction.Moved)
                    {
                        Logger.Info("Window Moved Action Received");
                        continue;
                    }

                    if (stream.Current().Action == WindowEventAction.Resized)
                    {
                        Logger.Info("Window Resized Action Received");
                    }
                }
            });
        }

        private void KeyboardStream(bool start = true)
        {
            if (start && _textStream == null)
            {
                _textStream = _services.Keyboard.StreamText();
                Task.Run(async () =>
                {
                    while (await _textStream.MoveNext())
                    {
                        Logger.Info("Keyboard Stream Received",
                            new Dictionary<string, object>() {["text"] = _textStream.Current()});
                    }
                });
            }
            else if (start == false && _textStream != null)
            {
                _textStream?.Dispose();
                _textStream = null;
            }
        }

        private void EmitWhisper(string content)
        {
            var ccs = new CancellationTokenSource();
            ccs.CancelAfter(5000);
            _services.Whisper.MarkdownAsync(new WhisperMarkdown
            {
                Markdown = content,
                Config = new WhisperConfig
                {
                    Label = "C# Whisper"
                }
            }, ccs.Token);
            Logger.Info($"Sent Whisper {content}");
        }

        private async Task FileInfoStream()
        {
            var file = await _services.Filesystem.OpenFile("/tmp/log3.txt");
            Logger.Info("Requesting File Info");
            var fileInfo = await file.FileInfo();
            Logger.Info($"Received File Info - {fileInfo.ToString()}",
                new Dictionary<string, object>() {{"file", fileInfo.ToString()}});
            await file.Close();
            Logger.Info("File Closed");
            var fileInfoJson = JsonSerializer.Serialize(fileInfo);
            Logger.Info(fileInfoJson);
            EmitWhisper(fileInfoJson);
        }

        private void EmitListWhisper()
        {
            var ccs = new CancellationTokenSource();
            ccs.CancelAfter(5000);
            var whisperList = new WhisperList
            {
                Config = new WhisperConfig {
                    Label = "C# Whisper"
                },
                Elements =  new Dictionary<string, ListBase>
                {
                    ["Nickname"] = new ListPair {Label="Nickname", Order=1, Value="Old Greg"},
                    ["Link"] = new ListLink {Align=ListAlign.Center, Href="https://isitchristmas.com/", Order=2, Text="Is it Christmas?" }
                },
            };       
            _services.Whisper.ListAsync(whisperList, ccs.Token);
            Logger.Info($"Sent List Whisper");
        }

        private void FormStream()
        {
            var whisperForm = new WhisperForm
            {
                CancelLabel = "Cancel",
                SubmitLabel = "Submit",
                Config = new WhisperConfig
                {
                    Label = "C# Whisper Form"
                },
                Inputs = new Dictionary<string, IBase>
                {
                    ["Checkbox"] = new Checkbox {Label = "checkbox", Tooltip = "checkbox tooltip", Value = true},
                    ["Email"] = new Email {Label = "email", Tooltip = "email tooltip", Value = "hi@hi.com"},
                    ["Markdown"] = new Markdown
                        {Label = "markdown", Tooltip = "markdown tooltip", Value = "# Hello\n\n How are you"},
                    ["Number"] = new Number
                        {Label = "number", Tooltip = "number tooltip", Value = 5, Max = 10, Min = 0},
                    ["Password"] = new Password {Label = "password", Tooltip = "password tooltip"},
                    ["Radio"] = new Radio
                        {Label = "radio", Tooltip = "radio tooltip", Options = new[] {"Radio1", "Radio2"}},
                    ["Select"] = new Select
                    {
                        Label = "select", Tooltip = "select tooltip", Options = new[] {"Select1", "Select2"}
                    },
                    ["Telephone"] = new Telephone
                    {
                        Label = "telephone", Tooltip = "telephone tooltip", Value = "888-777-6666",
                        Pattern = "XXX-XXX-XXXX"
                    },
                    ["Text"] = new Text {Label = "text", Tooltip = "text tooltip", Value = "Text"},
                    ["Time"] = new Time {Label = "time", Tooltip = "time tooltip", Value = DateTimeOffset.Now},
                }
            };
            var stream = _services.Whisper.FormAsync(whisperForm);
            Task.Run(async () =>
            {
                while (await stream.MoveNext())
                {
                    switch (stream.Current())
                    {
                        case WhisperUpdate u:
                            LogFormUpdate(u);
                            break;
                        case WhisperResult r:
                            Logger.Info("Received Form Response");
                            Logger.Info(r.IsSubmitted ? "Form Submitted" : "Form Rejected",
                                r.Outputs as IDictionary<string, object>);

                            break;
                    }
                }

                Logger.Info("Form Ended");
            });
        }

        private void LogFormUpdate(WhisperUpdate update)
        {
            switch (update.Output)
            {
                case null:
                    Logger.Info("Form Update Null");
                    break;
                case ICheckbox checkbox:
                    Logger.Info("Form Update Checkbox",
                        new Dictionary<string, object> {{"checkbox", checkbox.Value ? "true" : "false"}});
                    break;
                case IEmail email:
                    Logger.Info("Form Update Email", new Dictionary<string, object> {{"email", email.Value}});
                    break;
                case IMarkdown markdown:
                    Logger.Info("Form Update Markdown",
                        new Dictionary<string, object> {{"markdown", markdown.Value}});
                    break;
                case INone none:
                    Logger.Info("Form Update None");
                    break;
                case INumber number:
                    Logger.Info("Form Update Number",
                        new Dictionary<string, object> {{"number", number.Value.ToString()}});
                    break;
                case IPassword password:
                    Logger.Info("Form Update Password",
                        new Dictionary<string, object> {{"password", password.Value}});
                    break;
                case IRadio radio:
                    Logger.Info("Form Update Radio",
                        new Dictionary<string, object> {{"radio", radio.Value}});
                    break;
                case ISelect select:
                    Logger.Info("Form Update Select",
                        new Dictionary<string, object> {{"select", select.Value}});
                    break;
                case ITelephone telephone:
                    Logger.Info("Form Update Telephone",
                        new Dictionary<string, object> {{"telephone", telephone.Value}});
                    break;
                case IText text:
                    Logger.Info("Form Update Text",
                        new Dictionary<string, object> {{"text", text.Value}});
                    break;
                case ITime time:
                    Logger.Info("Form Update Time",
                        new Dictionary<string, object> {{"Time", time.Value.ToString()}});
                    break;
                default:
                    Logger.Warn("Form Update - Unexpected Type");
                    break;
            }
        }
    }
}