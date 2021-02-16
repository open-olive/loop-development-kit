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
// import formConfig from './formConfig';

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

    try {
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
            logger.info('update Occurred');
            logger.info(JSON.stringify(updateEvent));
          } else if (submitEvent.type === 'submit' && submitEvent.submitted) {
            logger.info('submit occurred');
            logger.info(JSON.stringify(submitEvent));
            // form.stop();
          } else {
            logger.info('???');
          }
        });
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
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
