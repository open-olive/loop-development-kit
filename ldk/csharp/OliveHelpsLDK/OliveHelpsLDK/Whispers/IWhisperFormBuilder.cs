using Proto;

namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperFormBuilder
    {
        WhisperFormRequest BuildRequest(WhisperForm formRequest, Proto.Session session);
        WhisperMeta BuildMeta(WhisperConfig config);
    }
}