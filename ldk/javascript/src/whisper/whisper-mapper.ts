import { whisper } from "..";
import { parseUpdateWhisper } from "./form-parser";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // We have to coerce any type here to force conversion of whisper.NewWhisper to OliveHelps.NewWhisper 
export function convert(whisperComponentType: whisper.WhisperComponentType): any {
    if (whisperComponentType === whisper.WhisperComponentType.Form) {
        throw new Error('unexpected form type');
    }
    return whisperComponentType;
}

export function convertWhisper(whisper: OliveHelps.Whisper): whisper.Whisper {
    return {
        ...whisper,
        update: (updateWhisper: whisper.UpdateWhisper) => {
            parseUpdateWhisper(updateWhisper)
        }
    };
}