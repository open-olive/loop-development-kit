import moment from 'moment';

import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/hostClients/stoppables';
import TestSuite from './testingFixtures/testSuite';
import { LoopTest } from './testingFixtures/loopTest';
import {
  WhisperListStyle,
  WhisperListAlign,
  WhisperFormSubmitEvent,
  WhisperFormUpdateEvent,
  WhisperDisambiguationElements,
} from '../../../dist/hostClients/whisperService';

const logger = new Logger('olive-helps-node-example-clipboard');

export interface Element {
  [key: string]: WhisperDisambiguationElements;
}

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(host: HostServices): void {
    this._host = host;
    logger.info('Starting Self Test...');
    try {
      const initial = this.host.whisper.markdownWhisper({
        markdown: 'Copy the word "LDKThxBai" to your clipboard to begin',
        label: 'Begin Test',
      });
      this.host.clipboard.streamClipboard((error, response) => {
        if (error) {
          logger.error(error);
        } else if (
          typeof response !== 'undefined' &&
          response.toString() === 'LDKThxBai'
        ) {
          initial.stop();
          const loops = [
            new LoopTest(
              'Clipboard Service - Write And Query Test',
              this.clipboardWriteAndQuery,
              10000,
              'Copying value to clipboard and reading it back',
            ),
            /*            
            new LoopTest(
              'Whispser Service - Confirm Whisper',
              this.confirmWhisper,
              10000,
              'Click the resolve button',
            ),
            new LoopTest(
              'Whispser Service - Form Whisper',
              this.formWhisper,
              10000,
              'Type in "Stonks" and submit',
            ),
            */
            new LoopTest(
              'Whisper Service - List Whisper',
              this.networkAndListWhisper,
              20000,
              'Opening list whisper. In 10 seconds, this whisper will be dismissed',
            ),
            new LoopTest(
              'Whisper Service - Disambiguation Whisper',
              this.disambiguationWhisper,
              20000,
              'Click the 3rd link',
            ),
            new LoopTest(
              'Keyboard Service - Hotkey Test',
              this.hotkeyTest,
              10000,
              'Press Ctrl+A to test the hotkey functionality.',
            ),
            new LoopTest(
              'Keyboard Service - Char Stream Test',
              this.charStreamTest,
              10000,
              'Type the word "Olive"',
            ),
            new LoopTest(
              'Keyboard Service - Char Test',
              this.charTest,
              10000,
              'Type the letter "F"',
            ),
            /*
            new LoopTest(
              'Keyboard Service - Char Scancode Test',
              this.charTest,
              10000,
              'Type the letter "F"',
            ),
            */
            new LoopTest(
              'Cursor Service - Position Test',
              this.cursorPosition,
              10000,
              'Querying cursor position...',
            ),
            new LoopTest(
              'Cursor Service - Stream Position Test',
              this.streamCursorPosition,
              10000,
              'Move your cursor around...',
            ),
            /* new LoopTest(
              'File Service - Query File Directory',
              this.queryFileDirectory,
              10000,
              'Querying root directory to look for "go.mod"...',
            ),
            /*
            new LoopTest(
              'File Service - Stream File Info',
              this.streamFileInfo,
              10000,
              'Monitoring for file changes...',
            ),
            */
          ];

          const suite = new TestSuite(loops, logger);

          suite.start(host).then(() => {
            logger.info('🎉 Done!');
            const prompt = this.host.whisper.markdownWhisper({
              markdown: 'All tests have been run',
              label: 'Testing Complete',
            });
            setTimeout(() => {
              prompt.stop();
            }, 5000);
          });
        }
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  clipboardWriteAndQuery(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      host.clipboard
        .writeClipboard('Im in yr loop, writing to yr clipboard')
        .then(() => host.clipboard.queryClipboard())
        .then((response) => {
          logger.debug(`Value in clipboard - ${response}`);
          if (
            response.toString() === 'Im in yr loop, writing to yr clipboard'
          ) {
            logger.debug('Correct value in clipboard');
            setTimeout(() => {
              resolve(true);
            }, 1000);
          } else {
            reject(new Error('Incorrect value detected'));
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  hotkeyTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const hotkeys = {
        key: 'a',
        modifiers: {
          ctrl: true,
        },
      };

      const hotkeyStream = host.keyboard.streamHotKey(
        hotkeys,
        (error, response) => {
          if (error) {
            reject(error);
          }
          logger.debug('Hotkey pressed', 'response', JSON.stringify(response));
          resolve(true);
          hotkeyStream.stop();
        },
      );
    });
  }

  charTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
  }

  charStreamTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
  }

  charScancodeTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const characterStream = host.keyboard.streamScanCode(
        (error, response) => {
          if (error) {
            reject(error);
          }

          if (typeof response !== 'undefined') {
            logger.debug(
              'Scancode detected',
              'response',
              response.scanCode.toString(),
            );

            /* if (response.toString() === 'Olive') {
                  resolve(true);
                  prompt.stop();
                  characterStream.stop();
                } */
          }
        },
      );
    });
  }

  cursorPosition(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      host.cursor
        .queryCursorPosition()
        .then((response) => {
          logger.debug(`Cursor X - ${response.x}`);
          logger.debug(`Cursor Y - ${response.y}`);
          // Screen not supported for now
          // logger.info(`Screen - ${response.screen}`);
          setTimeout(() => {
            resolve(true);
          }, 1500);
        })
        .catch((err) => {
          reject(new Error(err));
        });
    });
  }

  streamCursorPosition(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const cursorPoritionStream = host.cursor.streamCursorPosition(
        (error, response) => {
          if (error) {
            reject(error);
          }

          if (typeof response !== 'undefined') {
            logger.debug(`Cursor Stream X - ${response.x}`);
            logger.debug(`Cursor Stream Y - ${response.y}`);
            i += 1;

            if (i >= 5) {
              cursorPoritionStream.stop();
              resolve(true);
            }
          }
        },
      );
    });
  }

  queryFileDirectory(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Queries the sidekick
      host.fileSystem
        .queryDirectory({
          directory: './',
        })
        .then((response) => {
          for (let i = 0; i < response.files.length; i += 1) {
            if (
              response.files[i].name === 'go.mod' &&
              !response.files[i].isDir
            ) {
              resolve(true);
            }
          }
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  streamFileInfo(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
  }

  confirmWhisper(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
  }

  formWhisper(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const firstForm = host.whisper.formWhisper(
        {
          submitButton: 'Submit',
          cancelButton: 'Cancel',
          label: 'Form Whisper Test',
          markdown: 'Type in the value "Stonks"',
          inputs: {
            topic: {
              type: 'text',
              value: '',
              label: 'What can you not explain?',
              tooltip: '',
              order: 1,
            },
          },
        },
        (e, response) => {
          if (e !== null) {
            logger.error('Error in form whisper submit', e);
          }

          if (typeof response === 'undefined') {
            // Do nothing
            return;
          }

          const updateEvent = response as WhisperFormUpdateEvent;
          const submitEvent = response as WhisperFormSubmitEvent;

          if (updateEvent.type === 'update') {
            logger.info(JSON.stringify(updateEvent));
          } else if (submitEvent.type === 'submit') {
            logger.info('Submit detected');
            logger.info(JSON.stringify(submitEvent));
          }
        },
      );
    });
  }

  networkAndListWhisper(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const now = moment();
      const url = `https://api.fda.gov/food/enforcement.json?search=report_date:[${now
        .subtract(3, 'months')
        .startOf('month')
        .format('YYYYMMDD')}+TO+${now
        .endOf('month')
        .format('YYYYMMDD')}]&limit=1`;

      logger.debug('Network call succeeded, emmitting list whisper', url);

      host.network
        .httpRequest({
          url,
          method: 'GET',
          body: '',
        })
        .then((response) => {
          const { results } = JSON.parse(
            Buffer.from(response.data).toString('utf8'),
          );
          const [recallItem] = results;

          const list = host.whisper.listWhisper({
            label: 'Latest FDA Food Recall',
            markdown:
              'If this whisper works, it will disappear after 20 seconds',
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
  }

  disambiguationWhisper(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
          markdown: 'Click the 3rd link',
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
    });
  }

  stop(): void {
    logger.info('Stopping');
    this.clipboardStream?.stop();
    this.clipboardStream = undefined;
    this._host = undefined;
    process.exit(0);
  }

  private get host(): HostServices {
    if (this._host == null) {
      throw new Error('Cannot Retrieve Host Before Set');
    }
    return this._host;
  }
}

const loop = new ClipboardLoop();
serveLoop(loop);
