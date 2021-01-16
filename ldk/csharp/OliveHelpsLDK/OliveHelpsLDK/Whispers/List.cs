namespace OliveHelpsLDK.Whispers.List
{
    public abstract class ListBase
    {
        public uint Order { get; set; }
        public bool Extra { get; set; }
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
        public string Label { get; set; }
        public string Value { get; set; }
        public Style Style { get; set; }
        public bool Copyable { get; set; }
    }

    public class ListMessage : ListBase
    {
        public string Header { get; set; }
        public string Body { get; set; }
        public Style Style { get; set; }
        public Align Align { get; set; }
    }

    public class ListDivider : ListBase
    {
        public Style Style { get; set; }
    }
}