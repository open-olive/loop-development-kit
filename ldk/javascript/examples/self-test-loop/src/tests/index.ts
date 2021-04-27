import { clipboard, cursor, network, process, vault, whisper, window } from '@oliveai/ldk';

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
      label: 'Markdown Options',
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

export const testNetworkAndListComponents = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1`;

    console.debug('Network call succeeded, emmitting list whisper', url);

    setTimeout(() => {
      resolve(true);
    }, 5000);

    network
      .httpRequest({
        url,
        method: 'GET',
        headers: { x: ['x'] },
        body: new Uint8Array(),
      })
      .then((response) => {
        const { data } = response;
        const { results } = JSON.parse(Buffer.from(response.data).toString('utf8'));
        const [recallItem] = results;

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
          ],
        };

        whisper.create(config);
      });
  });

/*
export const hotkeyTest = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const hotkeys = {
      key: 'a',
      modifiers: {
        ctrl: true,
      },
    };

    const hotkeyStream = host.keyboard.streamHotKey(hotkeys, (error, response) => {
      if (error) {
        reject(error);
      }
      logger.debug('Hotkey pressed', 'response', JSON.stringify(response));
      resolve(true);
      hotkeyStream.stop();
    });
  });

export const charTest = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const characterStream = host.keyboard.streamChar((error, response) => {
      if (error) {
        reject(error);
      }

      if (typeof response !== 'undefined') {
        logger.debug('Character pressed', 'response', response.text);

        if (response.text === 'f' || response.text === 'F') {
          resolve(true);
          characterStream.stop();
        }
      }
    });
  });

export const charStreamTest = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const characterStream = host.keyboard.streamText((error, response) => {
      if (error) {
        reject(error);
      }

      if (typeof response !== 'undefined') {
        logger.debug('Characters pressed', 'response', response.toString());

        if (response.toString() === 'Olive') {
          resolve(true);
          characterStream.stop();
        }
      }
    });
  });

export const queryFileDirectory = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    // Queries the sidekick
    host.fileSystem
      .queryDirectory({
        directory: './',
      })
      .then((response) => {
        for (let i = 0; i < response.files.length; i += 1) {
          if (response.files[i].name === 'go.mod' && !response.files[i].isDir) {
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

// TODO: create file needs to have a promise
export const createAndDeleteFile = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    host.fileSystem.createFile('./test.txt');
    setTimeout(() => {
      host.fileSystem
        .removeFile({ path: './test.txt' })
        .then((response) => {
          setTimeout(() => {
            resolve(true);
          }, 1500);
        })
        .catch((error) => {
          setTimeout(() => {
            reject(error);
          }, 1500);
        });
    }, 500);
  });

// TODO: create file needs to have a promise
export const updateAndReadFile = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const testString = 'Im in yr loop, writing to yr clipboard';
    const encodedMessage = encoder.encode(testString);

    // Create a new file
    host.fileSystem.createFile('./test.txt');

    // TODO: streamPromise does not work for create file
    // Open a file and encode a test string
    setTimeout(() => {
      // TODO: currently, can't write / read to files easily from same handle
      const fileHandle = host.fileSystem.openFile('./test.txt');
      let isCorrectContents = false;

      fileHandle
        .write(encodedMessage)
        .then((response) => {
          logger.debug('Write successful');
          // TODO: Something strange with the close function, hangs thread
          // fileHandle.close();

          const fileHandle2 = host.fileSystem.openFile('./test.txt');
          fileHandle2
            .read()
            .then((res) => {
              logger.debug(decoder.decode(res));
              if (decoder.decode(res) === testString) {
                isCorrectContents = true;
              }
              // fileHandle2.close();
              return host.fileSystem.removeFile({ path: './test.txt' });
            })
            .then((res) => {
              if (isCorrectContents) {
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
          fileHandle.close();
          reject(error);
        });
    }, 1000);
  });

export const streamFileInfo = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    // Queries the sidekick
    logger.info('listening to file changes');
    host.fileSystem.streamFileInfo(
      {
        file: './test.txt',
      },
      (error, response) => {
        if (error) {
          reject(new Error(error));
        }

        if (response) {
          logger.info(response.action);
          logger.info(`${response.file.updated?.toDateString()}`);
        }
      },
    );
  });

export const confirmWhisper = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    host.whisper
      .confirmWhisper({
        rejectButton: "Don't Click me",
        resolveButton: 'Click me',
        markdown: 'Please click the correct button',
        label: 'Test accept',
      })
      .promise()
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(new Error('Button click was not correct'));
      });
  });

export const processQuery = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    host.process
      .queryProcesses()
      .then((processList) => {
        logger.debug(JSON.stringify(processList.processes[0]));
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const processStream = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    host.process
      .queryProcesses()
      .then((processList) => {
        logger.debug(JSON.stringify(processList.processes[0]));
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });

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

export const networkAndListWhisper = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const now = moment();
    const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[${now
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYYMMDD')}+TO+${now.endOf('month').format('YYYYMMDD')}]&limit=1`;

    logger.debug('Network call succeeded, emmitting list whisper', url);

    host.network
      .httpRequest({
        url,
        method: 'GET',
        body: '',
      })
      .then((response) => {
        const { results } = JSON.parse(Buffer.from(response.data).toString('utf8'));
        const [recallItem] = results;

        const list = host.whisper.listWhisper({
          label: 'Latest FDA Food Recall',
          markdown: 'If this whisper works, it will disappear after 10 seconds',
          elements: {
            topMessage: {
              align: WhisperListAlign.LEFT,
              body: recallItem.product_description,
              header: recallItem.recalling_firm,
              order: 0,
              style: WhisperListStyle.NONE,
              type: 'message',
            },
            sectionDivider: {
              order: 1,
              type: 'divider',
            },
            reason: {
              value: recallItem.reason_for_recall,
              label: 'Reason',
              order: 2,
              type: 'pair',
            },
            distribution: {
              value: recallItem.distribution_pattern,
              label: 'Distribution',
              order: 3,
              type: 'pair',
            },
            quantity: {
              value: recallItem.product_quantity,
              label: 'Quantity',
              order: 4,
              type: 'pair',
            },
            codes: {
              extra: true,
              value: recallItem.code_info,
              label: 'Codes',
              order: 5,
              type: 'pair',
            },
            id: {
              extra: true,
              value: recallItem.recall_number,
              label: 'Recall number',
              order: 6,
              type: 'pair',
            },
            date: {
              extra: true,
              value: recallItem.recall_initiation_date,
              label: 'Date initiated',
              order: 7,
              type: 'pair',
            },
            recallType: {
              extra: true,
              value: recallItem.voluntary_mandated,
              label: 'Recall type',
              order: 8,
              type: 'pair',
            },
            type: {
              extra: true,
              value: recallItem.product_type,
              label: 'Product type',
              order: 9,
              type: 'pair',
            },
            classification: {
              extra: true,
              value: recallItem.classification,
              label: 'Classification',
              order: 10,
              type: 'pair',
            },
            address: {
              extra: true,
              value: `${recallItem.address_1} ${recallItem.address_2} ${recallItem.city}, ${recallItem.state} ${recallItem.postal_code} ${recallItem.country}`,
              label: 'Company address',
              order: 11,
              type: 'pair',
            },
            link: {
              align: WhisperListAlign.LEFT,
              href: url,
              order: 12,
              style: WhisperListStyle.NONE,
              text: 'Link to data',
              type: 'link',
            },
          },
        });
        setTimeout(() => {
          list.stop();
          resolve(true);
        }, 10000);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });

export const disambiguationWhisper = (host: HostServices): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const obj = {} as Element;
    for (let i = 1; i <= 5; i += 1) {
      const s = `value_${i}`;
      obj[s] = {
        label: `Link ${i}`,
        order: i,
        type: 'option',
      };
    }
    const whisper = host.whisper.disambiguationWhisper(
      {
        label: 'Disambiguation Whisper',
        markdown: 'Click the 3rd option',
        elements: obj,
      },
      (error, response) => {
        if (error) {
          whisper.stop();
          reject(new Error(error));
        }
        logger.debug(JSON.stringify(response));
        if (response?.key === 'value_3') {
          whisper.stop();
          resolve(true);
        }
      },
    );
  }); */
