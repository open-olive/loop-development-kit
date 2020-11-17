using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using OliveHelpsLDK.Whispers.Forms.Inputs;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    public class WhisperFormBuilder : IWhisperFormBuilder
    {
        public const string BackgroundColor = "#FFF";
        public const string PrimaryColor = "#666";
        public const string HighlightColor = "#651FFF";


        public WhisperFormRequest BuildRequest(WhisperForm formRequest, Proto.Session session)
        {
            var request = new WhisperFormRequest
            {
                Session = session,
                CancelLabel = formRequest.CancelLabel,
                Markdown = formRequest.Markdown,
                Meta = BuildMeta(formRequest.Config),
                SubmitLabel = formRequest.SubmitLabel,
            };
            BuildInputs(request.Inputs, formRequest.Inputs);
            return request;
        }

        private void BuildInputs(IDictionary<string, WhisperFormInput> inputs,
            IDictionary<string, IBase> formRequestInputs)
        {
            formRequestInputs.ToList().ForEach(input => inputs.Add(input.Key, BuildInput(input.Value)));
        }

        private WhisperFormInput BuildInput(IBase input)
        {
            var formInput = new WhisperFormInput();
            switch (input)
            {
                case Checkbox checkbox:
                    formInput.Checkbox = checkbox.ToProto();
                    break;
                case Email email:
                    formInput.Email = email.ToProto();
                    break;
                case Markdown markdown:
                    formInput.Markdown = markdown.ToProto();
                    break;
                case Number number:
                    formInput.Number = number.ToProto();
                    break;
                case Password password:
                    formInput.Password = password.ToProto();
                    break;
                case Radio radio:
                    formInput.Radio = radio.ToProto();
                    break;
                case Select select:
                    formInput.Select = select.ToProto();
                    break;
                case Telephone telephone:
                    formInput.Tel = telephone.ToProto();
                    break;
                case Text text:
                    formInput.Text = text.ToProto();
                    break;
                case Time time:
                    formInput.Time = time.ToProto();
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(input));
            }

            return formInput;
        }

        public WhisperMeta BuildMeta(WhisperConfig config)
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