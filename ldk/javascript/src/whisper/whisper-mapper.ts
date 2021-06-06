import { whisper } from "..";
import { parseUpdateWhisper } from "./form-parser";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // We have to coerce any type here to force conversion of whisper.NewWhisper to OliveHelps.NewWhisper 
export function convertComponentType(whisperComponentType: whisper.WhisperComponentType): any {
    if (whisperComponentType === whisper.WhisperComponentType.Form) {
        throw new Error('unexpected form type');
    }
    return whisperComponentType;
}

export function convertToExternalWhisper(incomingWhisper: OliveHelps.Whisper): whisper.Whisper {
    return {
        ...incomingWhisper,
        update: (updateWhisper: whisper.UpdateWhisper) => {
            parseUpdateWhisper(updateWhisper)
        }
    };
}

export function convertToInternalUpdateWhisper(incomingUpdateWhisper: whisper.UpdateWhisper): OliveHelps.UpdateWhisper {
    return {
        ...Object.create(incomingUpdateWhisper),
        components: parseUpdateWhisper(incomingUpdateWhisper).components
    }
}