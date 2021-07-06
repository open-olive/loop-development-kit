/* eslint-disable no-async-promise-executor */
import { whisper } from '@oliveai/ldk';
import { WhisperComponentType, Whisper, Component } from '@oliveai/ldk/dist/whisper/types';
import { resolveRejectButtons } from './utils';
import { validateForm } from './validation';
import ComponentIds from './validation/componentIds';

const updatedForm = (
  formLabel: string,
  updatedComponents: Component[],
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
) => ({
  label: formLabel,
  components: [
    ...updatedComponents,
    resolveRejectButtons(resolve, reject, 'Validation worked', 'Validation did not worked'),
  ],
});

const validateButton = (
  formLabel: string,
  components: Component[],
  componentIds: ComponentIds,
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
): Component => ({
  type: WhisperComponentType.Button,
  label: 'Validate',
  onClick: (_error: Error, onClickWhisper: Whisper) => {
    const updatedComponents = validateForm(onClickWhisper.componentState, components, componentIds);
    onClickWhisper.update(updatedForm(formLabel, updatedComponents, resolve, reject));
  },
});

export const testComponentsValidation = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const componentIds = new ComponentIds();
      console.log(componentIds.textInputId);
      const formLabel = 'Simple Form';
      const components: Component[] = [
        {
          type: WhisperComponentType.TextInput,
          label: `Input 'valid'`,
          id: componentIds.textInputId,
          key: componentIds.textInputId,
          onChange: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.Password,
          label: 'Password (9 char)',
          id: componentIds.passwordInputId,
          key: componentIds.passwordInputId,
          onChange: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.Telephone,
          label: 'Valid Phone',
          id: componentIds.telephoneInputId,
          key: componentIds.telephoneInputId,
          onChange: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.Number,
          label: `Number '999'`,
          id: componentIds.numberInputId,
          key: componentIds.numberInputId,
          onChange: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.Email,
          label: `Valid Email`,
          id: componentIds.emailInputId,
          key: componentIds.emailInputId,
          onChange: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.RadioGroup,
          id: componentIds.radioInputId,
          key: componentIds.radioInputId,
          options: ['Option 1', 'Option 2'],
          onSelect: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.Checkbox,
          id: componentIds.checkboxInputId,
          key: componentIds.checkboxInputId,
          label: 'Check required',
          onChange: () => {
            // do nothing.
          },
          value: false,
        },
        {
          type: WhisperComponentType.Select,
          id: componentIds.dropdownInputId,
          key: componentIds.dropdownInputId,
          label: 'Selected value required',
          onSelect: () => {
            // do nothing.
          },
          options: ['Option 1', 'Option 2'],
        },
      ];

      whisper.create({
        label: formLabel,
        onClose: () => {
          // do nothing.
        },
        components: [
          ...components,
          validateButton(formLabel, components, componentIds, resolve, reject),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  });
