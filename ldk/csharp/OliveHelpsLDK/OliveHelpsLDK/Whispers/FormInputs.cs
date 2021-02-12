using System;
using Google.Protobuf.WellKnownTypes;
using Proto;

// ReSharper disable once CheckNamespace
namespace OliveHelpsLDK.Whispers.Forms.Inputs
{
    /// <summary>
    /// Common values for all the Form Inputs.
    /// </summary>
    public interface IBase
    {
        /// <summary>
        /// The Label presented for the form input.
        /// </summary>
        string Label { get; }

        /// <summary>
        /// The Tooltip presented when the user hovers over the form.
        /// </summary>
        string Tooltip { get; }

        /// <summary>
        /// The order of the field. Must be at least 0. 
        /// </summary>
        /// <remarks>
        /// Fields with the same input order will be ordered by their key.
        /// </remarks>
        int Order { get; }
    }

    /// <summary>
    /// Base class for Form Input definition objects.
    /// </summary>
    public abstract class BaseInput : IBase
    {
        /// <inheritdoc />
        public string Label { get; set; }

        /// <inheritdoc />
        public string Tooltip { get; set; }

        /// <inheritdoc />
        public int Order { get; set; }
    }

    /// <summary>
    /// A checkbox field.
    /// </summary>
    public class Checkbox : BaseInput
    {
        /// <summary>
        /// Whether checkbox is checked (<c>true</c>) or not (<c>false</c>).
        /// </summary>
        public bool Value { get; set; }

        internal WhisperFormInput.Types.Checkbox ToProto()
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

    /// <summary>
    /// An email address field.
    /// </summary>
    public class Email : BaseInput
    {
        /// <summary>
        /// Starting value.
        /// </summary>
        public string Value { get; set; }

        internal WhisperFormInput.Types.Email ToProto()
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

    /// <summary>
    /// A field with Markdown formatted content.
    /// </summary>
    public class Markdown : BaseInput
    {
        /// <summary>
        /// The field content.
        /// </summary>
        public string Value { get; set; }

        internal WhisperFormInput.Types.Markdown ToProto()
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

    /// <summary>
    /// A Numerical input field.
    /// </summary>
    public class Number : BaseInput
    {
        /// <summary>
        /// The initial value.
        /// </summary>
        public float Value { get; set; }

        /// <summary>
        /// The minimum acceptable value for the field.
        /// </summary>
        public float Min { get; set; }

        /// <summary>
        /// The maximum acceptable value for the field.
        /// </summary>
        public float Max { get; set; }

        internal WhisperFormInput.Types.Number ToProto()
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

    /// <summary>
    /// A Password input field. Unlike other fields, this field cannot be pre-populated.
    /// </summary>
    public class Password : BaseInput
    {
        internal WhisperFormInput.Types.Password ToProto()
        {
            return new WhisperFormInput.Types.Password
            {
                Label = Label,
                Order = checked((uint) Order),
                Tooltip = Tooltip
            };
        }
    }

    /// <summary>
    /// Presents a set of radio buttons. Only one button can be selected.
    /// </summary>
    public class Radio : BaseInput
    {
        internal WhisperFormInput.Types.Radio ToProto()
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

        /// <summary>
        /// An array of strings to be presented as the radio button choices.
        /// </summary>
        public string[] Options { get; set; }
    }

    /// <summary>
    /// Creates a HTML Select input. User can choose one of the options provided.
    /// </summary>
    public class Select : BaseInput
    {
        internal WhisperFormInput.Types.Select ToProto()
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

        /// <summary>
        /// The list of options the user can choose from.
        /// </summary>
        public string[] Options { get; set; }
    }

    /// <summary>
    /// Presents an input for entering telephone numbers. You can both provide the prepopulated Value,
    /// as well as providing a <see cref="Pattern"/> that the input must satisfy.
    /// </summary>
    public class Telephone : BaseInput
    {
        /// <summary>
        /// Initial value.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// The pattern of the field to be populated.
        /// Should be formatted as per <see href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel#pattern">HTML Tel Input</see> specifications.
        /// </summary>
        public string Pattern { get; set; }

        internal WhisperFormInput.Types.Tel ToProto()
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

    /// <summary>
    /// A free form text field.
    /// </summary>
    public class Text : BaseInput
    {
        /// <summary>
        /// The initial value.
        /// </summary>
        public string Value { get; set; }

        internal WhisperFormInput.Types.Text ToProto()
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

    /// <summary>
    /// A field for inputting a time and date.
    /// </summary>
    public class Time : BaseInput
    {
        /// <summary>
        /// The initial value.
        /// </summary>
        public DateTimeOffset Value { get; set; }

        internal WhisperFormInput.Types.Time ToProto()
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