import { keyboard, whisper } from '@oliveai/ldk';

import TestSuite from './testingFixtures/testSuite';
import TestGroup from './testingFixtures/testGroup';
import { LoopTest } from './testingFixtures/loopTest';

import {
  activeWindowTest,
  allWindowTest,
  charTest,
  charStreamTest,
  clipboardStream,
  clipboardWriteAndQuery,
  cursorPosition,
  hotkeyTest,
  listenActiveWindowTest,
  networkHTTP,
  networkHTTPS,
  networkWebSocket,
  processStream,
  processQuery,
  streamCursorPosition,
  vaultReadWrite,
  queryDirectory,
  createAndDeleteFile,
  userJWTTest,
  uiSearchTest,
  uiGlobalSearchTest,
  updateAndReadFile,
  listenFile,
  listenDir,
  dirExists,
  fileExists,
} from './tests';

import {
  testBoxInTheBox,
  buttonWhisper,
  linkWhisper,
  numberInputs,
  testNetworkAndListComponents,
  listPairWhisperCopyableValue,
  listPairWhisperCopyableLabel,
  simpleFormWhisper,
  initialValueSelectAndRadioWhispers,
  testClickableWhisper,
  testMarkdownWhisper,
  tooltips,
} from './tests/whisper';
import { basicWhisperUpdate, updateCollapseState, updateOnChange } from './tests/whisper-update';

const testConfig: { [key: string]: TestGroup } = {
  clipboard: new TestGroup('Clipboard Aptitude', [
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
  network: new TestGroup('Network Aptitude', [
    new LoopTest(
      'Network Aptitude - HTTPS test',
      networkHTTPS,
      5000,
      'Calling a public HTTPS API. Should succeed.',
    ),
    new LoopTest(
      'Network Aptitude - HTTP test',
      networkHTTP,
      5000,
      'Calling a public HTTP API. Should fail',
    ),
    new LoopTest(
      'Network Aptitude - WebSocket test',
      networkWebSocket,
      20000,
      'Sending/receiving data to websocket should pass.',
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
    new LoopTest(
      'UI Aptitude - Listen Global Search',
      uiGlobalSearchTest,
      10000,
      'Press CMD + O and search "for meaning"',
    ),
  ]),
  user: new TestGroup('User Aptitude', [
    new LoopTest('User Aptitude - JWT', userJWTTest, 10000, 'No action required'),
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
      'Whisper Aptitude - Markdown whisper',
      testMarkdownWhisper,
      20000,
      'Did markdown rendered properly?',
    ),
    new LoopTest(
      'Whisper Aptitude - Internal Links',
      testClickableWhisper,
      10000,
      'Click the 5th option',
    ),
    new LoopTest(
      'Whisper Aptitude - Box in the box',
      testBoxInTheBox,
      10000,
      'Verify that box in the box rendered correctly',
    ),
    new LoopTest(
      'Whisper Aptitude - External Links',
      linkWhisper,
      10000,
      'Click the link in the whisper',
    ),
    new LoopTest(
      'Whisper Aptitude - Network and List Items',
      testNetworkAndListComponents,
      5000,
      'No action required',
    ),
    new LoopTest(
      'Whisper Aptitude - ListPair Copyable Value',
      listPairWhisperCopyableValue,
      10000,
      'Click the ListPair value to copy its text',
    ),
    new LoopTest(
      'Whisper Aptitude - ListPair Copyable Label',
      listPairWhisperCopyableLabel,
      10000,
      'Click the ListPair label to copy its text',
    ),
    new LoopTest('Whisper Aptitude - Button Whisper', buttonWhisper, 10000, 'Click the 3rd button'),
    new LoopTest(
      'Whisper Aptitude - Simple Form Whisper',
      simpleFormWhisper,
      10000,
      `Enter 'Stonks' into the field`,
    ),
    new LoopTest('Whisper Aptitude - Number Inputs', numberInputs, 10000, `No action required`),
    new LoopTest(
      'Whisper Aptitude - Initial Value for Select and Radio',
      initialValueSelectAndRadioWhispers,
      10000,
      `No action required`,
    ),
    new LoopTest(
      'Whisper Aptitude - multiple components tooltip test',
      tooltips,
      20000,
      `Hover on each component to see a tooltip`,
    ),
  ]),
  whisperUpdate: new TestGroup('Whisper Updates', [
    new LoopTest(
      'Whisper Update - Basic Whisper Update',
      basicWhisperUpdate,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - Collapse State Across Update',
      updateCollapseState,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - OnChange Across Update',
      updateOnChange,
      20000,
      `Did the whisper update correctly?`,
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
      'Querying root directory to look for newly created "file.json"...',
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
    new LoopTest('File Aptitude - Listen Dir', listenDir, 10000, 'Monitoring for dir change...'),
    new LoopTest(
      'File Aptitude - Dir Exists',
      dirExists,
      10000,
      'Checking for directory existence...',
    ),
    new LoopTest(
      'File Aptitude - File Exists',
      fileExists,
      10000,
      'Checking for file existence...',
    ),
  ]),
};

export default class SelfTestLoop {
  async start(): Promise<void> {
    console.log('Starting Self Test...');
    const hotkeys = {
      key: '/',
      control: true,
    };

    try {
      let testGroupsWhisper = await this.openTestGroups();
      keyboard.listenHotkey(hotkeys, async (pressed: boolean) => {
        if (pressed) {
          testGroupsWhisper.close((error) => console.log(error));
          testGroupsWhisper = await this.openTestGroups();
        }
      });
    } catch (e) {
      console.log('Error Streaming', 'error', e.toString());
    }
  }

  async openTestGroups(): Promise<whisper.Whisper> {
    let allTests = [] as LoopTest[];
    // eslint-disable-next-line
    const clickableElements: any[] = [];
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
            var form: whisper.Whisper;
            whisper
              .create({
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
              })
              .then((whisper: whisper.Whisper) => (form = whisper));
            setTimeout(() => {
              form.close((error) => console.error(error));
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
          var prompt: whisper.Whisper;
          whisper
            .create({
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
            })
            .then((whisper: whisper.Whisper) => (prompt = whisper));
          setTimeout(() => {
            prompt.close((error) => console.error(error));
          }, 5000);
        });
      },
      text: 'Run All Tests',
      style: whisper.Urgency.None,
    });

    return await whisper.create({
      label: 'Self Test Loop',
      onClose: () => {
        console.log('closed Self Test whisper');
      },
      components: clickableElements,
    });
  }
}
