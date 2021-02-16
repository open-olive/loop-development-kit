import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import { StoppableStream } from '../../../dist/hostClients/stoppables';
import TestSuite from './testingFixtures/testSuite';
import TestGroup from './testingFixtures/testGroup';
import { LoopTest } from './testingFixtures/loopTest';
import { WhisperDisambiguationElements } from '../../../dist/hostClients/whisperService';

import {
  charTest,
  charScancodeTest,
  charStreamTest,
  clipboardStream,
  clipboardWriteAndQuery,
  confirmWhisper,
  createAndDeleteFile,
  cursorPosition,
  disambiguationWhisper,
  formWhisper,
  hotkeyTest,
  networkAndListWhisper,
  processQuery,
  queryFileDirectory,
  storageWriteRead,
  streamCursorPosition,
  streamFileInfo,
  updateAndReadFile,
} from './tests';

export interface Element {
  [key: string]: WhisperDisambiguationElements;
}
const logger = new Logger('node-self-test-loop');

const testConfig: { [key: string]: any } = {
  clipboard: new TestGroup('Cliboard Service', [
    new LoopTest(
      'Clipboard Service - Write And Query Test',
      clipboardWriteAndQuery,
      10000,
      'Copying value to clipboard and reading it back',
    ),
    new LoopTest(
      'Clipboard Service - Clipboard Stream',
      clipboardStream,
      10000,
      'Copying the value "LDKThxBai" the the clipboard',
    ),
  ]),
  cursor: new TestGroup('Cursor Service', [
    new LoopTest(
      'Cursor Service - Position Test',
      cursorPosition,
      10000,
      'Querying cursor position...',
    ),
    new LoopTest(
      'Cursor Service - Stream Position Test',
      streamCursorPosition,
      10000,
      'Move your cursor around...',
    ),
  ]),
  file: new TestGroup('File Service', [
    new LoopTest(
      'File Service - Query File Directory',
      queryFileDirectory,
      10000,
      'Querying root directory to look for "go.mod"...',
    ),
    new LoopTest(
      'File Service - Create and Delete File',
      createAndDeleteFile,
      10000,
      'Trying to create then delete "test.txt"',
    ),
    new LoopTest(
      'File Service - Update and read a file',
      updateAndReadFile,
      15000,
      'Trying to create, update, then read the text in "test.txt" before deleting',
    ),
    /* new LoopTest(
      'File Service - Stream File Info',
      this.streamFileInfo,
      10000,
      'Monitoring for file changes...',
    ),
    */
  ]),
  keyboard: new TestGroup('Keyboard Service', [
    new LoopTest(
      'Keyboard Service - Hotkey Test',
      hotkeyTest,
      10000,
      'Press Ctrl+A to test the hotkey functionality.',
    ),
    new LoopTest(
      'Keyboard Service - Char Stream Test',
      charStreamTest,
      10000,
      'Type the word "Olive"',
    ),
    new LoopTest(
      'Keyboard Service - Char Test',
      charTest,
      10000,
      'Type the letter "F" to pay respects...and test the individual character test',
    ),
    /*
    new LoopTest(
      'Keyboard Service - Char Scancode Test',
      this.charTest,
      10000,
      'Type the letter "F"',
    ),
    */
  ]),
  process: new TestGroup('Process Service', [
    new LoopTest(
      'Process Service - Query processes',
      processQuery,
      10000,
      'Querying what processes are running on the computer...',
    ),
  ]),
  storage: new TestGroup('Storage Service', [
    new LoopTest(
      'Storage Service - Write / Read from storage',
      storageWriteRead,
      10000,
      'Writing value to storage then reading it back.',
    ),
    /* new LoopTest(
      'Keyboard Service - Hotkey Test',
      hotkeyTest,
      10000,
      'Press Ctrl+A to test the hotkey functionality.',
    ), */
  ]),
  whispers: new TestGroup('Whisper Service', [
    /*            
    new LoopTest(
      'Whispser Service - Confirm Whisper',
      this.confirmWhisper,
      10000,
      'Click the resolve button',
    ), */
    new LoopTest(
      'Whispser Service - Form Whisper',
      formWhisper,
      10000,
      'Type in "Stonks" and submit',
    ),
    new LoopTest(
      'Whisper Service - List Whisper',
      networkAndListWhisper,
      20000,
      'Opening list whisper. In 10 seconds, this whisper will be dismissed',
    ),
    new LoopTest(
      'Whisper Service - Disambiguation Whisper',
      disambiguationWhisper,
      20000,
      'Click the 3rd link',
    ),
  ]),
};

class ClipboardLoop implements Loop {
  private _host: HostServices | undefined;

  private clipboardStream: StoppableStream<string> | undefined;

  start(host: HostServices): void {
    this._host = host;
    logger.info('Starting Self Test...');
    /* this.simplified().then(() => {
      logger.info('test executed');
    }); */
    const hotkeys = {
      key: '/',
      modifiers: {
        ctrl: true,
      },
    };

    try {
      this.openTestGroups(this.host);
      this.host.keyboard.streamHotKey(hotkeys, (error, response) => {
        if (error) {
          logger.error('Something is wrong with the hotkey sensor');
          logger.error(error);
        } else {
          this.openTestGroups(this.host);
        }
      });
    } catch (e) {
      logger.error('Error Streaming', 'error', e.toString());
    }
  }

  openTestGroups(host: HostServices): void {
    let allTests = [] as LoopTest[];
    const elements = {} as Element;
    const keys = Object.keys(testConfig);
    for (let i = 0; i < keys.length; i += 1) {
      const group = testConfig[keys[i]];
      elements[keys[i]] = {
        label: `---${group.getId()}`,
        order: i + 1,
        type: 'option',
      };
      allTests = allTests.concat(testConfig[keys[i]].getTests());
    }

    elements.all = {
      label: `Run all tests`,
      order: keys.length + 1,
      type: 'option',
    };
    const whisper = host.whisper.disambiguationWhisper(
      {
        label: 'Self Test Loop groups',
        markdown: '',
        elements,
      },
      (error, response) => {
        if (error) {
          whisper.stop();
        }
        if (typeof response !== 'undefined' && response.key !== 'all') {
          const suite = new TestSuite(
            testConfig[response.key].getTests(),
            logger,
          );

          suite.start(host).then(() => {
            logger.info('🎉 Group Done!');
            const prompt = this.host.whisper.markdownWhisper({
              markdown: `All tests for ${testConfig[
                response.key
              ].getId()} have been run`,
              label: 'Testing Complete',
            });
            setTimeout(() => {
              prompt.stop();
            }, 5000);
          });

          whisper.stop();
        } else if (typeof response !== 'undefined' && response.key === 'all') {
          const suite = new TestSuite(allTests, logger);

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
          whisper.stop();
        }
      },
    );
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
