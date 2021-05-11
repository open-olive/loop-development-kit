import {
  clipboard,
  cursor,
  keyboard,
  network,
  process,
  vault,
  whisper,
  window,
  ui,
  filesystem,
} from '@oliveai/ldk';

import { Cancellable } from '@oliveai/ldk/dist/cancellable';

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
    clipboard.listen(true, (response) => {
      if (response === 'LDKThxBai') {
        resolve(true);
      }
    });
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
    const cursorPoritionStream = cursor.listenPosition((response) => {
      if (typeof response !== 'undefined') {
        console.debug(`Cursor Stream X - ${response.x}`);
        console.debug(`Cursor Stream Y - ${response.y}`);
        i += 1;

        if (i >= 5) {
          // cursorPoritionStream.stop();
          resolve(true);
        }
      }
    });
  });

export const listenActiveWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window.listenActiveWindow((response) => {
      if (response) {
        console.debug('Window become active', 'response', response.title);
        resolve(true);
      }
    });
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
    process.listenAll((response) => {
      console.debug(response.processInfo.pid);
      resolve(true);
    });
  });

export const testClickableWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    whisper.create({
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
            resolve(true);
          },
          text: `Option 5`,
          style: whisper.Urgency.None,
        },
      ],
    });
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
            reject(new Error('Key does not exist in storge'));
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
  new Promise((resolve, reject) => {
    filesystem
      .dir('./')
      .then((response) => {
        for (let i = 0; i < response.length; i += 1) {
          if (response[i].name === 'go.mod' && !response[i].isDir) {
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
      });
  });

export const createAndDeleteFile = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const filePath = './test.txt';
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
              writeMode,
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
  new Promise((resolve, reject) => {
    const testString = 'Im in yr loop, writing to yr clipboard';
    const filePath = './test.txt';
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
              writeMode,
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
  new Promise((resolve, reject) => {
    const filePath = './test_listenFile.txt';
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
        writeMode,
      })
      .then(() => {
        console.debug('Write file for listening successful');
        filesystem
          .listenFile(filePath, async (response) => {
            if (response) {
              console.debug(`Received file action: ${response.action}`);
              console.debug(`${response.info.modTime}`);

              listenFileCancelable.cancel();
              await filesystem.remove(filePath);
              resolve(true);
            } else {
              reject(new Error('File info is not received'));
            }
          })
          .then((cancellable) => {
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
                    writeMode,
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
  new Promise((resolve, reject) => {
    const filePath = './test_listenDir.txt';
    const dirPath = './';
    const writeMode = 0o755;
    let listenDirCancellable: Cancellable;
    console.info('listening to directory changes');

    setTimeout(() => {
      reject(new Error('ListenDir test didnt passed within allowed timeframe'));
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
                writeMode,
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

export const testNetworkAndListComponents = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1`;

    network
      .httpRequest({
        url,
        method: 'GET',
        headers: { x: ['x'] },
        body: new Uint8Array(),
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
                  value: recallItem.calssification,
                },
              ],
              type: whisper.WhisperComponentType.CollapseBox,
            },
          ],
        };

        whisper.create(config).then(() => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        });
      });
  });

export const buttonWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
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
              onClick: () => resolve(true),
              type: whisper.WhisperComponentType.Button,
            },
          ],
          type: whisper.WhisperComponentType.Box,
        },
      ],
    };

    whisper.create(config);
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

    whisper.create(config).then(() => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
  });

// TODO: This requires a submit button at some point
export const simpleFormWhisper = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const config: whisper.NewWhisper = {
      label: 'Simple Form Test',
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
          onChange: (value) => {
            if (value === 'Stonks') {
              resolve(true);
            }
          },
          tooltip: 'Stonks?',
          value: '',
          type: whisper.WhisperComponentType.TextInput,
        },
      ],
    };

    whisper.create(config);
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
          onSelect: (selected) => {
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

    whisper.create(config).then(() => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
  });

export const numberInputs = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
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

    whisper.create(config).then(() => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
  });

export const networkHTTPS = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url =
      'https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1';

    setTimeout(() => {
      reject(new Error('Network http request didnt finished in the appropriate timespan.'));
    }, 5000);

    network
      .httpRequest({
        body: new Uint8Array(),
        url,
        method: 'GET',
        headers: {},
      })
      .then((response: network.HTTPResponse) => {
        if (response.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error(`Network http request failed with code: ${response.statusCode}`));
        }
      })
      .catch((e) => {
        reject(e);
      });
  });

export const networkHTTP = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url = 'http://catalog.data.gov/api/3/';
    setTimeout(() => {
      reject(new Error('Network http request didnt finished in the appropriate timespan.'));
    }, 5000);

    network
      .httpRequest({
        body: new Uint8Array(),
        url,
        method: 'GET',
        headers: {},
      })
      .then(() => {
        reject(new Error('Should not have succeeded'));
      })
      .catch(() => {
        resolve(true);
      });
  });

export const charTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    keyboard.listenCharacter((char) => {
      console.debug('Character pressed', 'response', char);
      if (char === 'f' || char === 'F') {
        resolve(true);
      }
    });
  });

export const charStreamTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    keyboard.listenText((text) => {
      console.debug('Characters pressed', 'response', text);
      if (text === 'Olive') {
        resolve(true);
      }
    });
  });

export const hotkeyTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const hotkeys = {
      key: 'a',
      control: true,
    };

    keyboard.listenHotkey(hotkeys, (pressed) => {
      console.debug('Hotkey pressed', 'response', pressed);
      resolve(true);
    });
  });

export const uiSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    ui.listenSearchbar((value) => {
      if (value.toLowerCase() === 'for life') {
        resolve(true);
      }
    });
  });

export const uiGlobalSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    ui.listenGlobalSearch((value) => {
      if (value.toLowerCase() === 'for meaning') {
        resolve(true);
      }
    });
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
