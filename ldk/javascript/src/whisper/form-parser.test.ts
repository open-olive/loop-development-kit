import { Components, NewWhisper } from ".";
import { whisper } from "..";
import { convertExternalNewWhisperToInternal, ldkForms } from "./form-parser";

describe('form parser', () => {
    describe('parseNewWhisper', () => {
        it('adds all non-form components to outgoing collection', () => {
            const components: Array<Components> = [
                {
                    label: '',
                    onChange: jest.fn(),
                    type: whisper.WhisperComponentType.TextInput
                },
                {
                    onSelect: jest.fn(),
                    options: ['red', 'blue'],
                    type: whisper.WhisperComponentType.RadioGroup
                },
            ];

            const newWhisper: NewWhisper = {
                components,
                label: 'test whisper',
            }
            const actual = convertExternalNewWhisperToInternal(newWhisper);

            expect(actual.components.length).toBe(2);
            expect(actual.components).toEqual(components);
        });

        it('initializes form state for each given form', () => {
            const childOneId = '0';
            const childTwoId = '1';
            const expectedFormOneChild: whisper.ChildComponents = {
                id: childOneId,
                label: 'TestEmailInput',
                onChange: jest.fn(),
                type: whisper.WhisperComponentType.Email,
            };

            const expectedFormTwoChild: whisper.ChildComponents = {
                id: childTwoId,
                label: 'TestTelephoneInput',
                onChange: jest.fn(),
                type: whisper.WhisperComponentType.Telephone,
            };

            const twoFormWhisper: whisper.NewWhisper = {
                components: [
                    {
                        children: [
                            expectedFormOneChild
                        ],
                        onSubmit: jest.fn(),
                        type: whisper.WhisperComponentType.Form
                    },
                    {
                        children: [
                            expectedFormTwoChild
                        ],
                        onSubmit: jest.fn(),
                        type: whisper.WhisperComponentType.Form
                    },
                ],
                label: 'my label',
                onClose: jest.fn(),
            };

            convertExternalNewWhisperToInternal(twoFormWhisper);

            expect(ldkForms.length).toBe(2);
            
            expect(ldkForms[0].children.length).toBe(1);
            expect(ldkForms[0].children[0]).toEqual(expectedFormOneChild);
            expect(ldkForms[0].children[0].id).not.toBe(childTwoId);

            expect(ldkForms[1].children.length).toBe(1);
            expect(ldkForms[1].children[0]).toEqual(expectedFormTwoChild);
            expect(ldkForms[1].children[0].id).not.toBe(childOneId);
        });
    });
});