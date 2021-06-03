import * as whisper from '.';
import { Select, Telephone, TextInput } from '.';
import { isForm, LdkForm } from './form';

describe('Form', () => {
    it('updates component state for given components upon change', () => {
        const textInputComponentName = 'myTextInput';
        const telephoneInputComponentName  = 'myTelephoneInput';

        const selectComponentName = 'mySelect';

        const components = [
            {
                label: `myLabel`,
                onChange: jest.fn(),
                tooltip: 'myTooltip',
                value: 'myValue',
                name: textInputComponentName,
                type: 'textInput' as OliveHelps.WhisperComponentType.TextInput,
            },
            {
                label: 'myTelephone',
                onChange: jest.fn(),
                name: telephoneInputComponentName,
                type: 'telephone' as OliveHelps.WhisperComponentType.Telephone
            },
            {
                label: 'mySelectInput',
                onSelect: jest.fn(),
                options: ['option1', 'option2'],
                name: selectComponentName,
                type: 'select' as OliveHelps.WhisperComponentType.Select
            } 
        ];

        const ldkForm = new LdkForm(components);
        
        const expectedTextInputValue = 'my new value!';
        (ldkForm.children[0] as TextInput)
            .onChange(undefined, expectedTextInputValue, { id: '', close: jest.fn()});

        const expectedTelephoneInputValue = '330-614-1234';
        (ldkForm.children[1] as Telephone)
            .onChange(undefined, expectedTelephoneInputValue, { id: '', close: jest.fn()});

        const expectedSelectInputValue = 1;
        (ldkForm.children[2] as Select)
            .onSelect(undefined, expectedSelectInputValue, { id: '', close: jest.fn()});
        
        expect(ldkForm.getComponentState().get(textInputComponentName)).toBe(expectedTextInputValue);
        expect(ldkForm.getComponentState().get(telephoneInputComponentName)).toBe(expectedTelephoneInputValue);
        expect(ldkForm.getComponentState().get(selectComponentName)).toBe(expectedSelectInputValue);
    });

    it('forwards calls to provided onChange after updating component state', () => {
        const textInputComponentName = 'myTextInput';
        const textInputOnChange = jest.fn();
        const components = [
            {
                label: `myLabel`,
                onChange: textInputOnChange,
                tooltip: 'myTooltip',
                name: textInputComponentName,
                type: 'textInput' as OliveHelps.WhisperComponentType.TextInput,
            }
        ]
        const ldkForm = new LdkForm(components);

        const expectedTextInputValue = 'my new value!';
        const expectedError = undefined;
        const expectedWhisper = { id: '', close: jest.fn()};
        (ldkForm.children[0] as TextInput)
            .onChange(expectedError, expectedTextInputValue, expectedWhisper);
        
        expect(textInputOnChange).toHaveBeenCalledWith(expectedError, expectedTextInputValue, expectedWhisper);
    });

    it('initializes component state as undefined when no value is provided', () => {
        const textInputComponentName = 'myTextInput';
        const components = [
            {
                label: `myLabel`,
                onChange: jest.fn(),
                tooltip: 'myTooltip',
                name: textInputComponentName,
                type: 'textInput' as OliveHelps.WhisperComponentType.TextInput,
            }
        ]
        const ldkForm = new LdkForm(components);

        expect(ldkForm.getComponentState().get(textInputComponentName)).toBeUndefined();
    });

    it('initializes component state with provided value', () => {
        const textInputComponentName = 'myTextInput';
        const expectedTextInputInitialValue = 'myInitialValue';

        const selectComponentName = 'mySelect';
        const expectedSelectInitialValue = 1;
        
        const components = [
            {
                label: `myTextInput`,
                onChange: jest.fn(),
                tooltip: 'myTooltip',
                value: expectedTextInputInitialValue,
                name: textInputComponentName,
                type: 'textInput' as OliveHelps.WhisperComponentType.TextInput,
            },
            {
                label: 'mySelectInput',
                onSelect: jest.fn(),
                options: ['option1', 'option2'],
                selected: expectedSelectInitialValue,
                name: selectComponentName,
                type: 'select' as OliveHelps.WhisperComponentType.Select
            }
        ]
        const ldkForm = new LdkForm(components);

        expect(ldkForm.getComponentState().get(textInputComponentName)).toBe(expectedTextInputInitialValue);
        expect(ldkForm.getComponentState().get(selectComponentName)).toBe(expectedSelectInitialValue);
    });

    it('replaces duplicate component names and stores last onChange value', () => {
        const duplicateComponentName = 'myDuplicateName';

        const components = [
            {
                label: `myLabel`,
                onChange: jest.fn(),
                tooltip: 'myTooltip',
                value: 'myValue',
                name: duplicateComponentName,
                type: 'textInput' as OliveHelps.WhisperComponentType.TextInput,
            },
            {
                label: 'myTelephone',
                onChange: jest.fn(),
                name: duplicateComponentName,
                type: 'telephone' as OliveHelps.WhisperComponentType.Telephone
            }
        ];

        const ldkForm = new LdkForm(components);

        const expectedTextInputValue = 'my new value!';
        (ldkForm.children[0] as TextInput)
            .onChange(undefined, expectedTextInputValue, { id: '', close: jest.fn()});

        // Overwrite value for duplicate key
        const expectedTelephoneInputValue = '330-614-1234';
        (ldkForm.children[1] as TextInput)
            .onChange(undefined, expectedTelephoneInputValue, { id: '', close: jest.fn()});
        
        expect(ldkForm.getComponentState().size).toBe(1);
        expect(ldkForm.getComponentState().get(duplicateComponentName)).toBe(expectedTelephoneInputValue);
    });

    it('handles empty form', () => {
        const components: Array<OliveHelps.ChildComponents> = [];
        
        const ldkForm = new LdkForm(components);

        expect(ldkForm.getComponentState().size).toBe(0);
    });
});

describe('isForm', () => {
    it('determines if component is form', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const form: any = {
            children: [
                {
                    label: `myLabel`,
                    onChange: jest.fn(),
                    tooltip: 'myTooltip',
                    value: 'myValue',
                    name: 'myTextInput',
                    type: whisper.WhisperComponentType.TextInput,
                },
            ],
            onSubmit: jest.fn(),
            type: whisper.WhisperComponentType.Form
        }

        expect(isForm(form)).toBeTruthy();
    });

    it('determines if component is not a form', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const notForm: any = {
            label: `myLabel`,
            onChange: jest.fn(),
            tooltip: 'myTooltip',
            value: 'myValue',
            name: 'myTextInput',
            type: whisper.WhisperComponentType.TextInput,
        }

        expect(isForm(notForm)).toBeFalsy();
    });
});