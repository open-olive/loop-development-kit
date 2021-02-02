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
        const loopTest2 = new LoopTest('Failing Test', this.fail);
        const suite = new TestSuite([loopTest1, loopTest2], logger);
        suite.start();
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  keyboardService(): void {
    logger.info('passing test...');
  }

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
