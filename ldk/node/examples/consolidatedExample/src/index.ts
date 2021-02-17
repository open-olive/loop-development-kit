import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import {
  WhisperListStyle,
  WhisperListAlign,
  WhisperFormSubmitEvent,
  WhisperFormUpdateEvent,
  WhisperDisambiguationElements,
} from '../../../dist/hostClients/whisperService';
import { StoppableStream } from '../../../dist/hostClients/stoppables';
import formConfig from './formConfig';

const logger = new Logger('olive-helps-node-example');

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(host: HostServices): void {
    this._host = host;
    logger.info('Requesting Stream');

    const hotkeys = {
      key: 'n',
      modifiers: {
        ctrl: true,
      },
    };
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    try {
      host.fileSystem.createFile('./data.txt');
      this.host.keyboard.streamHotKey(hotkeys, (error, keyboardResponse) => {
        if (error) {
          // Error found
        }

        const form = host.whisper.formWhisper(formConfig, (e, formResponse) => {
          if (e !== null) {
            // Error occured
          }

          if (typeof formResponse === 'undefined') {
            logger.info('Form response error');
          }

          const updateEvent = formResponse as WhisperFormUpdateEvent;
          const submitEvent = formResponse as WhisperFormSubmitEvent;

          if (updateEvent.type === 'update') {
            // do nothing for now
            // logger.info('update Occurred');
            // logger.info(JSON.stringify(updateEvent));
          } else if (submitEvent.type === 'submit' && submitEvent.submitted) {
            if (this.validateForm(submitEvent) && submitEvent.outputs.email) {
              const readHandle = host.fileSystem.openFile('./data.txt');

              readHandle
                .read()
                .then((fileContents) => {
                  const file = decoder.decode(fileContents);
                  logger.info(`${file === ''}`);
                  const fileObj = file === '' ? {} : JSON.parse(file);
                  fileObj[
                    submitEvent.outputs.email.toString()
                  ] = JSON.stringify(submitEvent.outputs);
                  logger.info(JSON.stringify(fileObj));

                  const writeHandle = host.fileSystem.openFile('./data.txt');
                  return writeHandle.write(
                    encoder.encode(JSON.stringify(fileObj)),
                  );
                })
                .then(() => {
                  logger.info('success');
                })
                .catch((err) => {
                  logger.error(err);
                });
            } else {
              logger.info('fail');
              host.whisper.markdownWhisper({
                label: 'There was an issue with the form data',
                markdown:
                  'Please make sure that DOB is in the format MM/DD/YYYY. Please retry data entry.',
              });
            }
          } else {
            logger.info('???');
          }
        });
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  validateForm(submitEvent: WhisperFormSubmitEvent): boolean {
    // TODO: Probably want to regex the email too.
    const dateRegex = new RegExp(
      '^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$',
    );

    return dateRegex.test(submitEvent.outputs.dob.toString());
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
