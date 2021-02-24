import { Aptitudes, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/hostClients/stoppables';

const logger = new Logger('olive-helps-node-example-clipboard');

class ClipboardLoop implements Loop {
  private _aptitudes: Aptitudes | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(aptitudes: Aptitudes): void {
    this._aptitudes = aptitudes;
    logger.info('Requesting Stream');
    try {
      this.aptitudes.clipboard.streamClipboard(async (error, response) => {
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
    const file = this.aptitudes.fileSystem.openFile('/tmp/log.txt');
    logger.debug('Getting File');
    const fileInfo = await file.info();
    logger.debug('Received File', 'info', JSON.stringify(fileInfo));
    this.aptitudes.whisper.markdownWhisper({
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
    this._aptitudes = undefined;
    process.exit(0);
  }

  private get aptitudes(): Aptitudes {
    if (this._aptitudes == null) {
      throw new Error('Cannot retrieve Aptitudes before connection.');
    }
    return this._aptitudes;
  }
}

const loop = new ClipboardLoop();
serveLoop(loop);
