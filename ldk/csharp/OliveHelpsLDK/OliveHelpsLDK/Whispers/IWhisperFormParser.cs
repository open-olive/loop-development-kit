using OliveHelpsLDK.Whispers.Disambiguation;
using OliveHelpsLDK.Whispers.Forms;
using Proto;

namespace OliveHelpsLDK.Whispers
{
    internal interface IWhisperFormParser
    {
        IWhisperFormResponse ParseResponse(WhisperFormStreamResponse response);

        IWhisperDisambiguationResponse ParseResponse(WhisperDisambiguationStreamResponse response);
    }
}