import { LoopSensors, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/loopClients/stoppables';

const logger = new Logger('olive-helps-node-example-clipboard');

class ClipboardLoop implements Loop {
  private _sensors: LoopSensors | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(sensors: LoopSensors): void {
    this._sensors = sensors;
    logger.info('Requesting Stream');
    try {
      this.sensors.clipboard.streamClipboard(async (error, response) => {
        if (response !== 'fileinfo') {
          return;
        }
        this.workFile().catch((e) => {
          logger.error('Received Error', 'error', e);
        });
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  async workFile(): Promise<void> {
    logger.debug('Opening File');
    const file = this.sensors.fileSystem.openFile('/tmp/log.txt');
    logger.debug('Getting File');
    const fileInfo = await file.info();
    logger.debug('Received File', 'info', JSON.stringify(fileInfo));
    this.sensors.whisper.markdownWhisper({
      label: 'File Info',
      markdown: JSON.stringify(fileInfo),
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    await file.close();
    logger.debug('File Closed');
  }

  stop(): void {
    logger.info('Stopping');
    this.clipboardStream?.stop();
    this.clipboardStream = undefined;
    this._sensors = undefined;
    process.exit(0);
  }

  private get sensors(): LoopSensors {
    if (this._sensors == null) {
      throw new Error('Cannot Retrieve Sensors Before Set');
    }
    return this._sensors;
  }
}

const loop = new ClipboardLoop();
serveLoop(loop);
