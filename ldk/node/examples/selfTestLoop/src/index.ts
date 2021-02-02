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
          'Keyboard Service',
          this.keyboardService,
        );
        // const loopTest2 = new LoopTest('Failing Test', this.fail);
        const suite = new TestSuite([loopTest1], logger);
        suite.start(host).then(() => {
          logger.debug('Done!');
        });
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  keyboardService(host: HostServices): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const hotkeys = {
        key: 'a',
        modifiers: {
          ctrl: true,
        },
      };

      if (typeof host !== 'undefined') {
        try {
          host.whisper.markdownWhisper({
            markdown: 'Press Ctrl+A to test the hotkey functionality.',
            label: 'Keyboard Test',
          });
          host.keyboard.streamHotKey(hotkeys, (error, response) => {
            if (error) {
              reject(error);
            }
            logger.info(
              'Hotkeys pressed',
              'response',
              JSON.stringify(response),
            );
            resolve(true);
          });
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }
  /* this.host.keyboard.streamHotKey(hotkeys, (error, response) => {
        logger.info(
          'Hotkeys pressed',
          'response',
          JSON.stringify(response),
        );
        this.host.whisper.markdownWhisper(
          {
            markdown: 'Submit',
            label: 'Cancel',
          }
          (e, input) => {
            if (e !== null) {
              logger.error('Error in FDA form submit', e);
            }
  
            if (typeof input === 'undefined') {
              // Do nothing
              return;
            }
  
            const updateEvent = input as WhisperFormUpdateEvent;
            const submitEvent = input as WhisperFormSubmitEvent;
  
            if (updateEvent.type === 'update') {
              logger.info('Update detected', updateEvent.key);
            } else if (submitEvent.type === 'submit') {
              logger.info('Submit detected');
              logger.info(JSON.stringify(submitEvent));
            } else {
              logger.info('IDK what happened');
            }
  
            logger.info(
              'FDA input keys',
              Object.keys(submitEvent).toString(),
            );
  
            if (typeof submitEvent.outputs === 'undefined') {
              logger.info('FDA outputs do not exist');
              return;
            }
  
            logger.info(
              'FDA Keys',
              Object.keys(submitEvent.outputs).toString(),
            ); 
          },
        );
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }


    logger.info('passing test...');
  }

  /* const hotkeys = {
    key: 'a',
    modifiers: {
      ctrl: true,
    },
  };

  try {
    this.host.keyboard.streamHotKey(hotkeys, (error, response) => {
      logger.info(
        'Food recall event started',
        'response',
        JSON.stringify(response),
      );
      this.host.whisper.formWhisper(
        {
          submitButton: 'Submit',
          cancelButton: 'Cancel',
          label: 'CDC Media Lookup',
          markdown: 'The hotkey worked',
          inputs: {
            topic: {
              type: 'text',
              value: '',
              label: 'Topic',
              tooltip: 'Enter a topic, like "Coronavirus"',
              order: 1,
            },
          },
        },
        (e, input) => {
          if (e !== null) {
            logger.error('Error in FDA form submit', e);
          }

          if (typeof input === 'undefined') {
            // Do nothing
            return;
          }

          const updateEvent = input as WhisperFormUpdateEvent;
          const submitEvent = input as WhisperFormSubmitEvent;

          if (updateEvent.type === 'update') {
            logger.info('Update detected', updateEvent.key);
          } else if (submitEvent.type === 'submit') {
            logger.info('Submit detected');
            logger.info(JSON.stringify(submitEvent));
          } else {
            logger.info('IDK what happened');
          }

          logger.info(
            'FDA input keys',
            Object.keys(submitEvent).toString(),
          );

          if (typeof submitEvent.outputs === 'undefined') {
            logger.info('FDA outputs do not exist');
            return;
          }

          logger.info(
            'FDA Keys',
            Object.keys(submitEvent.outputs).toString(),
          ); 
        },
      );
    });
  } catch (e) {
    logger.error('Error Streaming', 'error', e.toString());
  } */

  fail(): void {
    throw new Error('This test is supposed to fail');
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
