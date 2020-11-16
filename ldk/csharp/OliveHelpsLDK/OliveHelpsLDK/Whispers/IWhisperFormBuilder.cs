namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperFormBuilder
    {
        Proto.WhisperFormRequest BuildRequest(WhisperForm formRequest, Proto.Session session);
        Proto.WhisperMeta BuildMeta(WhisperConfig config);
    }
}