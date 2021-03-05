using System;
using System.Collections.Generic;
using System.Linq;
using OliveHelpsLDK.Whispers.Disambiguation;
using OliveHelpsLDK.Whispers.Forms;
using OliveHelpsLDK.Whispers.Forms.Outputs;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    public class WhisperFormParser : IWhisperFormParser
    {
        public IWhisperFormResponse ParseResponse(WhisperFormStreamResponse response)
        {
            return response.WhisperFormResponseOneofCase switch
            {
                WhisperFormStreamResponse.WhisperFormResponseOneofOneofCase.None => null,
                WhisperFormStreamResponse.WhisperFormResponseOneofOneofCase.Result => ParseResult(response.Result),
                WhisperFormStreamResponse.WhisperFormResponseOneofOneofCase.Update => ParseUpdate(response.Update),
                _ => throw new ArgumentOutOfRangeException(nameof(response), response.WhisperFormResponseOneofCase,
                    "Unsupported One Of Result")
            };
        }

        public IWhisperDisambiguationResponse ParseResponse(WhisperDisambiguationStreamResponse response)
        {
            return new DisambiguationResponse 
            {
                Key = response.Key
            };
        }

        private WhisperResult ParseResult(WhisperFormResult result)
        {
            return new WhisperResult
            {
                Result = result.Submitted,
                Outputs = result.Outputs
                    .Select(pair => new KeyValuePair<string, IBase>(pair.Key, ParseOutput(pair.Value)))
                    .ToDictionary(x => x.Key, x => x.Value),
            };
        }

        private WhisperUpdate ParseUpdate(WhisperFormUpdate result)
        {
            return new WhisperUpdate
            {
                Key = result.Key,
                Output = ParseOutput(result.Output),
            };
        }

        private IBase ParseOutput(WhisperFormOutput output)
        {
            return output.OutputOneofCase switch
            {
                WhisperFormOutput.OutputOneofOneofCase.None => new None(),
                WhisperFormOutput.OutputOneofOneofCase.Checkbox => FromProto(output.Checkbox),
                WhisperFormOutput.OutputOneofOneofCase.Email => FromProto(output.Email),
                WhisperFormOutput.OutputOneofOneofCase.Markdown => FromProto(output.Markdown),
                WhisperFormOutput.OutputOneofOneofCase.Number => FromProto(output.Number),
                WhisperFormOutput.OutputOneofOneofCase.Password => FromProto(output.Password),
                WhisperFormOutput.OutputOneofOneofCase.Radio => FromProto(output.Radio),
                WhisperFormOutput.OutputOneofOneofCase.Select => FromProto(output.Select),
                WhisperFormOutput.OutputOneofOneofCase.Tel => FromProto(output.Tel),
                WhisperFormOutput.OutputOneofOneofCase.Text => FromProto(output.Text),
                WhisperFormOutput.OutputOneofOneofCase.Time => FromProto(output.Time),
                _ => throw new ArgumentOutOfRangeException(nameof(output), output.OutputOneofCase,
                    "Unsupported Output Type"),
            };
        }

        private Checkbox FromProto(WhisperFormOutput.Types.Checkbox output)
        {
            return new Checkbox
            {
                Value = output.Value
            };
        }

        private Email FromProto(WhisperFormOutput.Types.Email output)
        {
            return new Email
            {
                Value = output.Value
            };
        }

        private Markdown FromProto(WhisperFormOutput.Types.Markdown output)
        {
            return new Markdown
            {
                Value = output.Value
            };
        }

        private Number FromProto(WhisperFormOutput.Types.Number output)
        {
            return new Number
            {
                Value = output.Value
            };
        }

        private Password FromProto(WhisperFormOutput.Types.Password output)
        {
            return new Password
            {
                Value = output.Value
            };
        }

        private Radio FromProto(WhisperFormOutput.Types.Radio output)
        {
            return new Radio
            {
                Value = output.Value
            };
        }

        private Select FromProto(WhisperFormOutput.Types.Select output)
        {
            return new Select
            {
                Value = output.Value
            };
        }

        private Telephone FromProto(WhisperFormOutput.Types.Tel output)
        {
            return new Telephone
            {
                Value = output.Value
            };
        }

        private Text FromProto(WhisperFormOutput.Types.Text output)
        {
            return new Text
            {
                Value = output.Value
            };
        }

        private Time FromProto(WhisperFormOutput.Types.Time output)
        {
            return new Time
            {
                Value = output.Value.ToDateTimeOffset()
            };
        }
    }
}