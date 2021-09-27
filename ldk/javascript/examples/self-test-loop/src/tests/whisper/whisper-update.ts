/* eslint-disable no-async-promise-executor */
import { whisper } from '@oliveai/ldk';
import {
  Checkbox,
  ChildComponents,
  Component,
  Direction,
  Icon,
  IconSize,
  JustifyContent,
  NumberInput,
  RadioGroup,
  Select,
  TextInput,
  Whisper,
  WhisperComponentType,
} from '@oliveai/ldk/dist/whisper/types';
import {
  createButtonComponent,
  createSelectComponent,
  createTextComponent,
  createAutocompleteComponent,
  resolveRejectButtons,
  createRadioComponent,
  createMarkdownComponent,
} from './utils';

const confirmOrDeny = (
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: Error) => void,
  prompt: string,
  rejectReason?: string,
  incomingWhisper?: whisper.Whisper,
): Array<Component> => [
  {
    type: whisper.WhisperComponentType.Message,
    body: prompt,
  },
  {
    type: WhisperComponentType.Box,
    alignment: JustifyContent.SpaceBetween,
    direction: Direction.Horizontal,
    children: [
      {
        type: WhisperComponentType.Button,
        label: 'Yes',
        onClick: () => {
          incomingWhisper?.close((error: Error) => {
            console.error(error);
          });
          resolve(true);
        },
      },
      {
        type: WhisperComponentType.Button,
        label: 'No',
        onClick: () => {
          incomingWhisper?.close((error: Error) => {
            console.error(error);
          });
          if (rejectReason) reject(new Error(rejectReason));
          reject();
        },
      },
    ],
  },
];

const createConfirmOrDenyWithPromise = (
  prompt: string,
  rejectReason?: string,
  incomingWhisper?: Whisper,
): { promise: Promise<boolean>; button: Component[] } => {
  let outerResolve;
  let outerReject;
  const promise = new Promise<boolean>((resolve, reject) => {
    outerResolve = resolve;
    outerReject = reject;
  });
  return {
    promise,
    button: confirmOrDeny(outerResolve, outerReject, prompt, rejectReason, incomingWhisper),
  };
};

export const testValuePersistOnUpdate = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const text1 = createTextComponent('text1');
      const autocomplete1 = createAutocompleteComponent(
        'autocomplete1',
        'Select an autocomplete option',
      );
      const select1 = createSelectComponent('select1');
      const radio1 = createRadioComponent('radio1');
      whisper.create({
        label: 'Values should persist after update with added empty duplicates',
        components: [
          text1,
          select1,
          autocomplete1,
          radio1,
          createButtonComponent('Update', (error: Error, onClickWhisper: Whisper) => {
            if (error) {
              console.error(error);
              reject(error);
            }
            // Updating whisper with appended new components
            text1.tooltip = undefined;
            onClickWhisper.update({
              components: [
                createTextComponent('textNew', 'New Text Field'),
                text1,
                createSelectComponent('selectNew', 'New Select Field'),
                select1,
                createAutocompleteComponent('autocompleteNew', 'New autocomplete component'),
                autocomplete1,
                createMarkdownComponent('New radio component:'),
                createRadioComponent('radioNew'),
                radio1,
                resolveRejectButtons(resolve, reject, 'Values persisted', 'Values did not persist'),
              ],
            });
          }),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testValueOverwrittenOnUpdate = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const text1 = createTextComponent('text1');
      const textToEmpty = createTextComponent('textToEmpty');
      const select1 = createSelectComponent('select1', 'Select Option 1');
      const selectToEmpty = createSelectComponent('select2', 'Select Option 1');
      const radio1 = createRadioComponent('radio1');
      const radioToEmpty = createRadioComponent('radio2');
      const autocomplete1 = createAutocompleteComponent(
        'autocomplete1',
        'Select an Autocomplete Option 1',
      );
      const autocompleteToEmpty = createAutocompleteComponent(
        'autocomplete2',
        'Select an Autocomplete Option 1',
      );
      whisper.create({
        label: 'Values should be overwritten after update',
        components: [
          text1,
          textToEmpty,
          select1,
          selectToEmpty,
          createMarkdownComponent('Choose Option 1'),
          radio1,
          createMarkdownComponent('Choose Option 1'),
          radioToEmpty,
          autocomplete1,
          autocompleteToEmpty,
          createButtonComponent('Update', (error: Error, onClickWhisper: Whisper) => {
            if (error) {
              console.error(error);
              reject(error);
            }
            // Updating whisper with new component values
            text1.value = 'overwritten';
            textToEmpty.value = '';
            textToEmpty.label = 'Should be empty';
            select1.selected = 1;
            select1.label = 'Option 2 should be selected';
            selectToEmpty.selected = -1;
            selectToEmpty.label = 'Should be unselected';
            radio1.selected = 1;
            radioToEmpty.selected = -1;
            autocomplete1.value = '2';
            autocomplete1.label = 'Option 2 should be selected';
            autocompleteToEmpty.value = '';
            autocompleteToEmpty.label = 'Should be unselected';
            onClickWhisper.update({
              components: [
                createTextComponent('textNew', 'New Text Field'),
                text1,
                textToEmpty,
                createSelectComponent('selectNew', 'New Select Field'),
                select1,
                selectToEmpty,
                createMarkdownComponent('Option 2 should be selected'),
                radio1,
                createMarkdownComponent('Should be unselected'),
                radioToEmpty,
                autocomplete1,
                autocompleteToEmpty,
                resolveRejectButtons(resolve, reject, 'Values overwritten', 'Values persisted'),
              ],
            });
          }),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testUpdateCollapseState = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const checkboxes: ChildComponents[] = [
        {
          type: WhisperComponentType.Checkbox,
          label: 'cb1',
          value: false,
          key: 'c1',
          onChange: () => {
            // do nothing.
          },
        },
        {
          type: WhisperComponentType.Checkbox,
          label: 'cb2',
          value: false,
          key: 'c2',
          onChange: () => {
            // do nothing.
          },
        },
      ];

      const collapseBox: Component = {
        type: WhisperComponentType.CollapseBox,
        children: [...checkboxes],
        label: 'first CollapseBox',
        open: false,
        key: 'collapse',
      };

      const firstConfirm = createConfirmOrDenyWithPromise(
        'Expand the Collapse Box and click Yes',
        'User clicked no',
      );
      const testWhisper = await whisper.create({
        label: 'Update Collapse State',
        onClose: () => {
          // do nothing.
        },
        components: [collapseBox, ...firstConfirm.button],
      });
      await firstConfirm.promise;
      const secondUpdate = createConfirmOrDenyWithPromise(
        'Did the CollapseBox stay expanded?',
        'User selected update failed.',
      );
      await testWhisper.update({
        label: 'Update Collapse State',
        components: [{ ...collapseBox, open: true }, ...secondUpdate.button],
      });
      await secondUpdate.promise;
      testWhisper.update({
        label: 'Update Collapse State',
        components: [
          collapseBox,
          ...confirmOrDeny(
            resolve,
            reject,
            'Did the collapse box go back to collapsed?',
            'Collapse box did not obey state change',
            testWhisper,
          ),
        ],
      });
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  });

export const testWhisperStateOnChange = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const inputValue = 'testInput';
    const selectValue = 1;
    const numberValue = 5;

    const numberInput: NumberInput = {
      type: WhisperComponentType.Number,
      label: 'NumberInput',
      onChange: (_error: Error, param: number) => {
        if (param === numberValue) {
          resolve(true);
        } else {
          reject(new Error('did not get correct onChange value'));
        }
      },
    };

    const selectInput: Select = {
      type: WhisperComponentType.Select,
      label: 'Select',
      options: ['red', 'blue'],
      onSelect: (error: Error, param: number, incomingWhisper: Whisper) => {
        if (param === selectValue) {
          incomingWhisper.update({
            label: 'second update',
            components: [],
          });
          numberInput.onChange(undefined, numberValue, incomingWhisper);
          incomingWhisper.close((e: Error) => console.error(e));
        } else {
          reject(new Error('did not get correct onChange value'));
        }
      },
    };

    const textInput: TextInput = {
      type: WhisperComponentType.TextInput,
      label: 'Text Input',
      id: 'myTextInput1',
      onChange: (error: Error, param: string, incomingWhisper: Whisper) => {
        if (param === inputValue) {
          incomingWhisper.update({
            label: 'first update',
            components: [selectInput],
          });
          selectInput.onSelect(undefined, selectValue, incomingWhisper);
          incomingWhisper.close((e: Error) => console.error(e));
        } else {
          reject(new Error('did not get correct onChange value'));
        }
      },
      tooltip: 'myTooltip',
    };

    try {
      const createdWhisper = await whisper.create({
        label: 'Whisper State onChange',
        onClose: () => {
          // do nothing.
        },
        components: [textInput],
      });
      textInput.onChange(undefined, inputValue, createdWhisper);
    } catch (error) {
      // do nothing.
    }
  });

export const testNonTextInputs = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const checkbox: Checkbox = {
        label: 'Check this box',
        key: 'Checkbox',
        onChange: () => {
          // do nothing.
        },
        id: 'myCheckbox',
        type: WhisperComponentType.Checkbox,
      };

      const radioButton: RadioGroup = {
        type: WhisperComponentType.RadioGroup,
        id: 'radioInputId',
        key: 'radioInputId',
        options: ['Select this option', 'Select other option'],
        onSelect: () => {
          // do nothing.
        },
      };

      const selectInput: Select = {
        type: WhisperComponentType.Select,
        label: 'Select blue',
        key: 'Select',
        options: ['red', 'blue'],
        onSelect: () => {
          // do nothing
        },
      };

      const firstConfirm = createConfirmOrDenyWithPromise(
        'Interact with each component and click yes',
        'User clicked no',
      );
      const testWhisper = await whisper.create({
        label: 'Test Non Text Inputs State Update',
        onClose: () => {
          // do nothing.
        },
        components: [checkbox, radioButton, selectInput, ...firstConfirm.button],
      });
      await firstConfirm.promise;
      const secondUpdate = createConfirmOrDenyWithPromise(
        'Did the components maintain their value?',
        'User selected update failed.',
        testWhisper,
      );
      await testWhisper.update({
        label: 'Updated Whisper label :o',
        components: [checkbox, radioButton, selectInput, ...secondUpdate.button],
      });
      await secondUpdate.promise;
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });

export const testNonTextInputsWithValue = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const checkbox: Checkbox = {
        label: 'Check this box',
        key: 'Checkbox',
        onChange: () => {
          // do nothing.
        },
        id: 'myCheckbox',
        type: WhisperComponentType.Checkbox,
      };

      const radioButton: RadioGroup = {
        type: WhisperComponentType.RadioGroup,
        id: 'radioInputId',
        key: 'radioInputId',
        options: ['Select this option', 'Select other option'],
        onSelect: () => {
          // do nothing.
        },
      };

      const selectInput: Select = {
        type: WhisperComponentType.Select,
        label: 'Select blue',
        key: 'Select',
        options: ['red', 'blue'],
        onSelect: () => {
          // do nothing
        },
      };

      const firstConfirm = createConfirmOrDenyWithPromise(
        'Interact with each component and click yes',
        'User clicked no',
      );
      const testWhisper = await whisper.create({
        label: 'Test Non Text Inputs State Update',
        onClose: () => {
          // do nothing.
        },
        components: [checkbox, radioButton, selectInput, ...firstConfirm.button],
      });
      await firstConfirm.promise;
      const secondUpdate = createConfirmOrDenyWithPromise(
        'Did the components change their value?',
        'User selected update failed.',
        testWhisper,
      );
      checkbox.value = false;
      radioButton.selected = 1;
      selectInput.selected = 0;

      await testWhisper.update({
        label: 'Updated Whisper label :o',
        components: [checkbox, radioButton, selectInput, ...secondUpdate.button],
      });
      await secondUpdate.promise;
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });

export const testIconUpdates = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    let whisperUpdated = false;

    const checkbox: Checkbox = {
      label: 'Check this box and click update...',
      key: 'Checkbox',
      id: 'myCheckbox',
      onChange: () => {
        // do nothing.
      },
      type: WhisperComponentType.Checkbox,
    };

    const phoneIcon: Icon = {
      type: WhisperComponentType.Icon,
      name: 'touch_app',
      key: 'myPhoneKey',
      size: IconSize.XLarge,
      onClick: (_error: Error, onClickWhisper: Whisper) => {
        if (onClickWhisper.componentState.get(checkbox.id) && whisperUpdated) {
          resolve(true);
          onClickWhisper.close((error) => {
            console.error(error);
          });
        }
        reject('Icon update caused checkbox state failure.');
        onClickWhisper.close((error) => {
          console.error(error);
        });
      },
      tooltip: 'Touch App',
    };

    await whisper.create({
      label: 'Icon Whisper Layout Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        phoneIcon,
        checkbox,
        {
          type: WhisperComponentType.Button,
          label: 'Update',
          onClick: (_error: Error, onClickWhisper: Whisper) => {
            whisperUpdated = true;
            onClickWhisper.update({
              components: [
                checkbox,
                phoneIcon,
                {
                  type: WhisperComponentType.Message,
                  body: 'Click the touch icon',
                },
              ],
            });
          },
        },
      ],
    });
  });
