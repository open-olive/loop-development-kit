using System;

// ReSharper disable once CheckNamespace
namespace OliveHelpsLDK.Whispers.Forms.Outputs
{
    public interface IBase
    {
    }

    public interface IBase<T> : IBase
    {
        T Value { get; }
    }

    public interface INone : IBase
    {
    }

    public interface ICheckbox : IBase<bool>
    {
    }

    public interface IEmail : IBase<string>
    {
    }

    public interface IMarkdown : IBase<string>
    {
    }

    public interface INumber : IBase<float>
    {
    }

    public interface IPassword : IBase<string>
    {
    }

    public interface IRadio : IBase<string>
    {
    }

    public interface ISelect : IBase<string>
    {
    }

    public interface ITelephone : IBase<string>
    {
    }

    public interface IText : IBase<string>
    {
    }

    public interface ITime : IBase<DateTimeOffset>
    {
    }

    public struct None : INone
    {
    }

    public struct Checkbox : ICheckbox
    {
        public bool Value { get; set; }
    }

    public struct Email : IEmail
    {
        public string Value { get; set; }
    }

    public struct Markdown : IMarkdown
    {
        public string Value { get; set; }
    }

    public struct Number : INumber
    {
        public float Value { get; set; }
    }

    public struct Password : IPassword
    {
        public string Value { get; set; }
    }

    public struct Radio : IRadio
    {
        public string Value { get; set; }
    }

    public struct Select : ISelect
    {
        public string Value { get; set; }
    }

    public struct Telephone : ITelephone
    {
        public string Value { get; set; }
    }

    public struct Text : IText
    {
        public string Value { get; set; }
    }

    public struct Time : ITime
    {
        public DateTimeOffset Value { get; set; }
    }
}