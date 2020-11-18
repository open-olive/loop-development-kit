using OliveHelpsLDK.Whispers.Forms;

namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperFormParser
    {
        IWhisperFormResponse ParseResponse(Proto.WhisperFormStreamResponse response);
    }
}