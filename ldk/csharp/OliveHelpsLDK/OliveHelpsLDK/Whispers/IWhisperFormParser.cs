using OliveHelpsLDK.Whispers.Forms;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    public interface IWhisperFormParser
    {
        IWhisperFormResponse ParseResponse(WhisperFormStreamResponse response);
    }
}