import * as whisper from '.';
import { Select, Telephone, TextInput } from '.';
import { isForm, LdkForm } from './form';

describe('Form', () => {
    it('updates component state for given components upon change', () => {
        // TODO: Test onChange is recalled
        const textInputComponentName = 'myTextInput';
        const telephoneInputComponentName  = 'myTelephoneInput';

        const selectComponentName = 'mySelect';

        const components: Array<whisper.ChildComponents> = [
            {
                label: `myLabel`,
                onChange: (error, value) => { console.log(error, value) },
                tooltip: 'myTooltip',
                value: 'myValue',
                name: textInputComponentName,
                type: whisper.WhisperComponentType.TextInput,
            },
            {
                label: 'myTelephone',
                onChange: (error, value) => { console.log(error, value) },
                name: telephoneInputComponentName,
                type: whisper.WhisperComponentType.Telephone
            },
            {
                label: 'mySelectInput',
                onSelect: jest.fn(),
                options: ['option1', 'option2'],
                name: selectComponentName,
                type: whisper.WhisperComponentType.Select
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

    it('initializes component state as undefined when no value is provided', () => {
        const textInputComponentName = 'myTextInput';

        const ldkForm = new LdkForm(
            [
                {
                    label: `myLabel`,
                    onChange: (error, value) => { console.log(error, value) },
                    tooltip: 'myTooltip',
                    name: textInputComponentName,
                    type: whisper.WhisperComponentType.TextInput,
                }
            ]
        );

        expect(ldkForm.getComponentState().get(textInputComponentName)).toBeUndefined();
    });

    it('initializes component state with provided value', () => {
        const textInputComponentName = 'myTextInput';
        const expectedTextInputInitialValue = 'myInitialValue';

        const selectComponentName = 'mySelect';
        const expectedSelectInitialValue = 1;

        const ldkForm = new LdkForm(
            [
                {
                    label: `myTextInput`,
                    onChange: (error, value) => { console.log(error, value) },
                    tooltip: 'myTooltip',
                    value: expectedTextInputInitialValue,
                    name: textInputComponentName,
                    type: whisper.WhisperComponentType.TextInput,
                },
                {
                    label: 'mySelectInput',
                    onSelect: jest.fn(),
                    options: ['option1', 'option2'],
                    selected: expectedSelectInitialValue,
                    name: selectComponentName,
                    type: whisper.WhisperComponentType.Select
                }
            ]
        );

        expect(ldkForm.getComponentState().get(textInputComponentName)).toBe(expectedTextInputInitialValue);
        expect(ldkForm.getComponentState().get(selectComponentName)).toBe(expectedSelectInitialValue);
    });

    it('replaces duplicate component names and stores last onChange value', () => {
        const duplicateComponentName = 'myDuplicateName';

        const components: Array<whisper.ChildComponents> = [
            {
                label: `myLabel`,
                onChange: (error, value) => { console.log(error, value) },
                tooltip: 'myTooltip',
                value: 'myValue',
                name: duplicateComponentName,
                type: whisper.WhisperComponentType.TextInput,
            },
            {
                label: 'myTelephone',
                onChange: (error, value) => { console.log(error, value) },
                name: duplicateComponentName,
                type: whisper.WhisperComponentType.Telephone
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