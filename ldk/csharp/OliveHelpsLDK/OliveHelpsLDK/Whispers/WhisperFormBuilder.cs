using System;
using System.Collections.Generic;
using System.Linq;
using OliveHelpsLDK.Whispers.Forms.Inputs;
using OliveHelpsLDK.Whispers.List;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    /// <summary>
    /// Builds messages for Whisper Forms.
    /// </summary>
    public class WhisperFormBuilder : IWhisperFormBuilder
    {
        public WhisperFormRequest BuildRequest(WhisperForm formRequest, Proto.Session session)
        {
            var request = new WhisperFormRequest
            {
                Session = session,
                CancelLabel = formRequest.CancelLabel ?? "Cancel",
                Markdown = formRequest.Markdown ?? "Markdown",
                Meta = BuildMeta(formRequest.Config),
                SubmitLabel = formRequest.SubmitLabel ?? "Submit",
            };
            BuildInputs(request.Inputs, formRequest.Inputs);
            return request;
        }

        public WhisperListRequest BuildRequest(WhisperList list, Proto.Session session)
        {
            var request = new WhisperListRequest
            {
                Meta = BuildMeta(list.Config),
                Markdown = list.Markdown,
                Session = session
            };
            BuildInputs(request.Elements, list.Elements);
            return request;
        }

        public WhisperMeta BuildMeta(WhisperConfig config)
        {
            return new WhisperMeta
            {
                Label = config.Label ?? "Whisper",
            };
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

        private void BuildInputs(IDictionary<string, WhisperListElement> messageElements,
            IDictionary<string, ListBase> items)
        {
            items.ToList().ForEach(input => messageElements.Add(input.Key, BuildInput(input.Value)));
        }

        private WhisperListElement BuildInput(ListBase element)
        {
            var listElement = new WhisperListElement
            {
                Order = element.Order,
                Extra = element.Extra,
            };
            switch (element)
            {
                case ListDivider listDivider:
                    var divider = new WhisperListElement.Types.Divider
                    {
                        Style = ToProto(listDivider.Style)
                    };
                    listElement.Divider = divider;
                    break;
                case ListMessage listMessage:
                    var message = new WhisperListElement.Types.Message
                    {
                        Align = ToProto(listMessage.Align),
                        Body = listMessage.Body,
                        Header = listMessage.Body,
                        Style = ToProto(listMessage.Style)
                    };
                    listElement.Message = message;
                    break;
                case ListPair listPair:
                    var pair = new WhisperListElement.Types.Pair
                    {
                        Copyable = listPair.Copyable,
                        Label = listPair.Label,
                        Style = ToProto(listPair.Style),
                        Value = listPair.Value,
                    };
                    listElement.Pair = pair;
                    break;
                case ListLink listLink:
                    var link = new WhisperListElement.Types.Link
                    {
                        Align = ToProto(listLink.Align),
                        Href = listLink.Href,
                        Style = ToProto(listLink.Style),
                        Text = listLink.Text,
                    };
                    listElement.Link = link;
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(element));
            }

            return listElement;
        }

        private WhisperListElement.Types.Style ToProto(Style style)
        {
            return style switch
            {
                Style.None => WhisperListElement.Types.Style.None,
                Style.Success => WhisperListElement.Types.Style.Success,
                Style.Warn => WhisperListElement.Types.Style.Warn,
                Style.Error => WhisperListElement.Types.Style.Error,
                _ => throw new ArgumentOutOfRangeException(nameof(style), style, null)
            };
        }

        private WhisperListElement.Types.Align ToProto(Align align)
        {
            return align switch
            {
                Align.Left => WhisperListElement.Types.Align.Left,
                Align.Center => WhisperListElement.Types.Align.Center,
                Align.Right => WhisperListElement.Types.Align.Right,
                _ => throw new ArgumentOutOfRangeException(nameof(align), align, null)
            };
        }
    }
}