import { whisper } from "..";
import { mapToExternalWhisper, mapToInternalUpdateWhisper, mapToInternalWhisper } from "./whisper-mapper";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function instanceOfExternalWhisper(object: any): object is whisper.Whisper {
    return 'id' in object && 'close' in object && 'update' in object;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function instanceOfInternalNewWhisper(object: any): object is OliveHelps.NewWhisper {
    return 'label' in object && 'components' in object && 'onClose' in object;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function instanceOfInternalUpdateWhisper(object: any): object is OliveHelps.UpdateWhisper {
    return 'label' in object && 'components' in object;
}

describe('WhisperMapper', () => {
    describe('mapToInternalWhisper', () => {
        it('converts external NewWhisper type to internal NewWhisper type', () => {
            const externalWhisper: whisper.NewWhisper = {
                components: [],
                label: 'myLabel',
                onClose: jest.fn(),
            };

            const actual = mapToInternalWhisper(externalWhisper);

            expect(instanceOfInternalNewWhisper(actual)).toBeTruthy();
            expect(actual).toEqual(externalWhisper);
        });
    });

    describe('mapToInternalUpdateWhisper', () => {
        it('converts external UpdateWhisper type to internal UpdateWhisper type', () => {
            const updateWhisper: whisper.UpdateWhisper = {
                components: [],
                label: 'myLabel',
            };

            const actual = mapToInternalUpdateWhisper(updateWhisper);

            expect(instanceOfInternalUpdateWhisper(actual)).toBeTruthy();
            expect(actual).toEqual(updateWhisper);
        });
    });

    describe('mapToExternalWhisper', () => {
        it('converts internal whisper type to external whisper type', () => {
            const internalWhisper: OliveHelps.Whisper = {
                id: 'myId',
                close: jest.fn(),
                update: jest.fn()
            };

            const actual = mapToExternalWhisper(internalWhisper);

            expect(instanceOfExternalWhisper(actual)).toBeTruthy();
            expect(actual.id).toEqual(internalWhisper.id);
            expect(actual.close).toEqual(internalWhisper.close);
            expect(actual.update).not.toEqual(internalWhisper.update); // Update is a copied property
        });

        it('calls incoming whispers update function (send updates to desktop)', () => {
            const updateFunc = jest.fn();

            const internalWhisper: OliveHelps.Whisper = {
                id: 'myId',
                close: jest.fn(),
                update: updateFunc
            };

            const actualWhisper = mapToExternalWhisper(internalWhisper);

            const updateWhisper: whisper.UpdateWhisper = {
                label: 'myLabel',
                components: []
            }
            actualWhisper.update(updateWhisper);

            expect(updateFunc).toHaveBeenCalledWith(mapToInternalUpdateWhisper(updateWhisper));
        });
    });
});