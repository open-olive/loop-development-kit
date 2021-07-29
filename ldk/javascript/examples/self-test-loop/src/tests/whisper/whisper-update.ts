/* eslint-disable no-async-promise-executor */
import { whisper } from '@oliveai/ldk';
import {
  Button,
  Checkbox,
  ChildComponents,
  Component,
  Direction,
  JustifyContent,
  NumberInput,
  RadioGroup,
  Select,
  StateMap,
  TextInput,
  Whisper,
  WhisperComponentType,
} from '@oliveai/ldk/dist/whisper/types';

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
          incomingWhisper?.close((error) => {
            console.error(error);
          });
          resolve(true);
        },
      },
      {
        type: WhisperComponentType.Button,
        label: 'No',
        onClick: () => {
          incomingWhisper?.close((error) => {
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
): { promise: Promise<boolean>; button: Component[] } => {
  let outerResolve;
  let outerReject;
  const promise = new Promise<boolean>((resolve, reject) => {
    outerResolve = resolve;
    outerReject = reject;
  });
  return {
    promise,
    button: confirmOrDeny(outerResolve, outerReject, prompt, rejectReason),
  };
};

const updateWithConfirmation = (
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: Error) => void,
  updateWhisperComponents: Array<Component>,
  prompt: string,
  rejectReason?: string,
): Button => ({
  type: WhisperComponentType.Button,
  label: 'Update',
  onClick: (error: Error | undefined, incomingWhisper: Whisper) => {
    if (error) {
      incomingWhisper.close((e) => {
        console.error(e);
      });
      console.error(error);
      reject(error);
    }
    incomingWhisper.update(
      {
        label: 'Update Whisper',
        components: [
          ...updateWhisperComponents,
          ...confirmOrDeny(resolve, reject, prompt, rejectReason, incomingWhisper),
        ],
      },
      (err) => {
        if (err) {
          console.error(err);
          incomingWhisper.close((e) => console.error(e));
          reject(err);
        }
      },
    );
  },
});

const logMap = (map: StateMap) => {
  Array.from(map.entries()).forEach((entry) => {
    console.log(`Key: ${entry[0]} Value: ${entry[1]}`);
  });
};

export const testWhisperUpdate = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      whisper.create({
        label: 'Basic Whisper Update',
        onClose: () => {
          // do nothing.
        },
        components: [
          {
            type: WhisperComponentType.TextInput,
            label: 'Text Input',
            id: 'myTextInput1',
            key: 'textinput1',
            onChange: (error, param, onChangeWhisper) => logMap(onChangeWhisper.componentState),
            tooltip: 'myTooltip',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Press Update.',
          },
          updateWithConfirmation(
            resolve,
            reject,
            [
              {
                type: WhisperComponentType.Markdown,
                body: 'MARKDOWN WARNING',
                key: 'warning',
              },
              {
                type: WhisperComponentType.TextInput,
                label: 'Text Input 2',
                id: 'myTextInput1',
                key: 'textinput1',
                // TODO: Figure out what state to persist, probably need to retain focus.
                onChange: (error, param, onChangeWhisper) => logMap(onChangeWhisper.componentState),
                tooltip: 'myTooltip',
              },
            ],
            'Did the whisper update correctly? (state will persist)',
            'User selected update failed.',
          ),
        ],
      });
    } catch (error) {
      console.error(error);
      console.error(error.message);
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

export const testUpdateOnChange = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      whisper.create({
        label: 'Update onChange events',
        onClose: () => {
          // do nothing.
        },
        components: [
          {
            type: WhisperComponentType.TextInput,
            label: 'Enter 1',
            id: 'myTextInput1',
            key: 'input',
            onChange: (error, value, incomingWhisper) => {
              if (value === '1') {
                incomingWhisper.update(
                  {
                    label: 'Whisper Updated',
                    components: [
                      {
                        type: WhisperComponentType.Markdown,
                        body:
                          'Enter in 2 below if the text input retained focus, anything else otherwise',
                      },
                      {
                        type: WhisperComponentType.TextInput,
                        label: 'Enter 2',
                        id: 'myTextInput2',
                        key: 'input',
                        value: '',
                        onChange: (error, value, incomingWhisper) => {
                          if (value === '12') {
                            incomingWhisper.close((e) => {
                              console.error(e);
                            });
                            resolve(true);
                          } else {
                            incomingWhisper.close((e) => {
                              console.error(e);
                            });
                            reject(new Error('User did not enter required value.'));
                          }
                        },
                      },
                    ],
                  },
                  (err) => {
                    if (err) {
                      console.error(err);
                      incomingWhisper.close((e) => console.error(e));
                      reject(err);
                    }
                  },
                );
              } else {
                incomingWhisper.close((e) => {
                  console.error(e);
                });
                reject(new Error('User did not enter required value.'));
              }
            },
            value: '',
            tooltip: 'myTooltip',
          },
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
      onChange: (error, param) => {
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
      onSelect: (error, param, incomingWhisper) => {
        if (param === selectValue) {
          incomingWhisper.update({
            label: 'second update',
            components: [],
          });
          numberInput.onChange(undefined, numberValue, incomingWhisper);
          incomingWhisper.close((e) => console.error(e));
        } else {
          reject(new Error('did not get correct onChange value'));
        }
      },
    };

    const textInput: TextInput = {
      type: WhisperComponentType.TextInput,
      label: 'Text Input',
      id: 'myTextInput1',
      onChange: (error, param, incomingWhisper) => {
        if (param === inputValue) {
          incomingWhisper.update({
            label: 'first update',
            components: [selectInput],
          });
          selectInput.onSelect(undefined, selectValue, incomingWhisper);
          incomingWhisper.close((e) => console.error(e));
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
    const selectValue = 1;

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
      onSelect: (error, param, incomingWhisper) => {
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
    );
    await testWhisper.update({
      label: 'Updated Whisper label :o',
      components: [checkbox, radioButton, selectInput, ...secondUpdate.button],
    });
    await secondUpdate.promise;
    resolve(true);
  });

export const testNonTextInputsWithValue = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const selectValue = 1;

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
      onSelect: (error, param, incomingWhisper) => {
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
  });
