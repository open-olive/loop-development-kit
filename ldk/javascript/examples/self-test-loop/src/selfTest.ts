import { keyboard, whisper } from '@oliveai/ldk';

import TestSuite from './testingFixtures/testSuite';
import TestGroup from './testingFixtures/testGroup';
import { LoopTest } from './testingFixtures/loopTest';

import {
  activeWindowTest,
  allWindowTest,
  buttonWhisper,
  charTest,
  charStreamTest,
  clipboardStream,
  clipboardWriteAndQuery,
  cursorPosition,
  hotkeyTest,
  linkWhisper,
  listenActiveWindowTest,
  processStream,
  processQuery,
  simpleFormWhisper,
  streamCursorPosition,
  testClickableWhisper,
  vaultReadWrite,
  testNetworkAndListComponents,
  queryDirectory,
  createAndDeleteFile,
  uiSearchTest,
  updateAndReadFile,
  listenFile,
} from './tests';

const testConfig: { [key: string]: any } = {
  clipboard: new TestGroup('Cliboard Aptitude', [
    new LoopTest(
      'Clipboard Aptitude - Write And Query Test',
      clipboardWriteAndQuery,
      10000,
      'Copying value to clipboard and reading it back',
    ),
    new LoopTest(
      'Clipboard Aptitude - Clipboard Stream',
      clipboardStream,
      10000,
      'Copying the value "LDKThxBai" the the clipboard',
    ),
  ]),
  cursor: new TestGroup('Cursor Aptitude', [
    new LoopTest(
      'Cursor Aptitude - Position Test',
      cursorPosition,
      10000,
      'Querying cursor position...',
    ),
    new LoopTest(
      'Cursor Aptitude - Stream Position Test',
      streamCursorPosition,
      10000,
      'Move your cursor around...',
    ),
  ]),
  keyboard: new TestGroup('Keyboard Aptitude', [
    new LoopTest(
      'Keyboard Aptitude - Hotkey Test',
      hotkeyTest,
      10000,
      'Press Ctrl+A to test the hotkey functionality.',
    ),
    new LoopTest(
      'Keyboard Aptitude - Char Stream Test',
      charStreamTest,
      10000,
      'Type the word "Olive"',
    ),
    new LoopTest(
      'Keyboard Aptitude - Char Test',
      charTest,
      10000,
      'Type the letter "F" to pay respects...and test the individual character test',
    ),
  ]),
  process: new TestGroup('Process Aptitude', [
    new LoopTest(
      'Process Aptitude - Query processes',
      processQuery,
      10000,
      'Querying what processes are running on the computer...',
    ),
    new LoopTest(
      'Process Aptitude - Stream processes',
      processStream,
      10000,
      'Streaming info on what processes are running on the computer...',
    ),
  ]),
  ui: new TestGroup('UI Aptitude', [
    new LoopTest(
      'UI Aptitude - Listen Search',
      uiSearchTest,
      10000,
      'Click the magnifying lens at the top of the panel and search "for life"',
    ),
  ]),
  vault: new TestGroup('Vault Aptitude', [
    new LoopTest(
      'Vault Aptitude - Write / Read from vault',
      vaultReadWrite,
      10000,
      'Writing value to vault then reading it back.',
    ),
  ]),
  whispers: new TestGroup('Whisper Aptitude', [
    new LoopTest(
      'Whispser Aptitude - Internal Links',
      testClickableWhisper,
      10000,
      'Click the 5th option',
    ),
    new LoopTest(
      'Whispser Aptitude - External Links',
      linkWhisper,
      10000,
      'Click the link in the whisper',
    ),
    new LoopTest(
      'Whispser Aptitude - Network and List Items',
      testNetworkAndListComponents,
      5000,
      'No action required',
    ),
    new LoopTest(
      'Whispser Aptitude - Button Whisper',
      buttonWhisper,
      10000,
      'Click the 3rd button',
    ),
    new LoopTest(
      'Whispser Aptitude - Simple Form Whisper',
      simpleFormWhisper,
      10000,
      `Enter 'Stonks into the field`,
    ),
  ]),
  window: new TestGroup('Window Aptitude', [
    new LoopTest(
      'Window Aptitude - Active Window Test',
      activeWindowTest,
      10000,
      'Make window active...',
    ),
    new LoopTest(
      'Window Aptitude - All Window Test',
      allWindowTest,
      10000,
      'Getting all windows...',
    ),
    new LoopTest(
      'Window Aptitude - Listen Active Window Test',
      listenActiveWindowTest,
      10000,
      'Listening to active windows, please change active window...',
    ),
  ]),
  file: new TestGroup('File Aptitude', [
    new LoopTest(
      'File Aptitude - Query File Directory',
      queryDirectory,
      10000,
      'Querying root directory to look for "go.mod"...',
    ),
    new LoopTest(
      'File Aptitude - Create and Delete File',
      createAndDeleteFile,
      10000,
      'Trying to create then delete "test.txt"',
    ),
    new LoopTest(
      'File Aptitude - Update and read a file',
      updateAndReadFile,
      15000,
      'Trying to create, update, then read the text in "test.txt" before deleting',
    ),
    new LoopTest(
      'File Aptitude - Listen File',
      listenFile,
      10000,
      'Monitoring for file changes...',
    ),
  ]),
};

/* import {
  charTest,
  charStreamTest,
  clipboardStream,
  windowTest,
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
  vaultReadWrite,
  streamCursorPosition,
  streamFileInfo,
  updateAndReadFile,
} from './tests';

const testConfig: { [key: string]: any } = {
  window: new TestGroup('Window Aptitude', [
    new LoopTest('Window Aptitude - Active Window Test', windowTest, 10000, 'Make window active...'),
  ]),
  file: new TestGroup('File Aptitude', [
    new LoopTest(
      'File Aptitude - Query File Directory',
      queryFileDirectory,
      10000,
      'Querying root directory to look for "go.mod"...',
    ),
    new LoopTest(
      'File Aptitude - Create and Delete File',
      createAndDeleteFile,
      10000,
      'Trying to create then delete "test.txt"',
    ),
    new LoopTest(
      'File Aptitude - Update and read a file',
      updateAndReadFile,
      15000,
      'Trying to create, update, then read the text in "test.txt" before deleting',
    ),
    new LoopTest(
      'File Aptitude - Stream File Info',
      this.streamFileInfo,
      10000,
      'Monitoring for file changes...',
    ),
  ]),
  keyboard: new TestGroup('Keyboard Aptitude', [
    new LoopTest(
      'Keyboard Aptitude - Hotkey Test',
      hotkeyTest,
      10000,
      'Press Ctrl+A to test the hotkey functionality.',
    ),
    new LoopTest(
      'Keyboard Aptitude - Char Stream Test',
      charStreamTest,
      10000,
      'Type the word "Olive"',
    ),
    new LoopTest(
      'Keyboard Aptitude - Char Test',
      charTest,
      10000,
      'Type the letter "F" to pay respects...and test the individual character test',
    ),
  ]),
  whispers: new TestGroup('Whisper Aptitude', [
    new LoopTest(
      'Whispser Aptitude - Confirm Whisper',
      confirmWhisper,
      10000,
      'Click the resolve button',
    ),
    new LoopTest(
      'Whisper Aptitude - Form Whisper',
      formWhisper,
      10000,
      'Type in "Stonks" and submit',
    ),
    new LoopTest(
      'Whisper Aptitude - List Whisper',
      networkAndListWhisper,
      20000,
      'Opening list whisper. In 10 seconds, this whisper will be dismissed',
    ),
    new LoopTest(
      'Whisper Aptitude - Disambiguation Whisper',
      disambiguationWhisper,
      20000,
      'Click the 3rd link',
    ),
  ]),
}; */

export default class SelfTestLoop {
  start() {
    console.log('Starting Self Test...');
    const hotkeys = {
      key: '/',
      control: true,
    };

    try {
      this.openTestGroups();
      keyboard.listenHotkey(hotkeys, (pressed: boolean) => {
        if (pressed) {
          this.openTestGroups();
        }
      });
    } catch (e) {
      console.log('Error Streaming', 'error', e.toString());
    }
  }

  openTestGroups(): void {
    let allTests = [] as LoopTest[];
    const clickableElements: any[] = [];
    // eslint-disable-next-line
    for (const config in testConfig) {
      clickableElements.push();
    }
    const keys = Object.keys(testConfig);
    for (let i = 0; i < keys.length; i += 1) {
      const group: TestGroup = testConfig[keys[i]];
      clickableElements.push({
        type: whisper.WhisperComponentType.Link,
        textAlign: whisper.TextAlign.Left,
        onClick: () => {
          const suite = new TestSuite(group.getTests());
          suite.start().then(() => {
            console.log('🎉 Group Done!');
            const prompt = whisper.create({
              label: 'Testing Complete',
              onClose: () => {
                console.log('');
              },
              components: [
                {
                  body: `All tests for ${group.getId()} have been run`,
                  type: whisper.WhisperComponentType.Markdown,
                },
              ],
            });
            setTimeout(() => {
              // prompt.stop();
            }, 5000);
          });
        },
        text: `---${group.getId()}`,
        style: whisper.Urgency.None,
      });
      allTests = allTests.concat(testConfig[keys[i]].getTests());
    }

    clickableElements.push({
      type: whisper.WhisperComponentType.Link,
      textAlign: whisper.TextAlign.Left,
      onClick: () => {
        const suite = new TestSuite(allTests);

        suite.start().then(() => {
          console.info('🎉 Done!');
          const prompt = whisper.create({
            label: 'Testing Complete',
            onClose: () => {
              console.log('');
            },
            components: [
              {
                body: 'All tests have been run',
                type: whisper.WhisperComponentType.Markdown,
              },
            ],
          });
          setTimeout(() => {
            // prompt.stop();
          }, 5000);
        });
      },
      text: 'Run All Tests',
      style: whisper.Urgency.None,
    });

    whisper.create({
      label: 'Self Test Loop',
      onClose: () => {
        console.log('closed Self Test whisper');
      },
      components: clickableElements,
    });
  }
}
