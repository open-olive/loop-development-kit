namespace OliveHelpsLDK.Whispers
{
    public struct WhisperStyle
    {
        public string BackgroundColor;
        public string PrimaryColor;
        public string HighlightColor;
    }
    
    public struct WhisperConfig
    {
        public string Icon;
        public string Label;
        public WhisperStyle Style;
    }

    public struct WhisperMarkdown
    {
        public string Markdown;
        public WhisperConfig Config;
    }

    public struct WhisperConfirm
    {
        public string Markdown;
        public WhisperConfig Config;
        public string ResolveLabel;
        public string RejectLabel;
    }

    public struct WhisperForm
    {
        public string Markdown;
        public WhisperConfig Config;
        public string SubmitLabel;
        public string CancelLabel;
    }
}