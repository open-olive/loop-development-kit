import * as whisper from '.';
import { isForm } from './form';

describe('Form', () => {
    it('determines if component is form', () => {
        const form: any = {
            children: [
                {
                    label: `myLabel`,
                    onChange: (error: any, value: any) => { },
                    tooltip: 'myTooltip',
                    value: 'myValue',
                    name: 'myTextInput',
                    type: whisper.WhisperComponentType.TextInput,
                },
            ],
            onSubmit: (values: Map<string, any>) => { },
            type: whisper.WhisperComponentType.Form
        }

        expect(isForm(form)).toBeTruthy();
    });

    it('determines if component is not a form', () => {
        const notForm: any = {
            label: `myLabel`,
            onChange: (error: any, value: any) => { },
            tooltip: 'myTooltip',
            value: 'myValue',
            name: 'myTextInput',
            type: whisper.WhisperComponentType.TextInput,
        }

        expect(isForm(notForm)).toBeFalsy();
    });
});