using Proto;

namespace OliveHelpsLDK.Whispers
{
    internal interface IWhisperFormBuilder
    {
        WhisperFormRequest BuildRequest(WhisperForm formRequest, Proto.Session session);
        WhisperMeta BuildMeta(WhisperConfig config);

        WhisperListRequest BuildRequest(WhisperList list, Proto.Session session);
    }
}