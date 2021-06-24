import { whisper } from '@oliveai/ldk';
import {
  Button,
  ChildComponents,
  Component,
  NumberInput,
  Select,
  TextInput,
  Whisper,
  WhisperComponentType,
} from '@oliveai/ldk/dist/whisper';

const confirmOrDeny = (
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: any) => void,
  prompt: string,
  rejectReason?: any,
  incomingWhisper?: whisper.Whisper,
): Array<Component> => [
  {
    type: whisper.WhisperComponentType.Message,
    body: prompt,
  },
  {
    type: whisper.WhisperComponentType.Box,
    alignment: whisper.JustifyContent.SpaceAround,
    direction: whisper.Direction.Horizontal,
    children: [
      {
        type: whisper.WhisperComponentType.Button,
        label: 'Yes',
        onClick: () => {
          incomingWhisper?.close((error) => {
            console.error(error);
          });
          resolve(true);
        },
      },
      {
        type: whisper.WhisperComponentType.Button,
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

const updateWithConfirmation = (
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: any) => void,
  updateWhisperComponents: Array<Component>,
  prompt: string,
  rejectReason?: string,
): Button => ({
  type: whisper.WhisperComponentType.Button,
  label: 'Update',
  onClick: (error: Error | undefined, incomingWhisper: Whisper) => {
    if (error) {
      incomingWhisper.close((error) => {
        console.error(error);
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
      (error) => {
        if (error) {
          console.error(error);
          incomingWhisper.close((error) => console.error(error));
          reject(error);
        }
      },
    );
  },
});

const logMap = (map: Map<string, string | boolean | number>) => {
  Array.from(map.entries()).forEach((entry) =>
    console.log('Key: ' + entry[0] + ' Value: ' + entry[1]),
  );
};

//** Tests */
export const basicWhisperUpdate = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      whisper.create({
        label: 'Basic Whisper Update',
        onClose: () => {},
        components: [
          {
            type: whisper.WhisperComponentType.TextInput,
            label: 'Text Input',
            id: 'myTextInput1',
            onChange: (error, param, whisper) => {
              console.info(logMap(whisper.componentState));
            },
            tooltip: 'myTooltip',
          },
          {
            type: whisper.WhisperComponentType.Markdown,
            body: 'Press Update.',
          },
          updateWithConfirmation(
            resolve,
            reject,
            [
              {
                type: whisper.WhisperComponentType.TextInput,
                label: 'Text Input 2',
                id: 'myTextInput1',
                onChange: (error, param, whisper) => {
                  console.info(logMap(whisper.componentState));
                },
                tooltip: 'myTooltip',
              },
            ],
            'Did the whisper update correctly? (state will persist)', // TODO: State persistence across update is an upcoming feature.
            'User selected update failed.',
          ),
        ],
      });
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  });

export const updateCollapseState = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const checkboxes: ChildComponents[] = [
        {
          type: whisper.WhisperComponentType.Checkbox,
          label: 'cb1',
          value: false,
          onChange: () => {},
        },
        {
          type: whisper.WhisperComponentType.Checkbox,
          label: 'cb2',
          value: false,
          onChange: () => {},
        },
      ];

      const collapseBox: Component = {
        type: whisper.WhisperComponentType.CollapseBox,
        children: [...checkboxes],
        label: 'first CollapseBox',
        open: false,
      };

      whisper.create({
        label: 'Update Collapse State',
        onClose: () => {},
        components: [
          collapseBox,
          {
            type: whisper.WhisperComponentType.Markdown,
            body: 'Expand the collapse box and Update.',
          },
          updateWithConfirmation(
            resolve,
            reject,
            [collapseBox],
            'Did the CollapseBox stay expanded?',
            'User selected update failed.',
          ),
        ],
      });
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  });

export const updateOnChange = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      whisper.create({
        label: 'Update onChange events',
        onClose: () => {},
        components: [
          {
            type: whisper.WhisperComponentType.TextInput,
            label: 'Enter 1',
            id: 'myTextInput1',
            onChange: (error, value, incomingWhisper) => {
              if (value === '1') {
                incomingWhisper.update(
                  {
                    label: 'Whisper Updated',
                    components: [
                      {
                        type: whisper.WhisperComponentType.TextInput,
                        label: 'Enter 2',
                        id: 'myTextInput2',
                        value: '',
                        onChange: (error, value, incomingWhisper) => {
                          if (value === '2') {
                            incomingWhisper.close((error) => {
                              console.error(error);
                            });
                            resolve(true);
                          } else {
                            incomingWhisper.close((error) => {
                              console.error(error);
                            });
                            reject(new Error('User did not enter required value.'));
                          }
                        },
                      },
                    ],
                  },
                  (error) => {
                    if (error) {
                      console.error(error);
                      incomingWhisper.close((error) => console.error(error));
                      reject(error);
                    }
                  },
                );
              } else {
                incomingWhisper.close((error) => {
                  console.error(error);
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

export const whisperStateOnChange = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const inputValue = 'testInput';
    const selectValue = 1;
    const numberValue = 5;

    const numberInput: NumberInput = {
      type: WhisperComponentType.Number,
      label: 'NumberInput',
      onChange: (error, param, incomingWhisper) => {
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
        } else {
          reject(new Error('did not get correct onChange value'));
        }
      },
    };

    const textInput: TextInput = {
      type: whisper.WhisperComponentType.TextInput,
      label: 'Text Input',
      id: 'myTextInput1',
      onChange: (error, param, incomingWhisper) => {
        if (param === inputValue) {
          incomingWhisper.update({
            label: 'first update',
            components: [selectInput],
          });
          selectInput.onSelect(undefined, selectValue, incomingWhisper);
        } else {
          reject(new Error('did not get correct onChange value'));
        }
      },
      tooltip: 'myTooltip',
    };

    try {
      const createdWhisper = await whisper.create({
        label: 'Whisper State onChange',
        onClose: () => {},
        components: [textInput],
      });
      textInput.onChange(undefined, inputValue, createdWhisper);
    } catch (error) {}
  });
