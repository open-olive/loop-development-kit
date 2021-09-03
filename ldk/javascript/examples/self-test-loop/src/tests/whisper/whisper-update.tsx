/* eslint-disable no-async-promise-executor */
import { whisper } from '@oliveai/ldk';
import {
  Checkbox,
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
  logMap,
  resolveRejectButtons,
} from './utils';
import * as React from 'react';
import { ConfirmOrDeny, TestComponentProps, WhisperTestWrapper } from './react-whisper-utils';

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

const ValuePersistOnUpdate: React.FunctionComponent<TestComponentProps> = (props) => {
  const [step, updateStep] = React.useState(1);
  const onChangeHandler = (error: Error, param: string | number, whisper: Whisper) => {
    logMap(whisper.componentState);
  };
  return (
    <>
      {step === 2 && (
        <oh-text-input
          onChange={onChangeHandler}
          key="newtext"
          id="newtext"
          tooltip="Enter text"
          label="Enter Text"
        />
      )}
      <oh-text-input
        onChange={onChangeHandler}
        key="text1"
        id="text1"
        tooltip="Enter text"
        label="Enter Text"
      />
      <oh-text-input
        onChange={onChangeHandler}
        key="text2"
        id="text2"
        tooltip="Enter text"
        label="Enter Text"
      />
      {step === 2 && (
        <oh-select
          onSelect={onChangeHandler}
          key="newselect"
          id="newselect"
          options={['Option 1', 'Option 2']}
          tooltip="Select an option"
          label="Select Option"
        />
      )}
      <oh-select
        onSelect={onChangeHandler}
        key="s1"
        id="s1"
        options={['Option 1', 'Option 2']}
        tooltip="Select an option"
        label="Select Option"
      />
      <oh-select
        onSelect={onChangeHandler}
        key="s2"
        id="s2"
        options={['Option 1', 'Option 2']}
        tooltip="Select an option"
        label="Select Option"
      />
      {step === 1 && (
        <oh-button
          onClick={(error) => {
            if (error) {
              props.onReject();
            } else {
              updateStep(2);
            }
          }}
          label="Update"
        />
      )}
      {step === 2 && (
        <ConfirmOrDeny
          onResolve={props.onResolve}
          onReject={props.onReject}
          prompt="Did the values persist?"
        />
      )}
    </>
  );
};

export const testValuePersistOnUpdate = (): Promise<boolean> =>
  WhisperTestWrapper.createPromise(ValuePersistOnUpdate, 'Values should persist after update');

export const testValueOverwrittenOnUpdate = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const text1 = createTextComponent('text1');
      const select1 = createSelectComponent('select1', 'Select Option 1');
      whisper.create({
        label: 'Values should be overwritten after update',
        components: [
          text1,
          select1,
          createButtonComponent('Update', (error: Error, onClickWhisper: Whisper) => {
            if (error) {
              console.error(error);
              reject(error);
            }
            // Updating whisper with new component values
            text1.value = 'overwritten';
            select1.selected = 1;
            onClickWhisper.update({
              components: [
                createTextComponent('textNew', 'New Text Field'),
                text1,
                createSelectComponent('selectNew', 'New Select Field'),
                select1,
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

const UpdateCollapseState: React.FunctionComponent<TestComponentProps> = (props) => {
  const [step, updateStep] = React.useState(1);
  const checkboxes = (
    <>
      <oh-checkbox onChange={() => {}} label="cb1" value={false} key="c1" />
      <oh-checkbox onChange={() => {}} label="cb2" value={false} key="c2" />
    </>
  );
  let buttons: React.ReactNode = (
    <ConfirmOrDeny
      onResolve={() => {
        updateStep(2);
      }}
      onReject={props.onReject}
      prompt="Expand the Collapse Box and click Yes"
    />
  );
  if (step === 2) {
    buttons = (
      <ConfirmOrDeny
        onResolve={() => {
          updateStep(3);
        }}
        onReject={props.onReject}
        prompt="Did the CollapseBox stay expanded?"
      />
    );
  } else if (step === 3) {
    buttons = (
      <ConfirmOrDeny
        onResolve={props.onResolve}
        onReject={props.onReject}
        prompt="Did the collapse box go back to collapsed?"
      />
    );
  }
  return (
    <>
      <oh-collapse-box open={step === 2}>{checkboxes}</oh-collapse-box>
      {buttons}
    </>
  );
};

export const testUpdateCollapseState = (): Promise<boolean> =>
  WhisperTestWrapper.createPromise(UpdateCollapseState, 'Update Collapse State');

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
