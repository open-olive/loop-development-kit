import { NewWhisper, UpdateWhisper } from ".";
import { whisper } from "..";
import { parseForm } from "./form-parser";

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
            incomingWhisper.update(mapToInternalUpdateWhisper(updateWhisper));
        }
    };
}