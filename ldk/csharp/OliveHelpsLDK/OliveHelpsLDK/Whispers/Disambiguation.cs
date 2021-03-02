namespace OliveHelpsLDK.Whispers.Disambiguation
{
    public abstract class DisambiguationBase
    {
        /// <summary>
        /// The field order. Must be at least zero. List entries are ordered by order, then by key. 
        /// </summary>
        public uint Order { get; set; }
    }

    /// <summary>
    /// Defines a clickable option in the whisper
    /// </summary>
    public class DisambiguationOption : DisambiguationBase
    {
        /// <summary>
        /// The label presented.
        /// </summary>
        public string Label { get; set; }
    }

    /// <summary>
    /// Defines non clickable text in the whisper
    /// </summary>
    public class DisambiguationText : DisambiguationBase
    {
        /// <summary>
        /// The text presented.
        /// </summary>
        public string Body { get; set; }
    }
}