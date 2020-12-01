using System;
using Google.Protobuf.WellKnownTypes;
using Proto;

// ReSharper disable once CheckNamespace
namespace OliveHelpsLDK.Whispers.Forms.Inputs
{
    public interface IProtoable<T>
    {
        T ToProto();
    }

    public interface IBase
    {
        string Label { get; }
        string Tooltip { get; }
        int Order { get; }
    }

    public interface ICheckbox : IBase, IProtoable<WhisperFormInput.Types.Checkbox>
    {
        bool Value { get; }
    }

    public interface IEmail : IBase, IProtoable<WhisperFormInput.Types.Email>
    {
        string Value { get; }
    }

    public interface IMarkdown : IBase, IProtoable<WhisperFormInput.Types.Markdown>
    {
        string Value { get; }
    }

    public interface INumber : IBase, IProtoable<WhisperFormInput.Types.Number>
    {
        float Value { get; }
        float Min { get; }
        float Max { get; }
    }

    public interface IPassword : IBase, IProtoable<WhisperFormInput.Types.Password>
    {
    }

    public interface IRadio : IBase, IProtoable<WhisperFormInput.Types.Radio>
    {
        string[] Options { get; }
    }

    public interface ISelect : IBase, IProtoable<WhisperFormInput.Types.Select>
    {
        string[] Options { get; }
    }

    public interface ITelephone : IBase, IProtoable<WhisperFormInput.Types.Tel>
    {
        string Value { get; }
        string Pattern { get; }
    }

    public interface IText : IBase, IProtoable<WhisperFormInput.Types.Text>
    {
        string Value { get; }
    }

    public interface ITime : IBase, IProtoable<WhisperFormInput.Types.Time>
    {
        DateTimeOffset Value { get; }
    }

    public struct Checkbox : ICheckbox
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }
        public bool Value { get; set; }

        public WhisperFormInput.Types.Checkbox ToProto()
        {
            return new WhisperFormInput.Types.Checkbox
            {
                Label = Label,
                Tooltip = Tooltip,
                Order = checked((uint) Order),
                Value = Value
            };
        }
    }

    public struct Email : IEmail
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public string Value { get; set; }

        public WhisperFormInput.Types.Email ToProto()
        {
            return new WhisperFormInput.Types.Email
            {
                Label = Label,
                Tooltip = Tooltip,
                Order = checked((uint) Order),
                Value = Value
            };
        }
    }

    public struct Markdown : IMarkdown
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }
        public string Value { get; set; }

        public WhisperFormInput.Types.Markdown ToProto()
        {
            return new WhisperFormInput.Types.Markdown
            {
                Label = Label,
                Tooltip = Tooltip,
                Order = checked((uint) Order),
                Value = Value
            };
        }
    }

    public struct Number : INumber
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public float Value { get; set; }

        public float Min { get; set; }

        public float Max { get; set; }

        public WhisperFormInput.Types.Number ToProto()
        {
            return new WhisperFormInput.Types.Number
            {
                Label = Label,
                Tooltip = Tooltip,
                Order = checked((uint) Order),
                Value = Value,
                Max = Max,
                Min = Min,
            };
        }
    }

    public struct Password : IPassword
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public WhisperFormInput.Types.Password ToProto()
        {
            return new WhisperFormInput.Types.Password
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip
            };
        }
    }

    public struct Radio : IRadio
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public WhisperFormInput.Types.Radio ToProto()
        {
            var radio = new WhisperFormInput.Types.Radio
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip,
            };
            foreach (var option in Options)
            {
                radio.Options.Add(option);
            }

            return radio;
        }

        public string[] Options { get; set; }
    }

    public struct Select : ISelect
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public WhisperFormInput.Types.Select ToProto()
        {
            var select = new WhisperFormInput.Types.Select
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip,
            };
            foreach (var option in Options)
            {
                select.Options.Add(option);
            }

            return select;
        }

        public string[] Options { get; set; }
    }

    public struct Telephone : ITelephone
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public string Value { get; set; }

        public string Pattern { get; set; }

        public WhisperFormInput.Types.Tel ToProto()
        {
            return new WhisperFormInput.Types.Tel
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip,
                Value = Value,
                Pattern = Pattern,
            };
        }
    }

    public struct Text : IText
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }

        public string Value { get; set; }

        public WhisperFormInput.Types.Text ToProto()
        {
            return new WhisperFormInput.Types.Text
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip,
                Value = Value,
            };
        }
    }

    public struct Time : ITime
    {
        public string Label { get; set; }
        public string Tooltip { get; set; }
        public int Order { get; set; }
        public DateTimeOffset Value { get; set; }

        public WhisperFormInput.Types.Time ToProto()
        {
            return new WhisperFormInput.Types.Time
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip,
                Value = Timestamp.FromDateTimeOffset(Value),
            };
        }
    }
}