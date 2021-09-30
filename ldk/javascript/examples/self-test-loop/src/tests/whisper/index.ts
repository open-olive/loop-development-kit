/* eslint-disable no-async-promise-executor */
import { clipboard, network, whisper } from '@oliveai/ldk';
import {
  ButtonSize,
  ButtonStyle,
  Component,
  CustomHeight,
  DateTimeType,
  Direction,
  JustifyContent,
  NewWhisper,
  TextAlign,
  Urgency,
  Whisper,
  WhisperComponentType,
  MessageWhisperCopyMode,
  MarkdownWhisperCopyMode,
  IconSize,
  Color,
  AlignItems,
  RichTextEditor,
} from '@oliveai/ldk/dist/whisper/types';
import { stripIndent } from 'common-tags';
import {
  createAutocompleteComponent,
  autocompleteOptions,
  logMap,
  resolveRejectButtons,
} from './utils';
import { shortText, longText, markdownText } from './text';

export const testIconLayout = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Icon Whisper Layout Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Box,
          direction: Direction.Horizontal,
          justifyContent: JustifyContent.SpaceEvenly,
          children: [
            {
              type: WhisperComponentType.Icon,
              name: 'call',
              size: IconSize.XLarge,
              onClick: () => {
                console.info('Call Clicked');
              },
              tooltip: 'Phone a friend',
            },
            {
              type: WhisperComponentType.Markdown,
              body: `**Primary**  
              415-514-5410`,
            },
            {
              type: WhisperComponentType.Markdown,
              body: `**Secondary**  
              415-514-5420`,
            },
            {
              type: WhisperComponentType.Markdown,
              body: `**Secondary**  
              415-514-5200`,
            },
          ],
        },
        {
          type: WhisperComponentType.Box,
          direction: Direction.Horizontal,
          justifyContent: JustifyContent.SpaceEvenly,
          children: [
            {
              type: WhisperComponentType.Icon,
              name: 'article',
              size: IconSize.Small,
              color: Color.Black,
              onClick: () => {
                console.info('Article Clicked');
              },
              tooltip: 'Article Tooltip',
            },
            {
              type: WhisperComponentType.Icon,
              name: 'emoji_emotions',
              size: IconSize.Medium,
              color: Color.Grey,
              onClick: () => {
                console.info('Emoji Emotions Clicked');
              },
            },
            {
              type: WhisperComponentType.Icon,
              name: 'fingerprint',
              size: IconSize.Large,
              color: Color.Black,
              onClick: () => {
                console.info('Fingerprint Clicked');
              },
            },
            {
              type: WhisperComponentType.Icon,
              name: 'pets',
              size: IconSize.XLarge,
              color: Color.WhisperStrip,
              onClick: () => {
                console.info('Pets Clicked');
              },
            },
          ],
        },
        resolveRejectButtons(resolve, reject),
      ],
    });
  });

export const testMarkdownWhisper = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const options = ['M12.01', 'M00.123'];

    await whisper.create({
      label: 'Markdown whisper Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: markdownText,
          type: WhisperComponentType.Markdown,
        },
        {
          label: `${options[0]}  
            line one
            line two 100.0%`,
          value: false,
          onChange: () => {
            console.debug(`selected value: ${options[0]}`);
          },
          type: WhisperComponentType.Checkbox,
        },
        {
          label: `${options[1]}  
            this is a longer line one, it was known for being long 
            99.2 %`,
          value: false,
          onChange: () => {
            console.debug(`selected value: ${options[1]}`);
          },
          type: WhisperComponentType.Checkbox,
        },
        {
          label: `Single Line Example that is extremely 
            long extremely long extremely long extremely 
            long extremely long extremely long extremely long extremely 
            long extremely long extremely long extremely long extremely 
            long extremely long extremely long`,
          value: false,
          onChange: () => {
            // do nothing.
          },
          type: WhisperComponentType.Checkbox,
        },
        {
          label: `normal label with no surprises`,
          value: false,
          onChange: () => {
            // do nothing.
          },
          type: WhisperComponentType.Checkbox,
        },
        {
          onSelect: (selected) => {
            console.log(`${selected} has been selected!`);
          },
          options: [
            'no markdown',
            '**Strong Option**',
            `multiline  
              line 1  
              line 2`,
          ],
          selected: 0,
          type: WhisperComponentType.RadioGroup,
        },
        resolveRejectButtons(resolve, reject),
      ],
    });
  });

export const testMarkdownOnLinkClick = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['SomeLink1', false],
      ['SomeLink2', false],
      ['google', false],
    ]);

    const markdown = stripIndent`
      # Links:

      [Some Link 1](# "A Link")
      Text between links
      [Some Link 2](#)
      Text between links
      http://google.com
      `;

    const createdWhisper = await whisper.create({
      label: 'Click on all the links',
      onClose: () => {
        // do nothing.
      },
      components: [
        {
          body: markdown,
          type: WhisperComponentType.Markdown,
          onLinkClick: (error: Error, linkName: string) => {
            console.info(`Received click on the link: ${JSON.stringify(linkName)}`);
            if (linkName === 'Some Link 1') {
              onActionWrapper(error, 'SomeLink1', resolverMap, createdWhisper, resolve, reject);
            } else if (linkName === 'Some Link 2') {
              onActionWrapper(error, 'SomeLink2', resolverMap, createdWhisper, resolve, reject);
            } else if (linkName === 'http://google.com') {
              onActionWrapper(error, 'google', resolverMap, createdWhisper, resolve, reject);
            }
          },
        },
      ],
    });
  });

export const testClickableWhisper = (): Promise<boolean> =>
  new Promise(async (resolve) => {
    await whisper.create({
      label: 'Internal Link Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Select Option 5',
          type: WhisperComponentType.Markdown,
        },
        {
          type: WhisperComponentType.Link,
          textAlign: TextAlign.Left,
          onClick: () => {
            console.debug('wrong');
          },
          text: `Option 1`,
          style: Urgency.None,
        },
        {
          type: WhisperComponentType.Link,
          textAlign: TextAlign.Left,
          onClick: () => {
            console.debug('wrong');
          },
          text: `Option 2`,
          style: Urgency.None,
        },
        {
          type: WhisperComponentType.Link,
          textAlign: TextAlign.Left,
          onClick: () => {
            console.debug('wrong');
          },
          text: `Option 3`,
          style: Urgency.None,
        },
        {
          type: WhisperComponentType.Link,
          textAlign: TextAlign.Left,
          onClick: () => {
            console.debug('wrong');
          },
          text: `Option 4`,
          style: Urgency.None,
        },
        {
          type: WhisperComponentType.Link,
          textAlign: TextAlign.Left,
          onClick: (_error: Error, onClickWhisper: Whisper) => {
            onClickWhisper.close((e) => console.log(e));
            resolve(true);
          },
          text: `Option 5`,
          style: Urgency.None,
        },
      ],
    });
  });

export const testBoxInBox = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Box in the box',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: stripIndent`
              # Box in the Box Example
              `,
          },
          {
            type: WhisperComponentType.Box,
            alignment: JustifyContent.Center,
            direction: Direction.Horizontal,
            customHeight: CustomHeight.Small,
            children: [
              {
                type: WhisperComponentType.Box,
                alignment: JustifyContent.Left,
                direction: Direction.Vertical,
                children: [
                  {
                    type: WhisperComponentType.Markdown,
                    body: stripIndent`
                      **Header Left**

                      Some text on the left
                      `,
                  },
                  {
                    type: WhisperComponentType.TextInput,
                    label: 'Left Input',
                    onChange: (value) => {
                      console.debug(`Input value changed: ${value}`);
                    },
                  },
                ],
              },
              {
                type: WhisperComponentType.Box,
                alignment: JustifyContent.Right,
                direction: Direction.Vertical,
                children: [
                  {
                    type: WhisperComponentType.Markdown,
                    body: stripIndent`
                      **Header Right**

                      Some text on the right
                      `,
                  },
                  {
                    type: WhisperComponentType.TextInput,
                    label: 'Right Input',
                    onChange: (value) => {
                      console.debug(`Input value changed: ${value}`);
                    },
                  },
                ],
              },
            ],
          },
          resolveRejectButtons(resolve, reject),
        ],
      });
    } catch (error) {
      console.error(error);

      reject(error);
    }
  });

function createAcceptButtons(): {
  component: Component;
  acceptResult: Promise<boolean>;
} {
  let resolveHandler;
  let rejectHandler;
  const acceptResult = new Promise<boolean>((resolve, reject) => {
    resolveHandler = resolve;
    rejectHandler = reject;
  });
  const component = resolveRejectButtons(
    resolveHandler,
    rejectHandler,
    undefined,
    undefined,
    false,
  );
  return { component, acceptResult };
}

export const testDropzone = async (): Promise<boolean> => {
  const dropZone: whisper.DropZone = {
    type: WhisperComponentType.DropZone,
    onDrop: () => {},
    label: 'File Components',
    key: 'drop',
  };
  const onDropAction = new Promise<whisper.File[]>((resolve, reject) => {
    dropZone.onDrop = (error, param) => {
      if (error) {
        reject(error);
      }
      if (param) {
        resolve(param);
      }
    };
  });
  const testWhisper = await whisper.create({
    label: 'Dropzone Test',
    components: [
      {
        type: WhisperComponentType.Markdown,
        body: 'Select and drop a file onto the dropzone box below.',
      },
      dropZone,
    ],
  });
  const droppedFiles = await onDropAction;
  const fileData = droppedFiles
    .map((file) => `Path: ${file.path}, Size: ${file.size}`)
    .join('\n\n');

  const acceptFileData = createAcceptButtons();
  await testWhisper.update({
    components: [
      {
        type: WhisperComponentType.Markdown,
        body: `Are these the files you selected?\n\n${fileData}`,
      },
      dropZone,
      acceptFileData.component,
    ],
  });
  await acceptFileData.acceptResult;

  const filesWereCleared = createAcceptButtons();
  await testWhisper.update({
    components: [
      { type: WhisperComponentType.Markdown, body: 'Are the files gone now?' },
      { ...dropZone, value: [] },
      filesWereCleared.component,
    ],
  });
  testWhisper.close(() => {
    // Do nothing.
  });
  return filesWereCleared.acceptResult;
};

export const testClickableButton = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Button Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the correct button',
          type: WhisperComponentType.Markdown,
        },
        {
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          children: [
            {
              buttonStyle: ButtonStyle.Secondary,
              label: `Don't click me`,
              onClick: () => console.debug(`Why'd you do that?`),
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
            {
              buttonStyle: ButtonStyle.Text,
              label: `Me neither`,
              onClick: () => console.debug(`Why'd you do that?`),
              type: WhisperComponentType.Button,
              size: ButtonSize.Small,
            },
            {
              label: `Click me`,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((e) => console.error(e));
                resolve(true);
              },
              type: WhisperComponentType.Button,
            },
          ],
          type: WhisperComponentType.Box,
        },
        {
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          children: [
            {
              label: `Disabled Primary`,
              disabled: true,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((e) => console.error(e));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
            {
              label: `Disabled Secondary`,
              buttonStyle: ButtonStyle.Secondary,
              disabled: true,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((w) => console.error(w));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
            {
              label: `Disabled Text`,
              buttonStyle: ButtonStyle.Text,
              disabled: true,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((e) => console.error(e));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    });
  });

export const testClickableLink = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      let linkClicked = false;
      await whisper.create({
        label: 'External Link Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Click the link below',
            type: WhisperComponentType.Markdown,
          },
          {
            type: WhisperComponentType.Link,
            textAlign: TextAlign.Left,
            href: 'https://www.google.com',
            text: 'https://www.google.com',
            onClick: () => {
              linkClicked = true;
            },
            style: Urgency.None,
          },
          {
            type: WhisperComponentType.Box,
            justifyContent: JustifyContent.SpaceBetween,
            direction: Direction.Horizontal,
            children: [
              {
                type: WhisperComponentType.Button,
                label: `Url failed to open`,
                onClick: (_error: Error, onClickWhisper: Whisper) => {
                  reject('Url failed to open');
                  onClickWhisper.close(() => {
                    // do nothing.
                  });
                },
              },
              {
                type: WhisperComponentType.Button,
                label: `Url opened in browser`,
                onClick: (_error: Error, onClickWhisper: Whisper) => {
                  if (linkClicked) {
                    resolve(true);
                  } else {
                    reject('On click action was not received.');
                  }
                  onClickWhisper.close(() => {
                    // do nothing.
                  });
                },
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListPairWithCopyableValue = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const copyableText = 'Click me to copy the value text';

    // reset clipboard value
    await clipboard.write('');

    const createdWhisper = await whisper.create({
      label: 'List Pair Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.ListPair,
          label: 'I am Mr. Label',
          value: copyableText,
          copyable: true,
          style: Urgency.None,
        },
      ],
    });

    setTimeout(async () => {
      const response = await clipboard.read();
      if (response === copyableText) {
        createdWhisper.close(() => {
          // do nothing.
        });
        resolve(true);
      } else {
        reject(new Error('Incorrect value detected'));
      }
    }, 5000);
  });

export const testListPairWithCopyableLabel = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const copyableText = 'Click me to copy the label text';

    // reset clipboard value
    await clipboard.write('');

    const createdWhisper = await whisper.create({
      label: 'List Pair Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.ListPair,
          label: copyableText,
          value: 'I am Mr. Value',
          labelCopyable: true,
          copyable: false,
          style: Urgency.None,
        },
      ],
    });

    setTimeout(async () => {
      const response = await clipboard.read();
      if (response === copyableText) {
        createdWhisper.close(() => {
          // do nothing.
        });
        resolve(true);
      } else {
        reject(new Error('Incorrect value detected'));
      }
    }, 5000);
  });

export const testMarkdownWithCopyableBody = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const copyableText = '**Click me** to copy the Markdown value text';
    const expectedCopiedText = `<p><strong>Click me</strong> to copy the Markdown value text</p>`;

    // reset clipboard value
    await clipboard.write('');

    const createdWhisper = await whisper.create({
      label: 'Copyable Markdown Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Markdown,
          copyable: MarkdownWhisperCopyMode.Body,
          body: copyableText,
        },
      ],
    });

    setTimeout(async () => {
      const response = await clipboard.read();
      if (response === expectedCopiedText) {
        createdWhisper.close(() => {
          // do nothing.
        });
        resolve(true);
      } else {
        reject(new Error('Incorrect value detected'));
      }
    }, 5000);
  });

export const testMessageWithCopyableBody = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const copyableText = 'Click me to copy the Message value text';

    // reset clipboard value
    await clipboard.write('');

    const createdWhisper = await whisper.create({
      label: 'Copyable Markdown Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Message,
          copyable: MessageWhisperCopyMode.Body,
          body: copyableText,
        },
      ],
    });

    setTimeout(async () => {
      const response = await clipboard.read();
      if (response === copyableText) {
        createdWhisper.close(() => {
          // do nothing.
        });
        resolve(true);
      } else {
        reject(new Error('Incorrect value detected'));
      }
    }, 5000);
  });

export const testMessageWithCopyableHeader = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const copyableText = 'Click me to copy the Message Header text';

    // reset clipboard value
    await clipboard.write('');

    const createdWhisper = await whisper.create({
      label: 'Copyable Markdown Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Message,
          header: copyableText,
          copyable: MessageWhisperCopyMode.Header,
          body: 'do not copy me',
        },
      ],
    });

    setTimeout(async () => {
      const response = await clipboard.read();
      if (response === copyableText) {
        createdWhisper.close(() => {
          // do nothing.
        });
        resolve(true);
      } else {
        reject(new Error('Incorrect value detected'));
      }
    }, 5000);
  });

export const testMessage = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Did message components rendered properly',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Message,
          body: 'None',
          style: Urgency.None,
        },
        {
          type: WhisperComponentType.Message,
          body: 'Success',
          style: Urgency.Success,
        },
        {
          type: WhisperComponentType.Message,
          body: 'Error',
          style: Urgency.Error,
        },
        {
          type: WhisperComponentType.Message,
          body: 'Warning',
          style: Urgency.Warning,
        },
        {
          type: WhisperComponentType.Message,
          body: 'Accent',
          style: Color.Accent,
        },
        {
          type: WhisperComponentType.Message,
          body: 'Black',
          style: Color.Black,
        },
        {
          type: WhisperComponentType.Message,
          body: 'Grey',
          style: Color.Grey,
        },
        resolveRejectButtons(resolve, reject, 'Yes', 'No', true),
      ],
    });
  });

export const testFormComponents = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const textInput = 'myTextInput';
    const emailInput = 'myEmailInput';
    const selectInput = 'mySelectInput';
    let form: Whisper;

    const config: NewWhisper = {
      label: 'Form Whisper',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          id: textInput,
          label: `Enter 'a'`,
          onChange: () => {
            // do nothing.
          },
          tooltip: 'a?',
          type: WhisperComponentType.TextInput,
        },
        {
          id: emailInput,
          label: 'Enter a@b',
          onChange: () => {
            // do nothing.
          },
          type: WhisperComponentType.Email,
        },
        {
          id: selectInput,
          label: `Select 'blue'`,
          onSelect: () => {
            // do nothing.
          },
          options: ['red', 'blue'],
          type: WhisperComponentType.Select,
        },
        {
          id: 'mySubmitButton',
          label: 'Submit',
          onClick: (_error: Error, onClickWhisper: Whisper) => {
            onClickWhisper.componentState.forEach((value: string | number | boolean, key: string) =>
              console.info(key, value),
            );
            if (
              onClickWhisper.componentState.get(textInput) === 'a' &&
              onClickWhisper.componentState.get(emailInput) === 'a@b' &&
              onClickWhisper.componentState.get(selectInput) === 1
            ) {
              form.close((e) => console.error(e));
              resolve(true);
            } else {
              form.close((e) => console.error(e));
              reject(new Error('Please enter correct form values.'));
            }
          },
          type: WhisperComponentType.Button,
        },
        {
          type: WhisperComponentType.Divider,
        },
        {
          header: 'Form render test. Take no action.',
          type: WhisperComponentType.Message,
        },
        {
          label: `Second Text Input`,
          onChange: () => {
            // do nothing.
          },
          value: 'My Initial Value',
          id: 'myTextInputTwo',
          type: WhisperComponentType.TextInput,
        },
        {
          label: `Second Select`,
          onSelect: () => {
            // do nothing.
          },
          options: ['red', 'blue'],
          id: 'mySelectInputTwo',
          type: WhisperComponentType.Select,
        },
        {
          type: WhisperComponentType.Select,
          label: `Select with no default option`,
          onSelect: () => {
            // do nothing.
          },
          options: ['red', 'blue'],
          excludeDefaultOption: true,
          id: 'mySelectInputThree',
        },
        createAutocompleteComponent('auto1', 'Select autocomplete option'),
        {
          onSelect: () => {
            // do nothing.
          },
          options: ['option1', 'option2'],
          id: 'myRadioGroup',
          type: WhisperComponentType.RadioGroup,
        },
        {
          label: 'Check a box',
          value: true,
          onChange: () => {
            // do nothing.
          },
          id: 'myCheckbox',
          type: WhisperComponentType.Checkbox,
        },
        {
          label: 'Enter an email',
          onChange: () => {
            // do nothing.
          },
          id: 'myEmail',
          type: WhisperComponentType.Email,
        },
        {
          label: 'Enter a number',
          onChange: () => {
            // do nothing.
          },
          id: 'myNumber',
          type: WhisperComponentType.Number,
        },
        {
          label: 'Enter a password',
          onChange: () => {
            // do nothing.
          },
          id: 'myPassword',
          type: WhisperComponentType.Password,
        },
        {
          label: 'Enter a telephone',
          onChange: () => {
            // do nothing.
          },
          id: 'myTelephone',
          type: WhisperComponentType.Telephone,
        },
        {
          id: 'dummySubmitButton',
          label: 'Dummy Submit',
          onClick: (_error: Error, onClickWhisper: Whisper) => {
            logMap(onClickWhisper.componentState);
          },
          type: WhisperComponentType.Button,
        },
      ],
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const testNumberInputs = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Number Test',
      components: [
        {
          type: WhisperComponentType.Number,
          label: 'No min, max 10, step 1',
          max: 10,
          step: 1,
          tooltip: 'A tooltip',
          onChange: (error, newValue) => console.log(`New number: ${newValue}`),
        },
        {
          type: WhisperComponentType.Number,
          label: 'No optional fields',
          onChange: (error, newValue) => console.log(`New number: ${newValue}`),
        },
        {
          type: WhisperComponentType.Number,
          label: 'All optional fields',
          value: 0,
          min: 0,
          max: 10,
          step: 0.1,
          tooltip: 'A tooltip',
          onChange: (error, newValue) => console.log(`New number: ${newValue}`),
        },
        {
          type: WhisperComponentType.Telephone,
          label: 'label',
          onChange: (value) => console.log(`Telephone is changed: ${value}`),
          tooltip: 'tooltip',
          value: '09123456789',
        },
        resolveRejectButtons(resolve, reject),
      ],
      onClose: () => {
        console.log('close');
      },
    });
  });

export const testNoLabels = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Did it render components with no label?',
        components: [
          {
            type: WhisperComponentType.Number,
            tooltip: 'Number',
            onChange: () => {
              // do nothing
            },
          },
          {
            type: WhisperComponentType.Telephone,
            tooltip: 'Telephone',
            onChange: () => {
              // do nothing
            },
          },
          {
            type: WhisperComponentType.Password,
            tooltip: 'Password',
            onChange: () => {
              // do nothing
            },
          },
          {
            type: WhisperComponentType.Checkbox,
            tooltip: 'Checkbox',
            onChange: () => {
              // do nothing
            },
          },
          {
            type: WhisperComponentType.Select,
            tooltip: 'Select',
            onSelect: () => {
              // do nothing
            },
            options: ['Option 1', 'Option 2'],
          },
          {
            type: WhisperComponentType.Autocomplete,
            tooltip: 'Autocomplete',
            onSelect: () => {
              // do nothing
            },
            options: autocompleteOptions,
          },
          {
            type: WhisperComponentType.Autocomplete,
            tooltip: 'Autocomplete Multiple',
            multiple: true,
            onSelect: () => {
              // do nothing
            },
            options: autocompleteOptions,
          },
          {
            type: WhisperComponentType.DateTimeInput,
            dateTimeType: DateTimeType.Date,
            tooltip: 'Date',
            onChange: () => {
              // do nothing
            },
          },
          {
            type: WhisperComponentType.Email,
            tooltip: 'Email',
            onChange: () => {
              // do nothing
            },
          },
          {
            type: WhisperComponentType.Button,
            tooltip: 'Button',
            onClick: () => {
              // do nothing
            },
          },
          resolveRejectButtons(resolve, reject),
        ],
        onClose: () => {
          // do nothing
        },
      });
    } catch (error) {
      reject(error);
    }
  });

export const testFloatNumberInputs = (): Promise<boolean> =>
  new Promise(async (resolve) => {
    const createdWhisper = await whisper.create({
      label: 'Number Test',
      components: [
        {
          type: WhisperComponentType.Number,
          label: 'Change to 0.6',
          max: 5.5,
          step: 0.1,
          onChange: (error, newValue) => {
            if (newValue === 0.6) {
              createdWhisper.close((e) => console.error(e));
              resolve(true);
            }
          },
        },
      ],
      onClose: () => {
        console.log('close');
      },
    });
  });

export const testNetworkAndListComponents = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1`;

    const response = await network.httpRequest({
      url,
      method: 'GET',
    });

    console.debug('Network call succeeded, emitting list whisper', url);
    const decodedValue = await network.decode(response.body);
    const { results } = JSON.parse(decodedValue);
    const [recallItem] = results;

    await whisper.create({
      label: 'Latest FDA Food Recall',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: recallItem.product_description,
          header: recallItem.recalling_firm,
          style: Urgency.None,
          type: WhisperComponentType.Message,
        },
        {
          type: WhisperComponentType.Divider,
        },
        {
          copyable: true,
          label: 'Reason',
          style: Urgency.None,
          type: WhisperComponentType.ListPair,
          value: recallItem.reason_for_recall,
        },
        {
          copyable: true,
          label: 'Distribution',
          style: Urgency.None,
          type: WhisperComponentType.ListPair,
          value: recallItem.distribution_pattern,
        },
        {
          copyable: true,
          label: 'Quantity',
          style: Urgency.None,
          type: WhisperComponentType.ListPair,
          value: recallItem.product_quantity,
        },
        {
          copyable: true,
          label: 'Codes',
          style: Urgency.None,
          type: WhisperComponentType.ListPair,
          value: recallItem.code_info,
        },
        {
          label: 'Expand',
          open: false,
          children: [
            {
              copyable: true,
              label: 'Recall Type',
              style: Urgency.None,
              type: WhisperComponentType.ListPair,
              value: recallItem.voluntary_mandated,
            },
            {
              copyable: true,
              label: 'Product type',
              style: Urgency.None,
              type: WhisperComponentType.ListPair,
              value: recallItem.product_type,
            },
            {
              copyable: true,
              label: 'Classification',
              style: Urgency.None,
              type: WhisperComponentType.ListPair,
              value: recallItem.classification,
            },
          ],
          type: WhisperComponentType.CollapseBox,
        },
        resolveRejectButtons(resolve, reject),
      ],
    });
  });

export const testDefaultValueForSelectAndRadio = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Are default values displayed correctly?',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Select,
            label: 'Default value: red',
            options: ['green', 'red', 'blue'],
            onSelect: () => {
              // do nothing.
            },
            selected: 1,
          },
          {
            type: WhisperComponentType.RadioGroup,
            onSelect: () => {
              // do nothing.
            },
            options: ['dog', 'cat', 'snake'],
            selected: 1,
          },
          resolveRejectButtons(resolve, reject),
        ],
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testTooltips = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Are all tooltips rendered?',
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: `Hover to see tooltip`,
            tooltip: 'Tooltip for Markdown',
          },
          {
            type: WhisperComponentType.Message,
            header: 'Message Header',
            body: `Hover to see tooltip`,
            style: Urgency.Success,
            tooltip: 'Tooltip for Message',
            textAlign: TextAlign.Left,
          },
          {
            type: WhisperComponentType.Button,
            label: 'Hover to see tooltip',
            onClick: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Disabled Button',
            disabled: true,
          },
          {
            type: WhisperComponentType.Button,
            label: 'Hover to see tooltip',
            onClick: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Button',
          },
          {
            type: WhisperComponentType.TextInput,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Text Input',
          },
          {
            type: WhisperComponentType.Password,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Password',
          },
          {
            type: WhisperComponentType.Telephone,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Telephone',
          },
          {
            type: WhisperComponentType.DateTimeInput,
            dateTimeType: DateTimeType.Date,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Date',
          },
          {
            type: WhisperComponentType.Email,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Email',
          },
          {
            type: WhisperComponentType.Number,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Number',
          },
          {
            type: WhisperComponentType.Checkbox,
            label: 'Hover to see tooltip',
            onChange: () => {
              // do nothing.
            },
            tooltip: 'Tooltip for Checkbox',
          },
          {
            type: WhisperComponentType.Select,
            label: 'Hover to see tooltip',
            onSelect: () => {
              // do nothing.
            },
            options: ['Option 1'],
            tooltip: 'Tooltip for Select',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Hover to see tooltip',
            onSelect: () => {
              // do nothing.
            },
            options: autocompleteOptions,
            tooltip: 'Tooltip for Autocomplete',
          },
          resolveRejectButtons(resolve, reject),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testClickableBox = (): Promise<boolean> =>
  new Promise(async (resolve) => {
    await whisper.create({
      label: 'Clickable Box Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Markdown,
          body: 'Click the correct button',
        },
        {
          type: WhisperComponentType.Box,
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          onClick: () => {
            console.debug('The toggles...they do nothing');
          },
          children: [
            {
              type: WhisperComponentType.Markdown,
              body: `Don't click me`,
            },
          ],
        },
        {
          type: WhisperComponentType.Box,
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          onClick: (error: Error, onClickWhisper: Whisper) => {
            resolve(true);
            onClickWhisper.close((e) => console.error(e));
          },
          children: [
            {
              body: `Click me`,
              type: WhisperComponentType.Markdown,
            },
          ],
        },
      ],
    });
  });

export const testClickableBoxNestingBoxes = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Nested Clickable Box Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the text below',
          type: WhisperComponentType.Markdown,
        },
        {
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          onClick: (error: Error, onClickWhisper: Whisper) => {
            onClickWhisper.close((e) => console.error(e));
            reject(new Error('Outer element clicked'));
          },
          children: [
            {
              alignment: JustifyContent.SpaceBetween,
              direction: Direction.Horizontal,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((e) => console.error(e));
                resolve(true);
              },
              children: [
                {
                  body: `Click these words`,
                  type: WhisperComponentType.Markdown,
                },
              ],
              type: WhisperComponentType.Box,
            },
            {
              alignment: JustifyContent.SpaceBetween,
              direction: Direction.Horizontal,
              children: [
                {
                  body: `Don't click here`,
                  type: WhisperComponentType.Markdown,
                },
              ],
              type: WhisperComponentType.Box,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    });
  });

export const testClickableBoxNestingButtons = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Nested Button in Clickable Box ',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the button',
          type: WhisperComponentType.Markdown,
        },
        {
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          onClick: (error: Error, onClickWhisper: Whisper) => {
            onClickWhisper.close((e) => console.error(e));
            reject(new Error('Outer element clicked'));
          },
          children: [
            {
              label: `Click me`,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((e) => console.error(e));
                resolve(true);
              },
              type: WhisperComponentType.Button,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    });
  });

export const testClickableBoxNestingLinks = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    await whisper.create({
      label: 'Nested Links in Clickable Box ',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the link',
          type: WhisperComponentType.Markdown,
        },
        {
          alignment: JustifyContent.SpaceBetween,
          direction: Direction.Horizontal,
          onClick: (error: Error, onClickWhisper: Whisper) => {
            onClickWhisper.close((e) => console.error(e));
            reject(new Error('Outer element clicked'));
          },
          children: [
            {
              type: WhisperComponentType.Link,
              textAlign: TextAlign.Left,
              onClick: (error: Error, onClickWhisper: Whisper) => {
                onClickWhisper.close((e) => console.log(e));
                resolve(true);
              },
              text: `Click this link`,
              style: Urgency.None,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    });
  });

const areAllResolved = (resolverMap: Map<string, boolean>) => {
  let result = true;
  resolverMap.forEach((value) => {
    if (!value) {
      result = false;
    }
  });

  return result;
};

const onActionWrapper = (
  error: Error,
  actionType: string,
  resolverMap: Map<string, boolean>,
  createdWhisper: Whisper,
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
) => {
  if (error) {
    console.error(error);
    reject(error);
  }
  console.debug(`Received ${actionType} event`);
  resolverMap.set(actionType, true);

  if (areAllResolved(resolverMap)) {
    resolve(true);
    createdWhisper.close(() => {
      // do nothing.
    });
  }
};

export const testOnBlurAndOnFocus = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['BlurText', false],
      ['FocusText', false],
      ['BlurNumber', false],
      ['FocusNumber', false],
      ['BlurTelephone', false],
      ['FocusTelephone', false],
      ['BlurPassword', false],
      ['FocusPassword', false],
      ['BlurEmail', false],
      ['FocusEmail', false],
    ]);

    try {
      const createdWhisper = await whisper.create({
        label: 'OnBlur Whisper',
        onClose: () => {
          console.debug('whisper closed');
        },
        components: [
          {
            type: WhisperComponentType.TextInput,
            label: 'Text onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error: Error) => {
              onActionWrapper(error, 'BlurText', resolverMap, createdWhisper, resolve, reject);
            },
            onFocus: (error: Error) => {
              onActionWrapper(error, 'FocusText', resolverMap, createdWhisper, resolve, reject);
            },
          },
          {
            type: WhisperComponentType.Telephone,
            label: 'Telephone onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              onActionWrapper(error, 'BlurTelephone', resolverMap, createdWhisper, resolve, reject);
            },
            onFocus: (error: Error) => {
              onActionWrapper(
                error,
                'FocusTelephone',
                resolverMap,
                createdWhisper,
                resolve,
                reject,
              );
            },
          },
          {
            type: WhisperComponentType.Email,
            label: 'Email onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              onActionWrapper(error, 'BlurEmail', resolverMap, createdWhisper, resolve, reject);
            },
            onFocus: (error: Error) => {
              onActionWrapper(error, 'FocusEmail', resolverMap, createdWhisper, resolve, reject);
            },
          },
          {
            type: WhisperComponentType.Number,
            label: 'Number onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              onActionWrapper(error, 'BlurNumber', resolverMap, createdWhisper, resolve, reject);
            },
            onFocus: (error: Error) => {
              onActionWrapper(error, 'FocusNumber', resolverMap, createdWhisper, resolve, reject);
            },
          },
          {
            type: WhisperComponentType.Password,
            label: 'Password onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              onActionWrapper(error, 'BlurPassword', resolverMap, createdWhisper, resolve, reject);
            },
            onFocus: (error: Error) => {
              onActionWrapper(error, 'FocusPassword', resolverMap, createdWhisper, resolve, reject);
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testCollapseBoxOnClick = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolutions = {
      expand: false,
      collapse: false,
    };
    const bothResolved = () => resolutions.expand && resolutions.collapse;
    await whisper.create({
      label: 'Expand / Collapse OnClick Callback Test',
      components: [
        {
          type: WhisperComponentType.Markdown,
          body: 'Markdown outside CollapseBox',
        },
        {
          type: WhisperComponentType.Divider,
        },
        {
          type: WhisperComponentType.Markdown,
          body: 'Markdown outside CollapseBox',
        },
        {
          type: WhisperComponentType.CollapseBox,
          open: false,
          label: 'Expand me!',
          onClick: (error: Error, open: boolean, onClickWhisper: Whisper) => {
            if (open) {
              resolutions.expand = true;
              if (bothResolved()) {
                onClickWhisper.close((e) => console.error(e));
                resolve(true);
              }
            } else {
              if (resolutions.expand) {
                return;
              }
              reject(new Error('CollapseBox should have reported open as true'));
            }
          },
          children: [
            {
              type: WhisperComponentType.Markdown,
              body: 'Good job!',
            },
            {
              type: WhisperComponentType.Divider,
            },
            {
              type: WhisperComponentType.Markdown,
              body: 'Good job!',
            },
            {
              type: WhisperComponentType.Divider,
            },
          ],
        },
        {
          type: WhisperComponentType.CollapseBox,
          open: true,
          label: 'Collapse me!',
          onClick: (error: Error, open: boolean, onClickWhisper: Whisper) => {
            if (!open) {
              resolutions.collapse = true;
              if (bothResolved()) {
                onClickWhisper.close((e) => console.error(e));
                resolve(true);
              }
            } else {
              if (resolutions.collapse) {
                return;
              }
              reject(new Error('CollapseBox should have reported open as false'));
            }
          },
          children: [
            {
              type: WhisperComponentType.Markdown,
              body: 'Being hidden is my destiny!',
            },
          ],
        },
      ],
    });
  });

export const testSectionTitle = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Did Section Title render correctly?',
        components: [
          {
            body: 'section Title in center',
            type: WhisperComponentType.SectionTitle,
            textAlign: TextAlign.Center,
          },
          {
            body: 'section Title on the left',
            type: WhisperComponentType.SectionTitle,
            textAlign: TextAlign.Left,
          },
          {
            body: 'section Title on the right(white)',
            type: WhisperComponentType.SectionTitle,
            textAlign: TextAlign.Right,
            backgroundStyle: Color.White,
          },
          {
            body: 'section Title in center(grey)',
            textAlign: TextAlign.Center,
            type: WhisperComponentType.SectionTitle,
            backgroundStyle: Color.Grey,
          },
          resolveRejectButtons(resolve, reject, 'YES', 'NO'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testDateTime = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['Date', false],
      ['Time', false],
      ['DateTime', false],
    ]);

    try {
      const components: Component[] = [
        {
          type: WhisperComponentType.DateTimeInput,
          key: 'dateId',
          id: 'dateId',
          label: 'Date',
          dateTimeType: DateTimeType.Date,
          onChange: (error: Error, param: string, onChangeWhisper: Whisper) => {
            if (param) {
              console.debug(`Date picker value received: ${param}`);
              onActionWrapper(error, 'Date', resolverMap, onChangeWhisper, resolve, reject);
            }
          },
          tooltip: 'Date picker',
          min: new Date(2020, 0, 1),
          value: new Date(2021, 0, 1),
          max: new Date(2022, 11, 31),
        },
        {
          type: WhisperComponentType.DateTimeInput,
          key: 'timeId',
          id: 'timeId',
          label: 'Time',
          dateTimeType: DateTimeType.Time,
          onChange: (error: Error, param: string, onChangeWhisper: Whisper) => {
            if (param) {
              console.debug(`Time picker value received: ${param}`);
              onActionWrapper(error, 'Time', resolverMap, onChangeWhisper, resolve, reject);
            }
          },
          tooltip: 'Time picker',
          value: new Date(0, 0, 0, 14, 30),
        },
        {
          type: WhisperComponentType.DateTimeInput,
          key: 'dateTimeId',
          id: 'dateTimeId',
          label: 'Date and Time',
          dateTimeType: DateTimeType.DateTime,
          onChange: (error: Error, param: string, onChangeWhisper: Whisper) => {
            if (param) {
              console.debug(`DateTime picker value received: ${param}`);
              onActionWrapper(error, 'DateTime', resolverMap, onChangeWhisper, resolve, reject);
            }
          },
          tooltip: 'Date/Time picker',
          min: new Date(2020, 0, 1),
          value: new Date(2021, 4, 5),
          max: new Date(2022, 11, 31),
        },
      ];
      await whisper.create({
        label: 'Pick date and time',
        components: [
          ...components,
          {
            type: WhisperComponentType.Button,
            label: 'Update',
            onClick: (error: Error, onClickWhisper: Whisper) => {
              onClickWhisper.update({
                components,
              });
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testAlignItems = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const markdown = stripIndent`![](data:image/gif;base64,R0lGODlhFAAUAPAAAP///wAAACH5BAADAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAFAAUAAACEYSPqcvtD6OctNqLs968+68VACH5BAADAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAIfkEAAMAAAAsAAAAABQAFAAAAhGEj6nL7Q+jnLTai7PevPuvFQAh+QQAAwAAACwAAAAAFAAUAIH9/f7+/v///v////8CEZyPqcvtD6OctNqLs968+68VACH5BAADAAAALAAAAAAUABQAgvn2//v5//38//79/////wAAAAAAAAAAAAMVSLrc/jDKSau9OOu9QeBgKI5kaRIJACH5BAADAAAALAAAAAAUABQAgu7n//Lt//n3//v5/////wAAAAAAAAAAAAMXSLrc/jDKSau9OGsthgbBJo5kaZ5olAAAIfkEAAMAAAAsAAAAABQAFACC3Mz/5Nf/8ev/9O//////AAAAAAAAAAAAAxdIutz+MMpJq704ay2GBsEmjmRpnmiUAAAh+QQAAwAAACwAAAAAFAAUAILApP/LtP/h0//m2//9/P/+/f////8AAAADF2i63P4wykmrvThrLYYGwUZsZGmeaHolACH5BAADAAAALAAAAAAUABQAg51w/6mC/8Km/8qy//by//j0//v5//38//7+/////wAAAAAAAAAAAAAAAAAAAAAAAAQbMMlJq7046827/2AoisIQGkAgEsTovnAsz18EACH5BAADAAAALAAAAAAUABQAg3g6/4FI/5Rj/5xw/+HT/+XZ/+jd//Dp//by//j1//n3//79///+/////wAAAAAAAAQfsMlJq7046827/2AIJkl4CAMCGkBwhEQhznRt37gdAQAh+QQAAwAAACwAAAAAFAAUAIRkHf9nIf9sKv9wMP+6m/+/of/BpP/MtP/Mtf/Ww//Yxv/by//07//39P/7+f/9/P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFJSAkjmRpnmiqrmzrvnD8OsoSH8KQwAYQHDAGodCQGY/IpHKJDAEAIfkEAAMAAAAsAAAAABQAFACEYRn/iVP/i1f/jFf/kV//lGT/mmz/mm3/nXH/07//2cj/3tD/5Nf/9/P/+PX/+vf//Pr//fz//f3/////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) `;

    await whisper.create({
      label: 'Markdown whisper Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: WhisperComponentType.Box,
          alignItems: AlignItems.Center,
          justifyContent: JustifyContent.Left,
          direction: Direction.Horizontal,
          children: [
            {
              body: markdown,
              type: WhisperComponentType.Markdown,
            },
            {
              type: WhisperComponentType.Box,
              alignment: JustifyContent.Center,
              direction: Direction.Vertical,
              children: [
                {
                  body: 'Copied',
                  type: WhisperComponentType.Markdown,
                },
              ],
            },
          ],
        },
        {
          body: 'Are the items above aligned?',
          type: WhisperComponentType.Markdown,
        },
        resolveRejectButtons(resolve, reject),
      ],
    });
  });

export const testOnCopy = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const formLabel = 'Simple Form';
      const passed = [false, false, false];
      const checkTrue = (e: boolean) => e === true;

      const components: Component[] = [
        {
          type: WhisperComponentType.Markdown,
          body: `Click here to test onCopy for Markdown`,
          copyable: MarkdownWhisperCopyMode.Body,
          onCopy: () => {
            passed[0] = true;

            if (passed.every(checkTrue)) {
              resolve(true);
            }
          },
        },
        {
          type: WhisperComponentType.ListPair,
          label: `This is the label`,
          value: 'Click here to test ListPair',
          copyable: true,
          style: Urgency.None,
          onCopy: (error, type) => {
            passed[1] = true;

            if (passed.every(checkTrue)) {
              resolve(true);
            }
          },
        },
        {
          type: WhisperComponentType.Message,
          body: `Click here to test Message`,
          copyable: MessageWhisperCopyMode.Body,
          onCopy: () => {
            passed[2] = true;

            if (passed.every(checkTrue)) {
              resolve(true);
            }
          },
        },
      ];

      whisper.create({
        label: formLabel,
        onClose: () => {
          // do nothing.
        },
        components: [...components],
      });
    } catch (error) {
      console.error(error);
    }
  });

export const testFlexProperties = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Flex Properties Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Is the button below cropped?',
            type: WhisperComponentType.Markdown,
          },
          {
            type: whisper.WhisperComponentType.Box,
            direction: whisper.Direction.Horizontal,
            justifyContent: whisper.JustifyContent.Right,
            children: [
              {
                type: whisper.WhisperComponentType.Checkbox,
                label:
                  'M47.817  \n' +
                  'Spondylosis without myelopathy or radiculopathy, lumbosacral region  \n' +
                  '**71.3** %',
                value: false,
                layout: {
                  flex: '1',
                },
                onChange: () => console.log('toggle checkbox'),
              },
              {
                type: whisper.WhisperComponentType.Button,
                label: 'Copy',
                size: whisper.ButtonSize.Small,
                buttonStyle: whisper.ButtonStyle.Secondary,
                onClick: () => console.log('clicked button'),
              },
            ],
          },
          resolveRejectButtons(resolve, reject, 'Looks good', 'It is cropped'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testFlex = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Flex Properties Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Do the button and link take up equal space?',
            type: WhisperComponentType.Markdown,
          },
          {
            type: whisper.WhisperComponentType.CollapseBox,
            open: true,
            children: [
              {
                type: whisper.WhisperComponentType.Box,
                direction: whisper.Direction.Horizontal,
                justifyContent: whisper.JustifyContent.SpaceAround,
                onClick: () => console.log('click the box'),
                children: [
                  {
                    type: whisper.WhisperComponentType.Button,
                    label: 'test',
                    layout: {
                      flex: '1',
                    },
                    onClick: () => console.log('Click the Button'),
                  },
                  {
                    type: whisper.WhisperComponentType.Link,
                    href: 'https://www.oliveai.com',
                    text: 'Test link',
                    layout: {
                      flex: '1',
                    },
                  },
                ],
              },
            ],
          },
          resolveRejectButtons(resolve, reject, 'Yes', 'No'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testRichTextEditor = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      let editedText = '';
      const components: Component[] = [
        {
          id: 'RTE1',
          key: 'RTE1',
          type: WhisperComponentType.RichTextEditor,
          onBlur: () => {
            console.debug(`On blur called`);
          },
          onChange: (_error: Error, value: string) => {
            console.debug(`Input value changed: ${value}`);
            editedText = value;
          },
          onFocus: () => {
            console.debug(`On Focus called`);
          },
          tooltip: "It's a richTextEditor tooltip.",
        },
        {
          type: WhisperComponentType.Box,
          justifyContent: JustifyContent.Right,
          direction: Direction.Horizontal,
          children: [
            {
              type: WhisperComponentType.Button,
              label: 'Save',
              onClick: (_error: Error, onClickWhisper: Whisper) => {
                if (!editedText || editedText.length === 0 || editedText.length > 50) {
                  (components[0] as RichTextEditor).validationError =
                    'Inputed text is required and should be less than 200 chars.';
                  onClickWhisper.update({
                    components,
                  });
                } else {
                  onClickWhisper.update({
                    components: [
                      {
                        type: WhisperComponentType.Markdown,
                        body: editedText,
                      },
                      resolveRejectButtons(resolve, reject, 'YES', 'NO'),
                    ],
                  });
                }
              },
            },
          ],
        },
      ];
      await whisper.create({
        label: 'Did Rich Text Editor saves correctly?',
        components,
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testAutocomplete = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['Select', false],
      ['Change', false],
      ['Multiple', false],
    ]);
    try {
      await whisper.create({
        label: 'Autocomplete test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: 'Select "Value 4"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Test',
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('4')) {
                onActionWrapper(error, 'Select', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: autocompleteOptions,
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Type into the input "Typed"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Test',
            loading: true,
            onChange: (error, value: string, onChangeWhisper) => {
              console.info(`Received onChange value: ${value}`);
              if (value.toLowerCase() === 'typed') {
                onActionWrapper(error, 'Change', resolverMap, onChangeWhisper, resolve, reject);
              }
            },
            onSelect: (_error, value: string[]) => {
              console.info(`Received onSelect value: ${JSON.stringify(value)}`);
            },
            options: [...autocompleteOptions, { label: 'Typed', value: '10' }],
            tooltip: 'tooltip',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Select values 4 and 5',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Test',
            loading: true,
            multiple: true,
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('4') && value.includes('5')) {
                onActionWrapper(error, 'Multiple', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: autocompleteOptions,
            tooltip: 'tooltip',
            value: '5',
          },
        ],
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testPadding = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Padding Property Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Compare the two sets of boxes below. Does the second group have padding?',
            type: WhisperComponentType.Markdown,
          },
          {
            type: whisper.WhisperComponentType.CollapseBox,
            open: true,
            children: [
              {
                type: whisper.WhisperComponentType.Box,
                direction: whisper.Direction.Horizontal,
                justifyContent: whisper.JustifyContent.SpaceAround,
                onClick: () => console.log('click the box'),
                children: [
                  {
                    type: whisper.WhisperComponentType.Button,
                    label: 'test',
                    layout: {
                      flex: '1',
                    },
                    onClick: () => console.log('Click the Button'),
                  },
                  {
                    type: whisper.WhisperComponentType.Icon,
                    name: 'favorite',
                    size: whisper.IconSize.Small,
                    layout: {
                      flex: '1',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: whisper.WhisperComponentType.CollapseBox,
            layout: {
              padding: whisper.StyleSize.Large,
            },
            open: true,
            children: [
              {
                type: whisper.WhisperComponentType.Box,
                direction: whisper.Direction.Horizontal,
                justifyContent: whisper.JustifyContent.SpaceAround,
                onClick: () => console.log('click the box'),
                children: [
                  {
                    type: whisper.WhisperComponentType.Button,
                    label: 'test',
                    layout: {
                      flex: '1',
                      padding: whisper.StyleSize.Medium,
                    },
                    onClick: () => console.log('Click the Button'),
                  },
                  {
                    type: whisper.WhisperComponentType.Icon,
                    name: 'favorite',
                    size: whisper.IconSize.Small,
                    layout: {
                      flex: '1',
                      padding: whisper.StyleSize.Medium,
                    },
                  },
                ],
              },
            ],
          },
          resolveRejectButtons(resolve, reject, 'Yes', 'No'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testMargin = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Margin Property Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Compare the two sets of boxes below. Does the second group have margins?',
            type: WhisperComponentType.Markdown,
          },
          {
            type: whisper.WhisperComponentType.Box,
            direction: Direction.Horizontal,
            justifyContent: JustifyContent.SpaceEvenly,
            children: [
              {
                type: whisper.WhisperComponentType.Select,
                label: `Select 'blue'`,
                onSelect: () => {
                  console.log('selected');
                },
                layout: {
                  flex: '1',
                },
                options: ['red', 'blue'],
              },
              {
                type: whisper.WhisperComponentType.TextInput,
                label: 'Test Input',
                onChange: (value) => {
                  console.debug(`Input value changed: ${value}`);
                },
              },
            ],
          },
          {
            type: whisper.WhisperComponentType.Box,
            layout: {
              margin: whisper.StyleSize.Small,
            },
            direction: Direction.Horizontal,
            justifyContent: JustifyContent.SpaceEvenly,
            children: [
              {
                type: whisper.WhisperComponentType.Select,
                label: `Select 'blue'`,
                onSelect: () => {
                  console.log('selected');
                },
                options: ['red', 'blue'],
                layout: {
                  flex: '1',
                  marginRight: whisper.StyleSize.Medium,
                },
              },
              {
                type: whisper.WhisperComponentType.TextInput,
                label: 'Test Input',
                onChange: (value) => {
                  console.debug(`Input value changed: ${value}`);
                },
                layout: {
                  marginLeft: whisper.StyleSize.Small,
                  marginRight: whisper.StyleSize.Small,
                },
              },
            ],
          },
          resolveRejectButtons(resolve, reject, 'Yes', 'No'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testWidth = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Width Property Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Is the button filling the space? Is the divider half the width of the card?',
            type: WhisperComponentType.Markdown,
          },
          {
            type: whisper.WhisperComponentType.Box,
            direction: Direction.Horizontal,
            justifyContent: JustifyContent.SpaceEvenly,
            children: [
              {
                type: whisper.WhisperComponentType.Select,
                label: `Select 'blue'`,
                onSelect: () => {
                  console.log('selected');
                },
                layout: {
                  flex: '1',
                },
                options: ['red', 'blue'],
              },
              {
                type: whisper.WhisperComponentType.Button,
                label: 'Test Input',
                onClick: () => {
                  console.debug('Clicked');
                },
                layout: {
                  flex: '1',
                  width: whisper.WidthSize.Full,
                },
              },
            ],
          },
          {
            type: whisper.WhisperComponentType.Divider,
            layout: {
              width: whisper.WidthSize.Half,
            },
          },
          resolveRejectButtons(resolve, reject, 'Yes', 'No'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testScrollInsideBox = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await whisper.create({
        label: 'Scrolling Inside Box Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Does is scroll?',
            type: WhisperComponentType.Markdown,
          },

          {
            type: whisper.WhisperComponentType.Box,
            direction: Direction.Vertical,
            justifyContent: JustifyContent.SpaceEvenly,
            customHeight: CustomHeight.Small,
            children: [
              {
                type: WhisperComponentType.TextInput,
                label: 'TextInput',
                onChange: (value) => {
                  console.debug(`Input value changed: ${value}`);
                },
              },
              {
                type: whisper.WhisperComponentType.Markdown,
                body: shortText,
              },
            ],
          },
          {
            type: whisper.WhisperComponentType.Box,
            direction: Direction.Horizontal,
            justifyContent: JustifyContent.SpaceEvenly,
            customHeight: CustomHeight.Small,
            children: [
              {
                type: whisper.WhisperComponentType.Markdown,
                body: stripIndent`
              When customHeight is large enough to put all your markdown inside box. It won't scroll.`,
              },
              {
                type: WhisperComponentType.TextInput,
                label: 'TextInput',
                onChange: (value) => {
                  console.debug(`Input value changed: ${value}`);
                },
              },
            ],
          },
          {
            type: whisper.WhisperComponentType.Box,
            direction: Direction.Vertical,
            justifyContent: JustifyContent.SpaceEvenly,
            customHeight: CustomHeight.ExtraLarge,
            children: [
              {
                type: whisper.WhisperComponentType.Markdown,
                body: longText,
              },
            ],
          },
          resolveRejectButtons(resolve, reject, 'Yes', 'No'),
        ],
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
