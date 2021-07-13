import { Component, Whisper, WhisperComponentType } from '@oliveai/ldk/dist/whisper/types';
import Form from './form';

const componentActionHandler = (
  form: Form,
  value: string | boolean | number,
  componentId: string,
  updateWhisper: Whisper,
) => {
  form.validateComponent(value, componentId);
  updateWhisper.update({
    components: form.getComponents(),
  });
};

export const init = (form: Form): Map<string, Component> =>
  new Map([
    [
      form.componentIds.textInputId,
      {
        type: WhisperComponentType.TextInput,
        label: `Input 'valid'`,
        id: form.componentIds.textInputId,
        key: form.componentIds.textInputId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.textInputId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.passwordInputId,
      {
        type: WhisperComponentType.Password,
        label: 'Password (9 char)',
        id: form.componentIds.passwordInputId,
        key: form.componentIds.passwordInputId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.passwordInputId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.telephoneInputId,
      {
        type: WhisperComponentType.Telephone,
        label: 'Valid Phone',
        id: form.componentIds.telephoneInputId,
        key: form.componentIds.telephoneInputId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.telephoneInputId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.numberInputId,
      {
        type: WhisperComponentType.Number,
        label: `Number '999'`,
        id: form.componentIds.numberInputId,
        key: form.componentIds.numberInputId,
        onChange: (_error: Error, param: number, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.numberInputId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.emailInputId,
      {
        type: WhisperComponentType.Email,
        label: `Valid Email`,
        id: form.componentIds.emailInputId,
        key: form.componentIds.emailInputId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.emailInputId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.radioInputId,
      {
        type: WhisperComponentType.RadioGroup,
        id: form.componentIds.radioInputId,
        key: form.componentIds.radioInputId,
        options: ['Option 1', 'Option 2'],
        onSelect: (_error: Error, param: number, onSelectWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.radioInputId, onSelectWhisper);
        },
      },
    ],
    [
      form.componentIds.checkboxInputId,
      {
        type: WhisperComponentType.Checkbox,
        id: form.componentIds.checkboxInputId,
        key: form.componentIds.checkboxInputId,
        label: 'Check required',
        onChange: (_error: Error, param: boolean, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.checkboxInputId, onChangeWhisper);
        },
        value: false,
      },
    ],
    [
      form.componentIds.dropdownInputId,
      {
        type: WhisperComponentType.Select,
        id: form.componentIds.dropdownInputId,
        key: form.componentIds.dropdownInputId,
        label: 'Selected value required',
        onSelect: (_error: Error, param: number, onSelectWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.dropdownInputId, onSelectWhisper);
        },
        options: ['Option 1', 'Option 2'],
      },
    ],
  ]);

export const getSubmitButton = (form: Form): Component => ({
  type: WhisperComponentType.Button,
  label: 'Submit',
  onClick: (_error: Error, onClickWhisper: Whisper) => {
    form.validate(onClickWhisper.componentState);
    const updateWhisperComponents: Component[] = form.isValid()
      ? [{ type: WhisperComponentType.Markdown, body: `Form submitted successfully` }]
      : form.getComponents();
    onClickWhisper.update({
      components: updateWhisperComponents,
    });
  },
});
