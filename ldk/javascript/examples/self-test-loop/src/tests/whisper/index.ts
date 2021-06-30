import { clipboard, whisper, network } from '@oliveai/ldk';

import {
  JustifyContent,
  Direction,
  ButtonStyle,
  Urgency,
  WhisperComponentType,
  TextAlign,
  ButtonSize,
  Whisper,
  NewWhisper,
} from '@oliveai/ldk/dist/whisper/types';
import { stripIndent } from 'common-tags';

export const testMarkdownWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const options = ['M12.01', 'M00.123'];
    const markdown = stripIndent`
      A paragraph with *emphasis* and **strong importance**.
      > A block quote with ~strikethrough~ and a URL: https://oliveai.com/

      * Lists
      * [ ] todo
      * [x] done

      A table:

      | Table Header 1 | Table header 2 |
      | - | - |
      | Row 1 Col 1 | Row 1 Col 2 |
      | Row 2 Col 1 | Row 2 Col 2 |`;

    let form: Whisper;
    whisper
      .create({
        label: 'Markdown whisper Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: markdown,
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
          {
            alignment: JustifyContent.SpaceEvenly,
            direction: Direction.Horizontal,
            children: [
              {
                label: `No`,
                onClick: () => {
                  form.close((error) => console.error(error));
                  reject(new Error());
                },
                type: WhisperComponentType.Button,
              },
              {
                label: `Yes`,
                onClick: () => {
                  form.close((error) => console.error(error));
                  resolve(true);
                },
                type: WhisperComponentType.Button,
              },
            ],
            type: WhisperComponentType.Box,
          },
        ],
      })
      .then((formWhisper: Whisper) => {
        form = formWhisper;
      });
  });

export const testClickableWhisper = (): Promise<boolean> =>
  new Promise((resolve) => {
    let form: Whisper;
    whisper
      .create({
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
            onClick: () => {
              form.close((error) => console.log(error));
              resolve(true);
            },
            text: `Option 5`,
            style: Urgency.None,
          },
        ],
      })
      .then((whisperForm: Whisper) => {
        form = whisperForm;
      });
  });

export const testBoxInTheBox = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const form = await whisper.create({
        label: 'Box in the box',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: `
# H1 Markdown Example 
## H2 Markdown Example 
### H3 Markdown Example 
`,
          },
          {
            type: WhisperComponentType.Markdown,
            body: stripIndent`
              |||
              |:---|:---|
              |**Video Visit**||
              |ADHD/Learning Problems|Allergies|
              |Anxiety|Asthma|
              |Cold/Sore Throat|Depression|
              |Diaper Rash|F/U Dementia|
              |F/U Diabetes/DM|F/U Imaging Results|
              |F/U Labs|F/U Parkinsons|
              |F/U Thyroid|Fatigue|
              |Flu Symptoms|GWA (Medicare)|
              |Headache|Insomnia|
              |||
              |||
              |||
              |||
              |**In-Person Only**||
              |Back Pain|Earache|
              |F/U Hypertension/Blood Pressure|TB Test|
              |||
              |||
              |||
              |||
              |**OB Video Visit**||
              |Contraceptive Consults|F/U Labs/Tests/Ultrasounds|
              |Infertility Consults|Post-Partum Appointments (Scheduled By Office)|
            `,
          },
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
          {
            type: WhisperComponentType.Box,
            alignment: JustifyContent.Left,
            direction: Direction.Horizontal,
            children: [
              {
                type: WhisperComponentType.Button,
                buttonStyle: ButtonStyle.Primary,
                label: 'Press if Rendered',
                onClick: () => {
                  form.close((error) => console.log(error));
                  resolve(true);
                },
              },
              {
                type: WhisperComponentType.Button,
                buttonStyle: ButtonStyle.Secondary,
                label: 'Press if NOT Rendered',
                onClick: () => {
                  form.close((error) => console.log(error));
                  reject(new Error('Markdown is not rendered correctly'));
                },
              },
            ],
          },
        ],
      });

      setTimeout(() => {
        form.close(() => {
          // do nothing.
        });
      }, 10000);
    } catch (error) {
      console.error(error);

      reject(error);
    }
  });

export const buttonWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let form: Whisper;
    const config: NewWhisper = {
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
          alignment: JustifyContent.SpaceEvenly,
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
              onClick: () => {
                form.close((error) => console.error(error));
                resolve(true);
              },
              type: WhisperComponentType.Button,
            },
          ],
          type: WhisperComponentType.Box,
        },
        {
          alignment: JustifyContent.SpaceEvenly,
          direction: Direction.Horizontal,
          children: [
            {
              label: `Disabled Primary`,
              disabled: true,
              onClick: () => {
                form.close((error) => console.error(error));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
            {
              label: `Disabled Secondary`,
              buttonStyle: ButtonStyle.Secondary,
              disabled: true,
              onClick: () => {
                form.close((error) => console.error(error));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
            {
              label: `Disabled Text`,
              buttonStyle: ButtonStyle.Text,
              disabled: true,
              onClick: () => {
                form.close((error) => console.error(error));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: WhisperComponentType.Button,
              size: ButtonSize.Large,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const linkWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const config: NewWhisper = {
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
          style: Urgency.None,
        },
      ],
    };

    whisper.create(config).then((form: Whisper) => {
      setTimeout(() => {
        form.close((error) => console.error(error));
        resolve(true);
      }, 5000);
    });
  });

export const listPairWhisperCopyableValue = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const copyableText = 'Click me to copy the value text';
    const config: NewWhisper = {
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
    };
    whisper.create(config).then((form: Whisper) => {
      setTimeout(() => {
        form.close((error) => console.error(error));
      }, 5000);
    });

    setTimeout(() => {
      clipboard.read().then((response) => {
        if (response === copyableText) {
          resolve(true);
        } else {
          reject(new Error('Incorrect value detected'));
        }
      });
    }, 5000);
  });

export const listPairWhisperCopyableLabel = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const copyableText = 'Click me to copy the label text';
    const config: NewWhisper = {
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
    };

    whisper.create(config).then((form: Whisper) => {
      setTimeout(() => {
        form.close((error) => console.error(error));
      }, 5000);
    });

    setTimeout(() => {
      clipboard.read().then((response) => {
        if (response === copyableText) {
          resolve(true);
        } else {
          reject(new Error('Incorrect value detected'));
        }
      });
    }, 5000);
  });

export const simpleFormWhisper = (): Promise<boolean> =>
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
          onClick: (error: Error, onClickWhisper: Whisper) => {
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
          label: `Select 'blue'`,
          onSelect: () => {
            // do nothing.
          },
          options: ['red', 'blue'],
          id: 'mySelectInputTwo',
          type: WhisperComponentType.Select,
        },
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
          onClick: (error: Error, onClickWhisper: Whisper) => {
            onClickWhisper.componentState.forEach((value: string | number | boolean, key: string) =>
              console.info(key, value),
            );
          },
          type: WhisperComponentType.Button,
        },
      ],
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const numberInputs = (): Promise<boolean> =>
  new Promise((resolve) => {
    let form: Whisper;
    const config: NewWhisper = {
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
      ],
      onClose: () => {
        console.log('close');
      },
    };
    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
      setTimeout(() => {
        form.close((error) => console.error(error));
        resolve(true);
      }, 5000);
    });
  });

export const floatNumberInputs = (): Promise<boolean> =>
  new Promise((resolve) => {
    let form: Whisper;
    const config: NewWhisper = {
      label: 'Number Test',
      components: [
        {
          type: WhisperComponentType.Number,
          label: 'Change to 0.6',
          max: 5.5,
          step: 0.1,
          onChange: (error, newValue) => {
            if (newValue === 0.6) {
              resolve(true);
              form.close((inner) => console.error(inner));
            }
          },
        },
      ],
      onClose: () => {
        console.log('close');
      },
    };
    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const testNetworkAndListComponents = (): Promise<boolean> =>
  new Promise((resolve) => {
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1`;

    network
      .httpRequest({
        url,
        method: 'GET',
      })
      .then((response: network.HTTPResponse) => {
        console.debug('Network call succeeded, emitting list whisper', url);
        return network.decode(response.body);
      })
      .then((decodedValue) => {
        const { results } = JSON.parse(decodedValue);
        const [recallItem] = results;

        setTimeout(() => {
          resolve(true);
        }, 5000);

        const config: NewWhisper = {
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
          ],
        };

        whisper.create(config).then((form: Whisper) => {
          setTimeout(() => {
            form.close((error) => console.error(error));
            resolve(true);
          }, 2000);
        });
      });
  });

export const initialValueSelectAndRadioWhispers = (): Promise<boolean> =>
  new Promise((resolve) => {
    const config: NewWhisper = {
      label: 'Default Values Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          label: 'Select a color',
          options: ['green', 'red', 'blue'],
          onSelect: (error, selected) => {
            console.log(`${selected} has been selected!`);
          },
          type: WhisperComponentType.Select,
          selected: 2,
          tooltip: 'Select a color tooltip',
        },
        {
          onSelect: (selected) => {
            console.log(`${selected} has been selected!`);
          },
          options: ['dog', 'cat', 'snake'],
          selected: 1,
          type: WhisperComponentType.RadioGroup,
        },
      ],
    };

    whisper.create(config).then((form: Whisper) => {
      setTimeout(() => {
        form.close((error) => console.error(error));
        resolve(true);
      }, 5000);
    });
  });

export const tooltips = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const createdWhisper = await whisper.create({
        label: 'Tooltip Whisper',
        onClose: () => {
          console.debug('whisper closed');
        },
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
            tooltip: 'Tooltip for Button',
            disabled: true,
          },
          {
            type: WhisperComponentType.Markdown,
            body: stripIndent`
              # Are all tooltips rendered?
              `,
          },
          {
            type: WhisperComponentType.Box,
            alignment: JustifyContent.Left,
            direction: Direction.Horizontal,
            children: [
              {
                type: WhisperComponentType.Button,
                label: 'Yes',
                onClick: (error, onClickWhisper) => {
                  if (error) {
                    console.error(error);
                    onClickWhisper.close(() => {
                      // do nothing.
                    });
                    reject(error);
                  }
                  onClickWhisper.close(() => {
                    // do nothing.
                  });
                  resolve(true);
                },
              },
              {
                type: WhisperComponentType.Button,
                label: 'No',
                onClick: (error, onClickWhisper) => {
                  if (error) {
                    console.error(error);
                    onClickWhisper.close(() => {
                      // do nothing.
                    });
                    reject(error);
                  }
                  onClickWhisper.close(() => {
                    // do nothing.
                  });
                  reject(new Error('Tooltips were not correctly rendered'));
                },
              },
            ],
          },
        ],
      });

      setTimeout(() => {
        createdWhisper.close(() => {
          // do nothing.
        });
      }, 20000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testClickableBox = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let form: Whisper;
    const config: NewWhisper = {
      label: 'Clickable Box Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the correct button',
          type: WhisperComponentType.Markdown,
        },
        {
          alignment: JustifyContent.SpaceEvenly,
          direction: Direction.Horizontal,
          onClick: () => {
            console.debug('The toggles...they do nothing');
          },
          children: [
            {
              body: `Don't click me`,
              type: WhisperComponentType.Markdown,
            },
          ],
          type: WhisperComponentType.Box,
        },
        {
          alignment: JustifyContent.SpaceEvenly,
          direction: Direction.Horizontal,
          onClick: () => {
            resolve(true);
            form.close((error) => console.error(error));
          },
          children: [
            {
              body: `Click me`,
              type: WhisperComponentType.Markdown,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const testClickableBoxNestingBoxes = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let form: Whisper;
    const config: NewWhisper = {
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
          alignment: JustifyContent.SpaceEvenly,
          direction: Direction.Horizontal,
          onClick: () => {
            reject(new Error('Outer element clicked'));
            form.close((error) => console.error(error));
          },
          children: [
            {
              alignment: JustifyContent.SpaceEvenly,
              direction: Direction.Horizontal,
              onClick: () => {
                resolve(true);
                form.close((error) => console.error(error));
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
              alignment: JustifyContent.SpaceEvenly,
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
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const testClickableBoxNestingButtons = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let form: Whisper;
    const config: NewWhisper = {
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
          alignment: JustifyContent.SpaceEvenly,
          direction: Direction.Horizontal,
          onClick: () => {
            reject(new Error('Outer element clicked'));
            form.close((error) => console.error(error));
          },
          children: [
            {
              label: `Click me`,
              onClick: () => {
                resolve(true);
                form.close((error) => console.error(error));
              },
              type: WhisperComponentType.Button,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });

export const testClickableBoxNestingLinks = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let form: Whisper;
    const config: NewWhisper = {
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
          alignment: JustifyContent.SpaceEvenly,
          direction: Direction.Horizontal,
          onClick: () => {
            reject(new Error('Outer element clicked'));
            form.close((error) => console.error(error));
          },
          children: [
            {
              type: WhisperComponentType.Link,
              textAlign: TextAlign.Left,
              onClick: () => {
                form.close((error) => console.log(error));
                resolve(true);
              },
              text: `Click this link`,
              style: Urgency.None,
            },
          ],
          type: WhisperComponentType.Box,
        },
      ],
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
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

export const onBlurTest = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['Text', false],
      ['Number', false],
      ['Telephone', false],
      ['Password', false],
      ['Email', false],
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
            onBlur: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received text onBlur event');
              resolverMap.set('Text', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
          {
            type: WhisperComponentType.Telephone,
            label: 'Telephone onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received telephone onBlur event');
              resolverMap.set('Telephone', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
          {
            type: WhisperComponentType.Email,
            label: 'Email onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received email onBlur event');
              resolverMap.set('Email', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
              }
            },
          },
          {
            type: WhisperComponentType.Number,
            label: 'Number onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received number onBlur event');
              resolverMap.set('Number', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
          {
            type: WhisperComponentType.Password,
            label: 'Password onBlur',
            onChange: () => {
              // do nothing.
            },
            onBlur: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received password onBlur event');
              resolverMap.set('Password', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
        ],
      });

      setTimeout(() => {
        createdWhisper.close(() => {
          // do nothing.
        });
      }, 10000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const onFocusTest = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['Text', false],
      ['Number', false],
      ['Telephone', false],
      ['Password', false],
      ['Email', false],
    ]);
    try {
      const createdWhisper = await whisper.create({
        label: 'OnFocus Whisper',
        onClose: () => {
          console.debug('whisper closed');
        },
        components: [
          {
            type: WhisperComponentType.TextInput,
            label: 'Text onFocus',
            onChange: () => {
              // do nothing.
            },
            onFocus: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received text onFocus event');
              resolverMap.set('Text', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
          {
            type: WhisperComponentType.Telephone,
            label: 'Telephone onFocus',
            onChange: () => {
              // do nothing.
            },
            onFocus: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received telephone onFocus event');
              resolverMap.set('Telephone', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
          {
            type: WhisperComponentType.Email,
            label: 'Email onFocus',
            onChange: () => {
              // do nothing.
            },
            onFocus: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received email onFocus event');
              resolverMap.set('Email', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
              }
            },
          },
          {
            type: WhisperComponentType.Number,
            label: 'Number onFocus',
            onChange: () => {
              // do nothing.
            },
            onFocus: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received number onFocus event');
              resolverMap.set('Number', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
          {
            type: WhisperComponentType.Password,
            label: 'Password onFocus',
            onChange: () => {
              // do nothing.
            },
            onFocus: (error) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              console.debug('Received password onFocus event');
              resolverMap.set('Password', true);

              if (areAllResolved(resolverMap)) {
                resolve(true);
                createdWhisper.close(() => {
                  // do nothing.
                });
              }
            },
          },
        ],
      });

      setTimeout(() => {
        createdWhisper.close(() => {
          // do nothing.
        });
      }, 10000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const collapseBoxOnClick = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const resolutions = {
      expand: false,
      collapse: false,
    };
    const bothResolved = () => resolutions.expand && resolutions.collapse;

    let form: Whisper;
    const config: NewWhisper = {
      label: 'Expand / Collapse OnClick Callback Test',
      components: [
        {
          type: WhisperComponentType.CollapseBox,
          open: false,
          label: 'Expand me!',
          onClick: (error, open) => {
            if (open) {
              resolutions.expand = true;
              if (bothResolved()) {
                form.close((e) => console.error(e));
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
          ],
        },
        {
          type: WhisperComponentType.CollapseBox,
          open: true,
          label: 'Collapse me!',
          onClick: (error, open) => {
            if (!open) {
              resolutions.collapse = true;
              if (bothResolved()) {
                form.close((e) => console.error(e));
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
    };

    whisper.create(config).then((whisperForm: Whisper) => {
      form = whisperForm;
    });
  });
