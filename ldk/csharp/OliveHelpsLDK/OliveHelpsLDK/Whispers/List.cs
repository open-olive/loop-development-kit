namespace OliveHelpsLDK.Whispers.List
{
    public abstract class ListBase
    {
        public uint Order { get; }
        public bool Extra { get; }
    }

    public enum Style
    {
        None,
        Success,
        Warn,
        Error
    }

    public enum Align
    {
        Left,
        Center,
        Right
    }

    public class ListPair : ListBase
    {
        public string Label { get; }
        public string Value { get; }
        public Style Style { get; }
        public bool Copyable { get; }
    }

    public class ListMessage : ListBase
    {
        public string Header { get; }
        public string Body { get; }
        public Style Style { get; }
        public Align Align { get; }
    }

    public class ListDivider : ListBase
    {
        public Style Style { get; }
    }
}