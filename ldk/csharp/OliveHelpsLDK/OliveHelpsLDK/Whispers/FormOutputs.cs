using System;

// ReSharper disable once CheckNamespace
namespace OliveHelpsLDK.Whispers.Forms.Outputs
{
    /// <summary>
    /// All Form Outputs inherit from this class.
    /// </summary>
    public interface IBase
    {
    }

    /// <summary>
    /// The genericized version of <see cref="IBase"/>. All Form Outputs inherit from this class.
    /// </summary>
    /// <typeparam name="T">The type of the value returned.</typeparam>
    public interface IBase<T> : IBase
    {
        /// <summary>
        /// The Value of the field.
        /// </summary>
        T Value { get; }
    }

    /// <summary>
    /// A type returned if the form field cannot be associated to a input type.
    /// </summary>
    /// <remarks>If you encounter this in the wild, please let us know.</remarks>
    public interface INone : IBase
    {
    }

    /// <summary>
    /// The output of a Checkbox field.
    /// </summary>
    public interface ICheckbox : IBase<bool>
    {
    }

    /// <summary>
    /// The output of an Email field.
    /// </summary>
    public interface IEmail : IBase<string>
    {
    }

    /// <summary>
    /// The output of a Markdown field.
    /// </summary>
    public interface IMarkdown : IBase<string>
    {
    }

    /// <summary>
    /// The output of a Number field.
    /// </summary>
    public interface INumber : IBase<float>
    {
    }

    /// <summary>
    /// The output of a Password field.
    /// </summary>
    public interface IPassword : IBase<string>
    {
    }

    /// <summary>
    /// The output of a Radio field.
    /// </summary>
    public interface IRadio : IBase<string>
    {
    }

    /// <summary>
    /// The output of a Select field.
    /// </summary>
    public interface ISelect : IBase<string>
    {
    }

    /// <summary>
    /// Output of a Telephone field.
    /// </summary>
    public interface ITelephone : IBase<string>
    {
    }

    /// <summary>
    /// Output of a Text field.
    /// </summary>
    public interface IText : IBase<string>
    {
    }

    /// <summary>
    /// Output of a Time field.
    /// </summary>
    public interface ITime : IBase<DateTimeOffset>
    {
    }

    /// <summary>
    /// An unrecognized field type placeholder. Has no value.
    /// </summary>
    public struct None : INone
    {
    }

    /// <summary>
    /// The output of a checkbox field.
    /// </summary>
    public struct Checkbox : ICheckbox
    {
        /// <summary>
        /// <c>true</c> if checked, <c>false</c> if not.
        /// </summary>
        public bool Value { get; set; }
    }

    /// <summary>
    /// The output of an Email field.
    /// </summary>
    public struct Email : IEmail
    {
        /// <summary>
        /// The field contents.
        /// </summary>
        public string Value { get; set; }
    }

    /// <summary>
    /// Output of a Markdown field.
    /// </summary>
    public struct Markdown : IMarkdown
    {
        /// <summary>
        /// The field contents.
        /// </summary>
        public string Value { get; set; }
    }

    /// <summary>
    /// Output of a number field.
    /// </summary>
    public struct Number : INumber
    {
        /// <summary>
        /// The field contents.
        /// </summary>
        public float Value { get; set; }
    }

    /// <inheritdoc />
    public struct Password : IPassword
    {
        /// <inheritdoc />
        public string Value { get; set; }
    }

    /// <inheritdoc />
    public struct Radio : IRadio
    {
        /// <inheritdoc />
        public string Value { get; set; }
    }

    /// <inheritdoc />
    public struct Select : ISelect
    {
        /// <inheritdoc />
        public string Value { get; set; }
    }

    /// <inheritdoc />
    public struct Telephone : ITelephone
    {
        /// <inheritdoc />
        public string Value { get; set; }
    }

    /// <inheritdoc />
    public struct Text : IText
    {
        /// <inheritdoc />
        public string Value { get; set; }
    }

    /// <inheritdoc />
    public struct Time : ITime
    {
        /// <inheritdoc />
        public DateTimeOffset Value { get; set; }
    }
}