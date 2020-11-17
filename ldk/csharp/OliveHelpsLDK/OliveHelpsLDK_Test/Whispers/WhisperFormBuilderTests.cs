using System.Collections.Generic;
using System.Collections.Immutable;
using NUnit.Framework;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Whispers.Forms.Inputs;
using Proto;

namespace OliveHelpsLDK_Test.Whispers
{
    [TestFixture]
    public class WhisperFormBuilderTests
    {
        public WhisperFormBuilder Builder = new WhisperFormBuilder();

        public Session Session = new Session
        {
            LoopID = "LoopID",
            Token = "Token"
        };

        [Test]
        public void BuildsBasicForm()
        {
            var request = new WhisperForm
            {
                CancelLabel = "cancel",
                Markdown = "Markdown",
                SubmitLabel = "Submit",
                Config = new WhisperConfig
                {
                    Icon = "Config.Icon",
                    Label = "Config.Label",
                    Style = new OliveHelpsLDK.Whispers.WhisperStyle()
                },
                Inputs = new Dictionary<string, IBase>(){{"first", new Checkbox
                {
                    Value = true,
                    Label = "CheckboxLabel",
                    Tooltip = "CheckboxTooltip",
                    Order = 0,
                }}},
            };
            var result = Builder.BuildRequest(request, Session);
            var expected = new Proto.WhisperFormRequest()
            {
                CancelLabel = request.CancelLabel,
                SubmitLabel = request.SubmitLabel,
                Markdown = request.Markdown,
                Meta = new WhisperMeta
                {
                    Icon = "Config.Icon",
                    Label = "Config.Label",
                    Style = new Proto.WhisperStyle
                    {
                        BackgroundColor = "#FFF",
                        PrimaryColor = "#666",
                        HighlightColor = "#651FFF"
                    }
                },
                Inputs = { {"first", new WhisperFormInput
                {
                    Checkbox = new WhisperFormInput.Types.Checkbox
                    {
                        Value = true,
                        Label = "CheckboxLabel",
                        Tooltip = "CheckboxTooltip",
                        Order = 0,
                    }
                }} },
                Session = Session
            };

            Assert.That(result, Is.EqualTo(expected));

        }
    }
}