import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/hostClients/stoppables';

const logger = new Logger('olive-helps-node-example-clipboard');

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(host: HostServices): void {
    this._host = host;
    logger.info('Requesting Stream');
    try {
      this.host.clipboard.streamClipboard((error, response) => {
        logger.debug('Received clipboard text:', 'info', JSON.stringify(response));
        if (response !== 'fileinfo') {
          return;
        }
        this.workFile().catch((e) => {
          logger.error('Received Error', 'error', e);
        });
      }, true);
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  async workFile(): Promise<void> {
    logger.debug('Opening File');
    const file = this.host.fileSystem.openFile('/tmp/log.txt');
    logger.debug('Getting File');
    const fileInfo = await file.info();
    logger.debug('Received File', 'info', JSON.stringify(fileInfo));
    this.host.whisper.markdownWhisper({
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
