using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Whispers.Forms;
using OliveHelpsLDK.Whispers.Forms.Outputs;
using Checkbox = OliveHelpsLDK.Whispers.Forms.Inputs.Checkbox;
using Email = OliveHelpsLDK.Whispers.Forms.Inputs.Email;
using IBase = OliveHelpsLDK.Whispers.Forms.Inputs.IBase;
using ICheckbox = OliveHelpsLDK.Whispers.Forms.Outputs.ICheckbox;
using IEmail = OliveHelpsLDK.Whispers.Forms.Outputs.IEmail;
using IMarkdown = OliveHelpsLDK.Whispers.Forms.Outputs.IMarkdown;
using Markdown = OliveHelpsLDK.Whispers.Forms.Inputs.Markdown;
using Number = OliveHelpsLDK.Whispers.Forms.Inputs.Number;
using Password = OliveHelpsLDK.Whispers.Forms.Inputs.Password;
using Radio = OliveHelpsLDK.Whispers.Forms.Inputs.Radio;
using Select = OliveHelpsLDK.Whispers.Forms.Inputs.Select;
using Telephone = OliveHelpsLDK.Whispers.Forms.Inputs.Telephone;
using Text = OliveHelpsLDK.Whispers.Forms.Inputs.Text;
using Time = OliveHelpsLDK.Whispers.Forms.Inputs.Time;

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
                        if (current == "formnew")
                        {
                            FormStream();
                            Logger.Info("Starting Form Stream");
                        }
                        else
                        {
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
                    }
                    catch (Exception e)
                    {
                        Logger.Error(e.ToString());
                    }
                }
            });
        }

        private void FormStream()
        {
            var whisperForm = new WhisperForm
            {
                CancelLabel = "Cancel",
                SubmitLabel = "Submit",
                Config = new WhisperConfig
                {
                    Icon = "bathtub",
                    Label = "C# Whisper Form"
                },
                Inputs = new Dictionary<string, IBase>()
                {
                    ["Checkbox"] = new Checkbox {Label = "checkbox", Tooltip = "checkbox tooltip", Value = true},
                    ["Email"] = new Email {Label = "email", Tooltip = "email tooltip", Value = "hi@hi.com"},
                    ["Markdown"] = new Markdown
                        {Label = "markdown", Tooltip = "markdown tooltip", Value = "# Hello\n\n How are you"},
                    ["Number"] = new Number
                        {Label = "number", Tooltip = "number tooltip", Value = 5, Max = 10, Min = 0},
                    ["Password"] = new Password {Label = "password", Tooltip = "password tooltip"},
                    ["Radio"] = new Radio
                        {Label = "radio", Tooltip = "radio tooltip", Options = new string[] {"Radio1", "Radio2"}},
                    ["Select"] = new Select
                    {
                        Label = "select", Tooltip = "select tooltip", Options = new string[] {"Select1", "Select2"}
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
            var stream = _services.Whisper().FormAsync(whisperForm);
            Task.Run(async () =>
            {
                while (await stream.MoveNext())
                {
                    switch (stream.Current())
                    {
                        case WhisperUpdate u:
                            Logger.Info("Received Form Update");
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
                        new Dictionary<string, object>() {{"checkbox", checkbox.Value ? "true" : "false"}});
                    break;
                case IEmail email:
                    Logger.Info("Form Update Email", new Dictionary<string, object>() {{"email", email.Value}});
                    break;
                case IMarkdown markdown:
                    Logger.Info("Form Update Markdown",
                        new Dictionary<string, object>() {{"markdown", markdown.Value}});
                    break;
                case INone none:
                    Logger.Info("Form Update None");
                    break;
                case INumber number:
                    Logger.Info("Form Update Number",
                        new Dictionary<string, object>() {{"number", number.Value.ToString()}});
                    break;
                case IPassword password:
                    Logger.Info("Form Update Password",
                        new Dictionary<string, object>() {{"password", password.Value}});
                    break;
                case IRadio radio:
                    Logger.Info("Form Update Radio",
                        new Dictionary<string, object>() {{"radio", radio.Value}});
                    break;
                case ISelect @select:
                    Logger.Info("Form Update Select",
                        new Dictionary<string, object>() {{"select", @select.Value}});
                    break;
                case ITelephone telephone:
                    Logger.Info("Form Update Telephone",
                        new Dictionary<string, object>() {{"telephone", telephone.Value}});
                    break;
                case IText text:
                    Logger.Info("Form Update Text",
                        new Dictionary<string, object>() {{"text", text.Value}});
                    break;
                case ITime time:
                    Logger.Info("Form Update Time",
                        new Dictionary<string, object>() {{"Time", time.Value.ToString()}});
                    break;
                default:
                    Logger.Warn("Unexpected Type");
                    break;
            }
        }
    }
}