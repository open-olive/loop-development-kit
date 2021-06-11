import { whisper } from '@oliveai/ldk';
import {
  Button,
  Checkbox,
  ChildComponents,
  Components,
  Markdown,
  TextInput,
  UpdateWhisper,
  Whisper,
} from '@oliveai/ldk/dist/whisper';

//** Reusable Components */
const markdownComponent: Markdown = {
  type: whisper.WhisperComponentType.Markdown,
  body: '**Test Markdown**',
};

const checkboxComponent: Checkbox = {
  type: whisper.WhisperComponentType.Checkbox,
  label: 'Checkbox',
  value: false,
  onChange: (error, value, whisper) => {
    console.info(`Checkbox OnChange: ${value}`);
  },
};

const configurableTextInput = (
  incomingOnChange: (error: Error | undefined, param: any, whisper: Whisper) => void,
  label?: string,
  value?: string,
  tooltip?: string,
): TextInput => ({
  type: whisper.WhisperComponentType.TextInput,
  label: label,
  value: value,
  tooltip: tooltip,
  onChange: incomingOnChange,
});

const confirmOrDeny = (
  resolve: (value: boolean | PromiseLike<boolean>) => void,
  reject: (reason?: any) => void,
  prompt: string,
  rejectReason?: any,
  incomingWhisper?: whisper.Whisper,
): Array<Components> => [
  {
    type: whisper.WhisperComponentType.Message,
    body: prompt,
  },
  {
    type: whisper.WhisperComponentType.Box,
    alignment: whisper.Alignment.SpaceAround,
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
  updateWhisperComponents: Array<Components>,
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
          ...confirmOrDeny(
            resolve,
            reject,
            'Did the TextInput update properly?',
            'TextInput failed to update',
            incomingWhisper,
          ),
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

//** Tests */
export const basicWhisperUpdate = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      whisper.create({
        label: 'First Whisper',
        onClose: () => {},
        components: [
          configurableTextInput(() => {}, 'Text Input', '', 'myTooltip'),
          markdownComponent,
          checkboxComponent,
          updateWithConfirmation(resolve, reject, [
            configurableTextInput(() => {}, 'Text Input', '', 'myTooltip'),
            markdownComponent,
            checkboxComponent,
            configurableTextInput(() => {}, 'Text Input Two', ''),
          ]),
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

      const collapseBox: Components = {
        type: whisper.WhisperComponentType.CollapseBox,
        children: [...checkboxes],
        label: 'first CollapseBox',
        open: false,
      };

      whisper.create({
        label: 'First Whisper',
        onClose: () => {},
        components: [
          collapseBox,
          {
            type: whisper.WhisperComponentType.Markdown,
            body: 'Expand the collapse box and Update.',
          },
          updateWithConfirmation(resolve, reject, [collapseBox]),
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
          configurableTextInput((error, value, incomingWhisper) => {
            if (value === '1') {
              incomingWhisper.update(
                {
                  label: 'Whisper Updated',
                  components: [
                    configurableTextInput(
                      (error, value, incomingWhisper) => {
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
                      'Enter 2',
                      '',
                    ),
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
          }, 'Enter 1'),
        ],
      });
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  });
