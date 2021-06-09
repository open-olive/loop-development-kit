import {
  clipboard,
  cursor,
  keyboard,
  network,
  process,
  vault,
  whisper,
  window,
  user,
  ui,
  filesystem,
} from '@oliveai/ldk';

import { Cancellable } from '@oliveai/ldk/dist/cancellable';
import { Alignment, Direction, ButtonStyle } from '@oliveai/ldk/dist/whisper';
import * as testUtils from '../testUtils';

let testFolderPath: string;

async function createFolder(path: string): Promise<void> {
  if (!(await filesystem.exists(path))) {
    const writeMode = 0o755;
    await filesystem.makeDir(path, writeMode);
  }
}

async function getTestFolderPath(): Promise<string> {
  if (!testFolderPath) {
    const path = 'test_dir';
    await createFolder(path);
    testFolderPath = path;
  }

  return testFolderPath;
}

export const clipboardWriteAndQuery = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const string = 'Im in yr loop, writing to yr clipboard';
    clipboard
      .write(string)
      .then(() => {
        clipboard.read().then((response) => {
          if (response === string) {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          } else {
            reject(new Error('Incorrect value detected'));
          }
        });
      })
      .catch((e) => {
        reject(e);
      });
  });

export const clipboardStream = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var clipboardStream: Cancellable;
    clipboard
      .listen(true, (response) => {
        if (response === 'LDKThxBai') {
          clipboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (clipboardStream = cancellable));
  });

export const cursorPosition = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    cursor
      .position()
      .then((response) => {
        console.debug(`Cursor X - ${response.x}`);
        console.debug(`Cursor Y - ${response.y}`);
        setTimeout(() => {
          resolve(true);
        }, 1500);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });

export const streamCursorPosition = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let i = 0;
    var cursorPositionStream: Cancellable;
    cursor
      .listenPosition((response) => {
        if (typeof response !== 'undefined') {
          console.debug(`Cursor Stream X - ${response.x}`);
          console.debug(`Cursor Stream Y - ${response.y}`);
          i += 1;

          if (i >= 5) {
            cursorPositionStream.cancel();
            resolve(true);
          }
        }
      })
      .then((cancellable: Cancellable) => (cursorPositionStream = cancellable));
  });

export const listenActiveWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var activeWindowStream: Cancellable;
    window
      .listenActiveWindow((response) => {
        if (response) {
          console.debug('Window become active', 'response', response.title);
          activeWindowStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (activeWindowStream = cancellable));
  });

export const activeWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .activeWindow()
      .then((windowInfo) => {
        console.debug(windowInfo.height);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const allWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .all()
      .then((allWindows) => {
        console.debug(allWindows.length);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const processQuery = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    process
      .all()
      .then((processList) => {
        console.debug(JSON.stringify(processList[0].pid));
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const processStream = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var processStream: Cancellable;
    process
      .listenAll((response) => {
        console.debug(response.processInfo.pid);
        processStream.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => (processStream = cancellable));
  });

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
    } catch (error) {
      console.error(error);

      reject(error);
    }
  });

export const vaultReadWrite = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const value = 'Do I exist?';
    vault.write('testKey', value).then(() => {
      vault
        .exists('testKey')
        .then((exists) => {
          console.debug(`Value exists in vault: ${exists}`);
          if (!exists) {
            reject(new Error('Key does not exist in storage'));
            return null;
          }

          return vault.read('testKey');
        })
        .then((vaultValue) => {
          console.debug(`Value in vault: ${vaultValue}`);
          if (vaultValue !== value) {
            reject(new Error('Stored value does not match initial value'));
            return null;
          }

          return vault.remove('testKey');
        })
        .then(() => {
          console.debug(`Value deleted from vault`);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

export const queryDirectory = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const dirPath = `${await getTestFolderPath()}`;
    const writeMode = 0o755;
    await filesystem.writeFile({
      path: `${dirPath}/file.json`,
      data: new Uint8Array([102, 85]),
      writeOperation: filesystem.WriteOperation.overwrite,
      writeMode: writeMode,
    });
    filesystem
      .dir(dirPath)
      .then((response) => {
        for (let i = 0; i < response.length; i += 1) {
          if (response[i].name === 'file.json' && !response[i].isDir) {
            setTimeout(() => {
              resolve(true);
            }, 1500);
          }
        }
      })
      .catch((error) => {
        setTimeout(() => {
          reject(error);
        }, 1500);
      })
      .finally(async () => {
        await filesystem.remove(`${dirPath}/file.json`);
      });
  });

export const createAndDeleteFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test.txt`;
    const writeMode = 0o755;

    network
      .encode('some text')
      .then((encodedValue) => {
        setTimeout(() => {
          filesystem
            .writeFile({
              path: filePath,
              data: encodedValue,
              writeOperation: filesystem.WriteOperation.overwrite,
              writeMode: writeMode,
            })
            .then(() => {
              filesystem
                .remove(filePath)
                .then(() => {
                  setTimeout(() => {
                    resolve(true);
                  }, 1500);
                })
                .catch((error) => {
                  setTimeout(() => {
                    reject(error);
                  }, 1500);
                });
            })
            .catch((error) => {
              console.error('write file failed');
              reject(error);
            });
        }, 500);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateAndReadFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const testString = 'Im in yr loop, writing to yr clipboard';
    const filePath = `${await getTestFolderPath()}/test.txt`;
    const writeMode = 0o755;

    setTimeout(() => {
      network
        .encode(testString)
        .then((encodedValue) => {
          filesystem
            .writeFile({
              path: filePath,
              data: encodedValue,
              writeOperation: filesystem.WriteOperation.overwrite,
              writeMode: writeMode,
            })
            .then(() => {
              console.debug('Write successful');
              console.debug(encodedValue);

              filesystem
                .readFile(filePath)
                .then((readEncodedValue) => {
                  console.debug(readEncodedValue);
                  network
                    .decode(readEncodedValue)
                    .then((decodedText) => {
                      console.debug(decodedText);
                      if (decodedText === testString) {
                        resolve(true);
                      } else {
                        reject(new Error('File contents were incorrect'));
                      }
                    })
                    .catch((error) => {
                      reject(error);
                    });
                })
                .catch((error) => {
                  reject(error);
                })
                .finally(() => {
                  filesystem.remove(filePath);
                });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    }, 1000);
  });

export const listenFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenFile.txt`;
    const writeMode = 0o755;
    console.info('listening to file changes');
    let listenFileCancelable: Cancellable;

    setTimeout(() => {
      reject(new Error('ListenFile test didnt passed within allowed timeframe'));
    }, 3000);

    filesystem
      .writeFile({
        path: filePath,
        data: new Uint8Array(),
        writeOperation: filesystem.WriteOperation.overwrite,
        writeMode: writeMode,
      })
      .then(() => {
        console.debug('Write file for listening successful');
        filesystem
          .listenFile(filePath, async (response) => {
            if (response) {
              console.debug('Received file action: ' + response.action);
              console.debug(`${response.info.modTime}`);

              listenFileCancelable.cancel();
              await filesystem.remove(filePath);
              resolve(true);
            } else {
              reject(new Error('File info is not received'));
            }
          })
          .then((cancellable: Cancellable) => {
            listenFileCancelable = cancellable;
            console.debug('writing file we listen to');
            network
              .encode('Listen to file text')
              .then((encodedValue) => {
                filesystem
                  .writeFile({
                    path: filePath,
                    data: encodedValue,
                    writeOperation: filesystem.WriteOperation.append,
                    writeMode: writeMode,
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const listenDir = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenDir.txt`;
    const dirPath = `${await getTestFolderPath()}`;
    const writeMode = 0o755;
    let listenDirCancellable: Cancellable;
    console.info('listening to directory changes');

    setTimeout(() => {
      reject(new Error('ListenDir test did not pass within allowed timeframe'));
    }, 3000);

    console.debug('Write file for listening successful');
    filesystem
      .listenDir(dirPath, async (response) => {
        if (response) {
          console.info(`Received file action in directory: ${response.action}`);
          console.info(`${response.info.modTime}`);

          listenDirCancellable.cancel();
          await filesystem.remove(filePath);
          resolve(true);
        } else {
          reject(new Error('File action is not received'));
        }
      })
      .then((cancellable) => {
        listenDirCancellable = cancellable;
        console.info('writing file we listen to');
        network
          .encode('Listen to dir text')
          .then((encodedValue) => {
            filesystem
              .writeFile({
                path: filePath,
                data: encodedValue,
                writeOperation: filesystem.WriteOperation.overwrite,
                writeMode: writeMode,
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const dirExists = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const destination = `${await getTestFolderPath()}/test-tmp-dir`;
    const writeMode = 0o755;
    filesystem.makeDir(destination, writeMode).then(() => {
      filesystem.exists(destination).then((exists) => {
        filesystem.remove(destination);
        if (exists === true) {
          resolve(true);
        }
        reject('Could not check if directory exists');
      });
    });
  });

export const fileExists = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenDir.txt`;
    const writeMode = 0o755;
    network.encode('some file text').then((encodedValue) => {
      filesystem
        .writeFile({
          path: filePath,
          data: encodedValue,
          writeOperation: filesystem.WriteOperation.overwrite,
          writeMode: writeMode,
        })
        .then(() => {
          filesystem.exists(filePath).then((exists) => {
            filesystem.remove(filePath);
            if (exists === true) {
              resolve(true);
            }
            reject('Could not check if directory exists');
          });
        })
        .catch((error) => {
          reject(error);
        });
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
        console.debug('Network call succeeded, emmitting list whisper', url);
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

export const networkHTTPS = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url =
      'https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1';

    setTimeout(() => {
      reject(new Error('Network http request did not finish in the appropriate timespan.'));
    }, 5000);

    network
      .httpRequest({
        url,
        method: 'GET',
      })
      .then((response: network.HTTPResponse) => {
        if (response.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error('Network http request failed with code: ' + response.statusCode));
        }
      })
      .catch((e) => {
        console.debug(JSON.stringify(e));
        reject(e);
      });
  });

export const networkHTTP = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url = 'http://catalog.data.gov/api/3/';
    setTimeout(() => {
      reject(new Error('Network http request did not finish in the appropriate timespan.'));
    }, 5000);

    network
      .httpRequest({
        url,
        method: 'GET',
      })
      .then(() => {
        reject(new Error('Should not have succeeded'));
      })
      .catch(() => {
        resolve(true);
      });
  });

export const networkWebSocket = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url = 'wss://html5rocks.websocket.org/echo';
    const testData = new Uint8Array([53, 6, 6, 65, 20, 74, 65, 78, 74]);
    const testText = 'some text';
    let textTestPassed = false;
    let binaryTestPassed = false;

    setTimeout(() => {
      reject(new Error('Network websocket test did not finish in the appropriate timespan.'));
    }, 20000);

    const socketConfiguration: network.SocketConfiguration = {
      url: url,
      useCompression: true,
    };

    try {
      console.debug('Stating websocket connect');
      const socket = await network.webSocketConnect(socketConfiguration);
      console.debug('Websocket successfully connected');
      socket.setCloseHandler((error, code, text) => {
        if (error) {
          console.error(`OnCloseHandler received error:`);
          console.error(error);

          return;
        }

        console.info(`Received on close code: ${code}. ${text}`);
      });
      const cancellable: Cancellable = await socket.setMessageHandler(async (error, message) => {
        if (error) {
          console.error(error);

          return;
        }
        if (message) {
          if (typeof message === 'string') {
            if (message === testText) {
              console.debug(`Received text data`);
              textTestPassed = true;
              if (binaryTestPassed) {
                resolve(true);
                await testUtils.finalizeWebsocketTest(cancellable, socket);
              }
            }
          } else {
            if (JSON.stringify(message) === JSON.stringify(testData)) {
              console.debug(`Received binary data`);
              binaryTestPassed = true;
              if (textTestPassed) {
                resolve(true);
                await testUtils.finalizeWebsocketTest(cancellable, socket);
              }
            }
          }
        }
      });
      // send text
      await socket.writeMessage(testText);
      // send binary
      await socket.writeMessage(testData);
    } catch (error) {
      console.error(`Error received while testing websocket: ${error.message}`);
      reject(error);
    }
  });

export const charTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var keyboardStream: Cancellable;
    keyboard
      .listenCharacter((char) => {
        console.debug('Character pressed', 'response', char);
        if (char === 'f' || char === 'F') {
          keyboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (keyboardStream = cancellable));
  });

export const charStreamTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var keyboardStream: Cancellable;
    keyboard
      .listenText((text) => {
        console.debug('Characters pressed', 'response', text);
        if (text === 'Olive') {
          keyboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (keyboardStream = cancellable));
  });

export const hotkeyTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const hotkeys = {
      key: 'a',
      control: true,
    };

    var keyboardStream: Cancellable;
    keyboard
      .listenHotkey(hotkeys, (pressed) => {
        console.debug('Hotkey pressed', 'response', pressed);
        keyboardStream.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => (keyboardStream = cancellable));
  });

export const userJWTTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt().then((token) => {
      if (token) {
        console.debug('jwt', token);
        resolve(true);
      } else {
        reject('JWT should not have been empty');
      }
    });
  });

export const uiSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var uiStream: Cancellable;
    ui.listenSearchbar((value) => {
      if (value.toLowerCase() === 'for life') {
        uiStream.cancel();
        resolve(true);
      }
    }).then((cancellable: Cancellable) => (uiStream = cancellable));
  });

export const uiGlobalSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var uiStream: Cancellable;
    ui.listenGlobalSearch((value) => {
      if (value.toLowerCase() === 'for meaning') {
        uiStream.cancel();
        resolve(true);
      }
    }).then((cancellable: Cancellable) => (uiStream = cancellable));
  });

/*
export const formWhisper = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    host.whisper.formWhisper(
      {
        submitButton: 'Submit',
        cancelButton: 'Cancel',
        label: 'Form Whisper Test',
        markdown: 'Type in the value "Stonks"',
        inputs: {
          topic: {
            type: 'text',
            value: 'Blah',
            label: 'What can you not explain?',
            tooltip: '',
            order: 1,
          },
          radioButton: {
            type: 'radio',
            value: 'red',
            label: 'Please select color',
            options: ["green", "red", "blue"],
            tooltip: '',
            order: 2,
          },
          selectDropDown: {
            type: 'select',
            value: 'red',
            label: 'Please select color',
            options: ["green", "red", "blue"],
            tooltip: '',
            order: 3,
          },
        },
      },
      (e, response) => {
        // TODO: calling stop here seems to break things, unsure why
        if (e !== null) {
          // form.stop();
          reject(e);
        }

        if (typeof response === 'undefined') {
          // form.stop();
          reject(new Error('Form response is undefined'));
        }

        const updateEvent = response as WhisperFormUpdateEvent;
        const submitEvent = response as WhisperFormSubmitEvent;

        if (updateEvent.type === 'update') {
          logger.debug(JSON.stringify(updateEvent));
        } else if (
          submitEvent.type === 'submit' &&
          submitEvent.submitted &&
          submitEvent.outputs.topic === 'Stonks'
        ) {
          logger.debug(JSON.stringify(submitEvent));
          // form.stop();
          resolve(true);
        }
      },
    );
  });

  */
