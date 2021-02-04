import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/hostClients/stoppables';
import TestSuite from './testingFixtures/testSuite';
import { LoopTest } from './testingFixtures/loopTest';

const logger = new Logger('olive-helps-node-example-clipboard');

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  private timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
    // Do nothing
  }, 600000);

  start(host: HostServices): void {
    this._host = host;
    logger.info('Starting Self Test...');
    clearTimeout(this.timeout);
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
          const names = [
            'Clipboard Service - Write And Query Test',
            // 'Whispser Service - Confirm Whisper',
            'Whisper Service - Form Whisper',
            'Keyboard Service - Hotkey Test',
            'Keyboard Service - Char Stream Test',
            'Keyboard Service - Char Test',
            // 'Keyboard Service - Char Scancode Test',
            'Cursor Service - Position Test',
            'Cursor Service - Stream Position Test',
            // 'File Service - Query File Directory',
            // 'File Service - Stream File Info',
          ];
          const functions = [
            this.clipboardWriteAndQuery,
            // this.confirmWhisper,
            this.formWhisper,
            this.hotkeyTest,
            this.charStreamTest,
            this.charTest,
            // this.charScancodeTest,
            this.cursorPosition,
            this.streamCursorPosition,
            // this.queryFileDirectory,
            // this.streamFileInfo,
          ];
          const loops = [];
          for (let i = 0; i < names.length; i += 1) {
            loops.push(new LoopTest(names[i], functions[i]));
          }

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
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Testing writeClipboard and queryKeyboard',
            label: 'Clipboard write and read',
          });
          this.timeout = setTimeout(() => {
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
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
                  prompt.stop();
                  resolve(true);
                }, 1000);
              } else {
                prompt.stop();
                reject(new Error('Incorrect value detected'));
              }
            })
            .catch((error) => {
              reject(new Error(error));
            });
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
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

      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Press Ctrl+A to test the hotkey functionality.',
            label: 'Hotkey Test',
          });
          const hotkeyStream = host.keyboard.streamHotKey(
            hotkeys,
            (error, response) => {
              if (error) {
                reject(error);
              }
              logger.debug(
                'Hotkey pressed',
                'response',
                JSON.stringify(response),
              );
              resolve(true);
              clearTimeout(this.timeout);
              prompt.stop();
              hotkeyStream.stop();
            },
          );
          this.timeout = setTimeout(() => {
            prompt.stop();
            hotkeyStream.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  charTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Type the letter "F"',
            label: 'Char Test',
          });
          const characterStream = host.keyboard.streamChar(
            (error, response) => {
              if (error) {
                reject(error);
              }

              if (typeof response !== 'undefined') {
                logger.debug('Character pressed', 'response', response.text);

                if (response.text === 'f' || response.text === 'F') {
                  resolve(true);
                  prompt.stop();
                  characterStream.stop();
                }
              }
            },
          );
          this.timeout = setTimeout(() => {
            prompt.stop();
            characterStream.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  charStreamTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Type the word "Olive"',
            label: 'Char Stream Test',
          });
          const characterStream = host.keyboard.streamText(
            (error, response) => {
              if (error) {
                reject(error);
              }

              if (typeof response !== 'undefined') {
                logger.debug(
                  'Characters pressed',
                  'response',
                  response.toString(),
                );

                if (response.toString() === 'Olive') {
                  resolve(true);
                  prompt.stop();
                  characterStream.stop();
                }
              }
            },
          );
          this.timeout = setTimeout(() => {
            prompt.stop();
            characterStream.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  charScancodeTest(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Looking for scancodes... (This one should fail for now)',
            label: 'Char Scancode Test',
          });
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
          this.timeout = setTimeout(() => {
            prompt.stop();
            characterStream.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  cursorPosition(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Querying cursor position...',
            label: 'Cursor position',
          });
          this.timeout = setTimeout(() => {
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
          host.cursor
            .queryCursorPosition()
            .then((response) => {
              logger.debug(`Cursor X - ${response.x}`);
              logger.debug(`Cursor Y - ${response.y}`);
              // Screen not supported for now
              // logger.info(`Screen - ${response.screen}`);
              clearTimeout(this.timeout);
              setTimeout(() => {
                prompt.stop();
                resolve(true);
              }, 1500);
            })
            .catch((err) => {
              reject(new Error(err));
            });
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  streamCursorPosition(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          let i = 0;
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Streaming cursor position. Please move cursor',
            label: 'Stream cursor position',
          });
          this.timeout = setTimeout(() => {
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);
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
                  prompt.stop();
                  cursorPoritionStream.stop();
                  clearTimeout(this.timeout);
                  resolve(true);
                }
              }
            },
          );
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  queryFileDirectory(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Querying root directory to look for "go.mod"...',
            label: 'Query File',
          });
          this.timeout = setTimeout(() => {
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 10000);

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
                  prompt.stop();
                  clearTimeout(this.timeout);
                  resolve(true);
                }
              }

              /* prompt.stop();
              clearTimeout(this.timeout);
              reject(new Error('Could not find go.mod file')); */
            })
            .catch((error) => {
              reject(new Error(error));
            });
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  streamFileInfo(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            markdown: 'Monitoring for file changes...',
            label: 'Stream File Info',
          });
          // TODO: Need to adjust time when this works
          this.timeout = setTimeout(() => {
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, 5000);

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
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  confirmWhisper(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          host.whisper
            .confirmWhisper({
              rejectButton: "Don't Click me",
              resolveButton: 'Click me',
              markdown: 'Please click the correct button',
              label: 'Test accept',
            })
            .promise()
            .then(() => {
              clearTimeout(this.timeout);
              resolve(true);
            })
            .catch(() => {
              clearTimeout(this.timeout);
              reject(new Error('Button click was not correct'));
            });

          this.timeout = setTimeout(() => {
            reject(new Error('Timeout - Too much time has passed'));
          }, 20000);
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  formWhisper(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          host.whisper
            .formWhisper({
              rejectButton: "Don't Click me",
              resolveButton: 'Click me',
              markdown: 'Please click the correct button',
              label: 'Test accept',
            })
            .promise()
            .then(() => {
              clearTimeout(this.timeout);
              resolve(true);
            })
            .catch(() => {
              clearTimeout(this.timeout);
              reject(new Error('Button click was not correct'));
            });

          this.timeout = setTimeout(() => {
            reject(new Error('Timeout - Too much time has passed'));
          }, 20000);
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
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
