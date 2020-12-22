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
        public uint Order { get; }

        /// <summary>
        /// Whether the field is visible when the whisper is expanded or not.
        /// TODO: Confirm this is accurate.
        /// </summary>
        public bool Extra { get; }
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
        /// TODO: Find this out.
        /// </summary>
        Success,

        /// <summary>
        /// TODO: Find this out.
        /// </summary>
        Warn,

        /// <summary>
        /// TODO: Find this out.
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
        public string Label { get; }

        /// <summary>
        /// The value presented as string.
        /// </summary>
        public string Value { get; }

        /// <summary>
        /// The entry's style.
        /// </summary>
        public Style Style { get; }

        /// <summary>
        /// Whether the field can be copied or not.
        /// TODO: Confirm
        /// </summary>
        public bool Copyable { get; }
    }

    /// <summary>
    /// A message entry.
    /// </summary>
    public class ListMessage : ListBase
    {
        /// <summary>
        /// The header of the message.
        /// </summary>
        public string Header { get; }

        /// <summary>
        /// The body of the message.
        /// </summary>
        public string Body { get; }

        /// <summary>
        /// The style the message is presented in.
        /// </summary>
        public Style Style { get; }

        /// <summary>
        /// The alignment of the message.
        /// </summary>
        public Align Align { get; }
    }

    /// <summary>
    /// A divider entry.
    /// </summary>
    public class ListDivider : ListBase
    {
        /// <summary>
        /// The style of the divider.
        /// </summary>
        public Style Style { get; }
    }
}