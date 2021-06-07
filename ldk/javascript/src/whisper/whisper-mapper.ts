import { NewWhisper, UpdateWhisper } from ".";
import { whisper } from "..";
import { parseForm } from "./form-parser";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // We have to coerce any type here to force conversion of whisper.NewWhisper to OliveHelps.NewWhisper 
export function convertComponentType(whisperComponentType: whisper.WhisperComponentType): any {
    if (whisperComponentType === whisper.WhisperComponentType.Form) {
        throw new Error('unexpected form type');
    }
    return whisperComponentType;
}

export function mapToInternalWhisper(newWhisper: NewWhisper): OliveHelps.NewWhisper {
    return {
        ...newWhisper,
        components: parseForm(newWhisper.components)
    };
}

export function mapToInternalUpdateWhisper(updateWhisper: UpdateWhisper): OliveHelps.UpdateWhisper {
    return {
        ...updateWhisper,
        components: parseForm(updateWhisper.components)
    };
}

export function mapToExternalWhisper(incomingWhisper: OliveHelps.Whisper): whisper.Whisper {
    return {
        ...incomingWhisper,
        update: (updateWhisper: whisper.UpdateWhisper) => {
            mapToInternalUpdateWhisper(updateWhisper)
        }
    };
}