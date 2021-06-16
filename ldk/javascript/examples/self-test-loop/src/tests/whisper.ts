import { clipboard, whisper, network } from '@oliveai/ldk';

import { Alignment, Direction, ButtonStyle, Urgency } from '@oliveai/ldk/dist/whisper';

export const testMarkdownWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const options = ['M12.01', 'M00.123'];
    var form: whisper.Whisper;
    whisper
      .create({
        label: 'Markdown whisper Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: `A paragraph with *emphasis* and **strong importance**.
              > A block quote with ~strikethrough~ and a URL: https://oliveai.com/

              * Lists
              * [ ] todo
              * [x] done

              A table:

              | Table Header 1 | Table header 2 |
              | - | - |
              | Row 1 Col 1 | Row 1 Col 2 |
              | Row 2 Col 1 | Row 2 Col 2 |
              `,
            type: whisper.WhisperComponentType.Markdown,
          },
          {
            label: `${options[0]}  
            line one
            line two 100.0%`,
            value: false,
            onChange: (error, value) => {
              console.debug(`selected value: ${options[0]}`);
            },
            type: whisper.WhisperComponentType.Checkbox,
          },
          {
            label: `${options[1]}  
            this is a longer line one, it was known for being long 
            99.2 %`,
            value: false,
            onChange: () => {
              console.debug(`selected value: ${options[1]}`);
            },
            type: whisper.WhisperComponentType.Checkbox,
          },
          {
            label: `Single Line Example that is extremely 
            long extremely long extremely long extremely 
            long extremely long extremely long extremely long extremely 
            long extremely long extremely long extremely long extremely 
            long extremely long extremely long`,
            value: false,
            onChange: () => {},
            type: whisper.WhisperComponentType.Checkbox,
          },
          {
            label: `normal label with no surprises`,
            value: false,
            onChange: () => {},
            type: whisper.WhisperComponentType.Checkbox,
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
            type: whisper.WhisperComponentType.RadioGroup,
          },
          {
            alignment: whisper.Alignment.SpaceEvenly,
            direction: whisper.Direction.Horizontal,
            children: [
              {
                label: `No`,
                onClick: () => {
                  form.close((error) => console.error(error));
                  reject(true);
                },
                type: whisper.WhisperComponentType.Button,
              },
              {
                label: `Yes`,
                onClick: () => {
                  form.close((error) => console.error(error));
                  resolve(true);
                },
                type: whisper.WhisperComponentType.Button,
              },
            ],
            type: whisper.WhisperComponentType.Box,
          },
        ],
      })
      .then((whisper: whisper.Whisper) => (form = whisper));
  });

export const testClickableWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var form: whisper.Whisper;
    whisper
      .create({
        label: 'Internal Link Test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            body: 'Select Option 5',
            type: whisper.WhisperComponentType.Markdown,
          },
          {
            type: whisper.WhisperComponentType.Link,
            textAlign: whisper.TextAlign.Left,
            onClick: () => {
              console.debug('wrong');
            },
            text: `Option 1`,
            style: whisper.Urgency.None,
          },
          {
            type: whisper.WhisperComponentType.Link,
            textAlign: whisper.TextAlign.Left,
            onClick: () => {
              console.debug('wrong');
            },
            text: `Option 2`,
            style: whisper.Urgency.None,
          },
          {
            type: whisper.WhisperComponentType.Link,
            textAlign: whisper.TextAlign.Left,
            onClick: () => {
              console.debug('wrong');
            },
            text: `Option 3`,
            style: whisper.Urgency.None,
          },
          {
            type: whisper.WhisperComponentType.Link,
            textAlign: whisper.TextAlign.Left,
            onClick: () => {
              console.debug('wrong');
            },
            text: `Option 4`,
            style: whisper.Urgency.None,
          },
          {
            type: whisper.WhisperComponentType.Link,
            textAlign: whisper.TextAlign.Left,
            onClick: () => {
              form.close((error) => console.log(error));
              resolve(true);
            },
            text: `Option 5`,
            style: whisper.Urgency.None,
          },
        ],
      })
      .then((whisper: whisper.Whisper) => (form = whisper));
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
            type: whisper.WhisperComponentType.Markdown,
            body: `
# Markdown Example
`,
          },
          {
            type: whisper.WhisperComponentType.Markdown,
            body: `
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
            type: whisper.WhisperComponentType.Markdown,
            body: `
# Box in the Box Example
`,
          },
          {
            type: whisper.WhisperComponentType.Box,
            alignment: Alignment.Center,
            direction: Direction.Horizontal,
            children: [
              {
                type: whisper.WhisperComponentType.Box,
                alignment: Alignment.Left,
                direction: Direction.Vertical,
                children: [
                  {
                    type: whisper.WhisperComponentType.Markdown,
                    body: `
**Header Left**

Some text on the left
`,
                  },
                  {
                    type: whisper.WhisperComponentType.TextInput,
                    label: 'Left Input',
                    onChange: (value) => {
                      console.debug(`Input value changed: ${value}`);
                    },
                  },
                ],
              },
              {
                type: whisper.WhisperComponentType.Box,
                alignment: Alignment.Right,
                direction: Direction.Vertical,
                children: [
                  {
                    type: whisper.WhisperComponentType.Markdown,
                    body: `
**Header Right**

Some text on the right
`,
                  },
                  {
                    type: whisper.WhisperComponentType.TextInput,
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
            type: whisper.WhisperComponentType.Box,
            alignment: Alignment.Left,
            direction: Direction.Horizontal,
            children: [
              {
                type: whisper.WhisperComponentType.Button,
                buttonStyle: ButtonStyle.Primary,
                label: 'Press if Rendered',
                onClick: () => {
                  form.close((error) => console.log(error));
                  resolve(true);
                },
              },
              {
                type: whisper.WhisperComponentType.Button,
                buttonStyle: ButtonStyle.Secondary,
                label: 'Press if NOT Rendered',
                onClick: () => {
                  form.close((error) => console.log(error));
                  reject(false);
                },
              },
            ],
          },
        ],
      });

      setTimeout(() => {
        form.close(() => {});
      }, 10000);
    } catch (error) {
      console.error(error);

      reject(error);
    }
  });

export const buttonWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var form: whisper.Whisper;
    const config: whisper.NewWhisper = {
      label: 'Button Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the correct button',
          type: whisper.WhisperComponentType.Markdown,
        },
        {
          alignment: whisper.Alignment.SpaceEvenly,
          direction: whisper.Direction.Horizontal,
          children: [
            {
              buttonStyle: whisper.ButtonStyle.Secondary,
              label: `Don't click me`,
              onClick: () => console.debug(`Why'd you do that?`),
              type: whisper.WhisperComponentType.Button,
              size: whisper.ButtonSize.Large,
            },
            {
              buttonStyle: whisper.ButtonStyle.Text,
              label: `Me neither`,
              onClick: () => console.debug(`Why'd you do that?`),
              type: whisper.WhisperComponentType.Button,
              size: whisper.ButtonSize.Small,
            },
            {
              label: `Click me`,
              onClick: () => {
                form.close((error) => console.error(error));
                resolve(true);
              },
              type: whisper.WhisperComponentType.Button,
            },
          ],
          type: whisper.WhisperComponentType.Box,
        },
        {
          alignment: whisper.Alignment.SpaceEvenly,
          direction: whisper.Direction.Horizontal,
          children: [
            {
              label: `Disabled Primary`,
              disabled: true,
              onClick: () => {
                form.close((error) => console.error(error));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: whisper.WhisperComponentType.Button,
              size: whisper.ButtonSize.Large,
            },
            {
              label: `Disabled Secondary`,
              buttonStyle: whisper.ButtonStyle.Secondary,
              disabled: true,
              onClick: () => {
                form.close((error) => console.error(error));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: whisper.WhisperComponentType.Button,
              size: whisper.ButtonSize.Large,
            },
            {
              label: `Disabled Text`,
              buttonStyle: whisper.ButtonStyle.Text,
              disabled: true,
              onClick: () => {
                form.close((error) => console.error(error));
                reject(new Error(`Shouldn't be able to click disabled button`));
              },
              type: whisper.WhisperComponentType.Button,
              size: whisper.ButtonSize.Large,
            },
          ],
          type: whisper.WhisperComponentType.Box,
        },
      ],
    };

    whisper.create(config).then((whisper: whisper.Whisper) => (form = whisper));
  });

export const linkWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const config: whisper.NewWhisper = {
      label: 'External Link Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: 'Click the link below',
          type: whisper.WhisperComponentType.Markdown,
        },
        {
          type: whisper.WhisperComponentType.Link,
          textAlign: whisper.TextAlign.Left,
          href: 'https://www.google.com',
          text: 'https://www.google.com',
          style: whisper.Urgency.None,
        },
      ],
    };

    whisper.create(config).then((form: whisper.Whisper) => {
      setTimeout(() => {
        form.close((error) => console.error(error));
        resolve(true);
      }, 5000);
    });
  });

export const listPairWhisperCopyableValue = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const copyableText = 'Click me to copy the value text';
    const config: whisper.NewWhisper = {
      label: 'List Pair Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: whisper.WhisperComponentType.ListPair,
          label: 'I am Mr. Label',
          value: copyableText,
          copyable: true,
          style: Urgency.None,
        },
      ],
    };
    whisper.create(config).then((form: whisper.Whisper) => {
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
    const config: whisper.NewWhisper = {
      label: 'List Pair Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          type: whisper.WhisperComponentType.ListPair,
          label: copyableText,
          value: 'I am Mr. Value',
          labelCopyable: true,
          copyable: false,
          style: Urgency.None,
        },
      ],
    };

    whisper.create(config).then((form: whisper.Whisper) => {
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

// TODO: This requires a submit button at some point
export const simpleFormWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var form: whisper.Whisper;
    const config: whisper.NewWhisper = {
      label: 'Link Test',
      onClose: () => {
        console.debug('closed');
      },
      components: [
        {
          body: `Enter in 'Stonks' in the field`,
          type: whisper.WhisperComponentType.Markdown,
        },
        {
          label: `What can't you explain?`,
          onChange: (error, value) => {
            if (value === 'Stonks') {
              form.close((error) => console.error(error));
              resolve(true);
            }
          },
          tooltip: 'Stonks?',
          value: '',
          type: whisper.WhisperComponentType.TextInput,
        },
      ],
    };

    whisper.create(config).then((whisper: whisper.Whisper) => (form = whisper));
  });

export const numberInputs = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var form: whisper.Whisper;
    const config: whisper.NewWhisper = {
      label: 'Number Test',
      components: [
        {
          type: whisper.WhisperComponentType.Number,
          label: 'No min, max 10, step 1',
          max: 10,
          step: 1,
          tooltip: 'A tooltip',
          onChange: (newValue) => console.log(`New number: ${newValue}`),
        },
        {
          type: whisper.WhisperComponentType.Number,
          label: 'No optional fields',
          onChange: (newValue) => console.log(`New number: ${newValue}`),
        },
        {
          type: whisper.WhisperComponentType.Number,
          label: 'All optional fields',
          value: 0,
          min: 0,
          max: 10,
          step: 1,
          tooltip: 'A tooltip',
          onChange: (newValue) => console.log(`New number: ${newValue}`),
        },
        {
          type: whisper.WhisperComponentType.Telephone,
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
    whisper.create(config).then((whisper: whisper.Whisper) => {
      form = whisper;
      setTimeout(() => {
        form.close((error) => console.error(error));
        resolve(true);
      }, 5000);
    });
  });

export const testNetworkAndListComponents = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
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

        const config: whisper.NewWhisper = {
          label: 'Latest FDA Food Recall',
          onClose: () => {
            console.debug('closed');
          },
          components: [
            {
              body: recallItem.product_description,
              header: recallItem.recalling_firm,
              style: whisper.Urgency.None,
              type: whisper.WhisperComponentType.Message,
            },
            {
              type: whisper.WhisperComponentType.Divider,
            },
            {
              copyable: true,
              label: 'Reason',
              style: whisper.Urgency.None,
              type: whisper.WhisperComponentType.ListPair,
              value: recallItem.reason_for_recall,
            },
            {
              copyable: true,
              label: 'Distribution',
              style: whisper.Urgency.None,
              type: whisper.WhisperComponentType.ListPair,
              value: recallItem.distribution_pattern,
            },
            {
              copyable: true,
              label: 'Quantity',
              style: whisper.Urgency.None,
              type: whisper.WhisperComponentType.ListPair,
              value: recallItem.product_quantity,
            },
            {
              copyable: true,
              label: 'Codes',
              style: whisper.Urgency.None,
              type: whisper.WhisperComponentType.ListPair,
              value: recallItem.code_info,
            },
            {
              label: 'Expand',
              open: false,
              children: [
                {
                  copyable: true,
                  label: 'Recall Type',
                  style: whisper.Urgency.None,
                  type: whisper.WhisperComponentType.ListPair,
                  value: recallItem.voluntary_mandated,
                },
                {
                  copyable: true,
                  label: 'Product type',
                  style: whisper.Urgency.None,
                  type: whisper.WhisperComponentType.ListPair,
                  value: recallItem.product_type,
                },
                {
                  copyable: true,
                  label: 'Classification',
                  style: whisper.Urgency.None,
                  type: whisper.WhisperComponentType.ListPair,
                  value: recallItem.classification,
                },
              ],
              type: whisper.WhisperComponentType.CollapseBox,
            },
          ],
        };

        whisper.create(config).then((form: whisper.Whisper) => {
          setTimeout(() => {
            form.close((error) => console.error(error));
            resolve(true);
          }, 2000);
        });
      });
  });

export const initialValueSelectAndRadioWhispers = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const config: whisper.NewWhisper = {
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
          type: whisper.WhisperComponentType.Select,
          selected: 2,
          tooltip: 'Select a color tooltip',
        },
        {
          onSelect: (selected) => {
            console.log(`${selected} has been selected!`);
          },
          options: ['dog', 'cat', 'snake'],
          selected: 1,
          type: whisper.WhisperComponentType.RadioGroup,
        },
      ],
    };

    whisper.create(config).then((form: whisper.Whisper) => {
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
          ``;
          console.debug('whisper closed');
        },
        components: [
          {
            type: whisper.WhisperComponentType.Markdown,
            body: `Hover to see tooltip`,
            tooltip: 'Tooltip for Markdown',
          },
          {
            type: whisper.WhisperComponentType.Message,
            header: 'Message Header',
            body: `Hover to see tooltip`,
            style: Urgency.Success,
            tooltip: 'Tooltip for Message',
            textAlign: whisper.TextAlign.Left,
          },
          {
            type: whisper.WhisperComponentType.Button,
            label: 'Hover to see tooltip',
            onClick: () => {},
            tooltip: 'Tooltip for Button',
            disabled: true,
          },
          {
            type: whisper.WhisperComponentType.Markdown,
            body: `
# Are all tooltips rendered?
`,
          },
          {
            type: whisper.WhisperComponentType.Box,
            alignment: Alignment.Left,
            direction: Direction.Horizontal,
            children: [
              {
                type: whisper.WhisperComponentType.Button,
                label: 'Yes',
                onClick: (error, whisper) => {
                  if (error) {
                    console.error(error);
                    whisper.close(() => {});
                    reject(error);
                  }
                  whisper.close(() => {});
                  resolve(true);
                },
              },
              {
                type: whisper.WhisperComponentType.Button,
                label: 'No',
                onClick: (error, whisper) => {
                  if (error) {
                    console.error(error);
                    whisper.close(() => {});
                    reject(error);
                  }
                  whisper.close(() => {});
                  reject(new Error('Tooltips were not correctly rendered'));
                },
              },
            ],
          },
        ],
      });

      setTimeout(() => {
        createdWhisper.close(() => {});
      }, 20000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
