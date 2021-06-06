import { whisper } from "..";
import { convertComponentType, convertToExternalWhisper } from "./whisper-mapper";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function instanceOfExternalWhisper(object: any): object is whisper.Whisper {
    return 'id' in object && 'close' in object && 'update' in object;
}

describe('WhisperMapper', () => {
    describe('convertComponentType', () => {
        it('returns reference to given whisperComponentType', () => {
            const expected = whisper.WhisperComponentType.TextInput;
            expect(convertComponentType(expected)).toBe(expected);
        });

        it('throws error for form type', () => {
            expect(() => convertComponentType(whisper.WhisperComponentType.Form))
                .toThrowError('unexpected form type');
        });
    });

    describe('convertWhisper', () => {
        it('converts internal whisper type to external whisper type', () => {
            const internalWhisper: OliveHelps.Whisper = {
                id: 'myId',
                close: jest.fn(),
                update: jest.fn()
            }

            const actual = convertToExternalWhisper(internalWhisper);

            expect(instanceOfExternalWhisper(actual)).toBeTruthy();
            expect(actual.id).toEqual(internalWhisper.id);
            expect(actual.close).toEqual(internalWhisper.close);
            expect(actual.update).not.toEqual(internalWhisper.update); // Update is a copied property
        });
    });
});