import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/hostClients/stoppables';
import TestSuite from './testingFixtures/testSuite';
import { LoopTest } from './testingFixtures/loopTest';

const logger = new Logger('olive-helps-node-example-clipboard');

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(host: HostServices): void {
    this._host = host;
    logger.info('Starting Self Test...');
    try {
      this.host.clipboard.streamClipboard((error, response) => {
        const loopTest1 = new LoopTest(
          'Keyboard Service - Hotkey Test',
          this.hotkeyTest,
        );
        const loopTest2 = new LoopTest(
          'Keyboard Service - Char Test',
          this.charTest,
        );
        const loopTest3 = new LoopTest(
          'Keyboard Service - Char Stream Test',
          this.charStreamTest,
        );
        const loopTest4 = new LoopTest(
          'Keyboard Service = Char Scancode Test',
          this.charScancodeTest,
        );

        const suite = new TestSuite(
          [loopTest1, loopTest3, loopTest2, loopTest4],
          logger,
        );

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
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
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
              prompt.stop();
              hotkeyStream.stop();
            },
          );
          setTimeout(() => {
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
            markdown: 'Type the word "Olive"',
            label: 'Char Scancode Test',
          });
          const characterStream = host.keyboard.streamScanCode(
            (error, response) => {
              if (error) {
                reject(error);
              }

              if (typeof response !== 'undefined') {
                logger.info(
                  'Characters pressed',
                  'response',
                  response.scanCode.toString(),
                );
                logger.info(
                  'Characters pressed',
                  'response',
                  response.direction.toString(),
                );

                /* if (response.toString() === 'Olive') {
                  resolve(true);
                  prompt.stop();
                  characterStream.stop();
                } */
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
