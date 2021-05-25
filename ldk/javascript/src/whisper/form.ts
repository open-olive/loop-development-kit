import { Checkbox, Components, Email, Form, NumberInput, Password, RadioGroup, Select, Telephone, TextInput, Whisper, WhisperComponentType } from '.';

let componentState = new Map<string, any>(); // TODO: This will bleed over into each LdkForm generated...

export class LdkForm {
    children: Array<Components>;
    onSubmit: (values: Map<string, any>) => void;

    constructor(children: Array<Components>, onSubmit: (values: Map<string, any>) => void) {
        this.children = children;
        this.onSubmit = onSubmit;
        this.onSubmitHandler(this.onSubmit);

        componentState = new Map<string, any>();

        this.registerListeners(children);
    }

    private onSubmitHandler(onSubmit: (values: Map<string, any>) => void) {
        onSubmit(componentState);
    }

    private registerListeners(children: Array<Components>) {
        children.forEach(child => {
            //TODO: How to elegantly handle every kind of type?
            // TextInput
            if ((child as TextInput).type === WhisperComponentType.TextInput) {
                componentState = componentState.set((child as TextInput)['name']! ||
                    'tempName', (child as TextInput)['value'] || 'initialTextInputValue');

                // Logging
                console.info(`child: ${JSON.stringify(child)}`);
                console.info(`created new LdkForm. Setting up component state: ${componentState}`);
                componentState.forEach((value: string, key: string) => {
                    console.log(key, value);
                });

                const incomingOnChange = (child as TextInput).onChange;
                (child as TextInput).onChange = function (error: Error | undefined, param: string, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as TextInput).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnChange(error, param, whisper);
                }
            }

            // Checkbox
            if ((child as Checkbox).type === WhisperComponentType.Checkbox) {
                componentState = componentState.set((child as Checkbox)['name']! ||
                    'tempName', (child as Checkbox)['value'] || 'initialCheckboxValue');

                const incomingOnChange = (child as Checkbox).onChange;
                (child as Checkbox).onChange = function (error: Error | undefined, param: boolean, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as Checkbox).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnChange(error, param, whisper);
                }
            }

            // Email
            if ((child as Email).type === WhisperComponentType.Email) {
                componentState = componentState.set((child as Email)['name']! ||
                    'tempName', (child as Email)['value'] || 'initialEmailValue');

                const incomingOnChange = (child as Email).onChange;
                (child as Email).onChange = function (error: Error | undefined, param: string, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as Email).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnChange(error, param, whisper);
                }
            }

            // NumberInput
            if ((child as NumberInput).type === WhisperComponentType.Number) {
                componentState = componentState.set((child as NumberInput)['name']! ||
                    'tempName', (child as NumberInput)['value'] || 'initialNumberInputValue');

                const incomingOnChange = (child as NumberInput).onChange;
                (child as NumberInput).onChange = function (error: Error | undefined, param: number, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as NumberInput).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnChange(error, param, whisper);
                }
            }

            // Password
            if ((child as Password).type === WhisperComponentType.Password) {
                componentState = componentState.set((child as Password)['name']! ||
                    'tempName', (child as Password)['value'] || 'initialPasswordValue');

                const incomingOnChange = (child as Password).onChange;
                (child as Password).onChange = function (error: Error | undefined, param: string, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as Password).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnChange(error, param, whisper);
                }
            }

            // RadioGroup
            if ((child as RadioGroup).type === WhisperComponentType.RadioGroup) {
                componentState = componentState.set((child as RadioGroup)['name']! ||
                    'tempName', (child as RadioGroup)['selected'] || 'initialRadioGroupValue');

                const incomingOnSelect = (child as RadioGroup).onSelect;
                (child as RadioGroup).onSelect = function (error: Error | undefined, param: number, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as RadioGroup).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnSelect(error, param, whisper);
                }
            }

            // Select
            if ((child as Select).type === WhisperComponentType.Select) {
                componentState = componentState.set((child as Select)['name']! ||
                    'tempName', (child as Select)['selected'] || 'initialSelectedValue');

                const incomingOnSelect = (child as Select).onSelect;
                (child as Select).onSelect = function (error: Error | undefined, param: number, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as Select).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnSelect(error, param, whisper);
                }
            }

            // Telephone
            if ((child as Telephone).type === WhisperComponentType.Telephone) {
                componentState = componentState.set((child as Telephone)['name']! ||
                    'tempName', (child as Telephone)['value'] || 'initialTelephoneValue');

                const incomingOnChange = (child as Telephone).onChange;
                (child as Telephone).onChange = function (error: Error | undefined, param: string, whisper: Whisper) {
                    console.info(`update with new state: ${param}`);
                    componentState = componentState.set((child as Telephone).name!, param);
                    componentState.forEach((value: any, key: string) => {
                        console.info(`global state updated: ${key + ': ' + value}`)
                    });
                    incomingOnChange(error, param, whisper);
                }
            }
        });
    }
}

export function isForm(component: Components): component is Form {
    return (component as Form).onSubmit !== undefined &&
        (component as Form).children !== undefined;
        (component as Form).type === WhisperComponentType.Form  // TODO: Simplify
}