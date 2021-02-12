namespace OliveHelpsLDK.Whispers.List
{
    /// <summary>
    /// Base class for all List elements.
    /// </summary>
    public abstract class ListBase
    {
        /// <summary>
        /// The field order. Must be at least zero. List entries are ordered by order, then by key. 
        /// </summary>
        public uint Order { get; set; }

        /// <summary>
        /// Whether the field is visible when the whisper is expanded or not.
        /// </summary>
        public bool Extra { get; set; }
    }

    /// <summary>
    /// The style to apply to the entry.
    /// </summary>
    public enum Style
    {
        /// <summary>
        /// Standard styling.
        /// </summary>
        None,

        /// <summary>
        /// Displays as a successful/positive item.
        /// </summary>
        Success,

        /// <summary>
        /// Displays as a warning.
        /// </summary>
        Warn,

        /// <summary>
        /// Displays as an error/failure.
        /// </summary>
        Error
    }

    /// <summary>
    /// Defines how the entry is aligned.
    /// </summary>
    public enum Align
    {
        /// <summary>
        /// Left aligned.
        /// </summary>
        Left,

        /// <summary>
        /// Center aligned.
        /// </summary>
        Center,

        /// <summary>
        /// Right aligned.
        /// </summary>
        Right
    }

    /// <summary>
    /// Defines a label/value pair.
    /// </summary>
    public class ListPair : ListBase
    {
        /// <summary>
        /// The Label presented.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// The value presented as string.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// The entry's style.
        /// </summary>
        public Style Style { get; set; }

        /// <summary>
        /// Whether the field can be one-clicked copied.
        /// </summary>
        public bool Copyable { get; set; }
    }

    /// <summary>
    /// A message entry.
    /// </summary>
    public class ListMessage : ListBase
    {
        /// <summary>
        /// The header of the message.
        /// </summary>
        public string Header { get; set; }

        /// <summary>
        /// The body of the message.
        /// </summary>
        public string Body { get; set; }

        /// <summary>
        /// The style the message is presented in.
        /// </summary>
        public Style Style { get; set; }

        /// <summary>
        /// The alignment of the message.
        /// </summary>
        public Align Align { get; set; }
    }

    /// <summary>
    /// A divider entry.
    /// </summary>
    public class ListDivider : ListBase
    {
        /// <summary>
        /// The style of the divider.
        /// </summary>
        public Style Style { get; set; }
    }

    /// <summary>
    /// A Link entry.
    /// </summary>
    public class ListLink : ListBase
    {
        /// <summary>
        /// The text alignment of the link.
        /// </summary>
        public Align Align { get; set; }

        /// <summary>
        /// The URL opened when the link is clicked on.
        /// </summary>
        public string Href { get; set; }

        /// <summary>
        /// The style to be assigned to the link.
        /// </summary>
        public Style Style { get; set; }

        /// <summary>
        /// The label displayed for the link.
        /// </summary>
        public string Text { get; set; }
    }
}