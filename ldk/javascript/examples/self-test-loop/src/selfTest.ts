import { keyboard, whisper } from '@oliveai/ldk';

import TestSuite from './testingFixtures/testSuite';
import TestGroup from './testingFixtures/testGroup';
import { LoopTest } from './testingFixtures/loopTest';

import * as clipboardTests from './tests/clipboard';
import * as cursorTests from './tests/cursor';
import * as filesystemTests from './tests/filesystem';
import * as keyboardTests from './tests/keyboard';
import * as networkTests from './tests/network';
import * as processTests from './tests/process';
import * as uiTests from './tests/ui';
import * as userTests from './tests/user';
import * as vaultTests from './tests/vault';
import * as whisperTests from './tests/whisper';
import * as whisperUpdateTests from './tests/whisper/whisper-update';
import * as windowTests from './tests/window';

const testConfig: { [key: string]: TestGroup } = {
  clipboard: new TestGroup('Clipboard Aptitude', [
    new LoopTest(
      'Clipboard Aptitude - Write And Query Test',
      clipboardTests.clipboardWriteAndQuery,
      10000,
      'Copying value to clipboard and reading it back',
    ),
    new LoopTest(
      'Clipboard Aptitude - Clipboard Stream',
      clipboardTests.clipboardStream,
      10000,
      'Copying the value "LDKThxBai" the the clipboard',
    ),
  ]),
  cursor: new TestGroup('Cursor Aptitude', [
    new LoopTest(
      'Cursor Aptitude - Position Test',
      cursorTests.cursorPosition,
      10000,
      'Querying cursor position...',
    ),
    new LoopTest(
      'Cursor Aptitude - Stream Position Test',
      cursorTests.streamCursorPosition,
      10000,
      'Move your cursor around...',
    ),
  ]),
  keyboard: new TestGroup('Keyboard Aptitude', [
    new LoopTest(
      'Keyboard Aptitude - Hotkey Test',
      keyboardTests.hotkeyTest,
      10000,
      'Press Ctrl+A to test the hotkey functionality.',
    ),
    new LoopTest(
      'Keyboard Aptitude - Char Stream Test',
      keyboardTests.charStreamTest,
      10000,
      'Type the word "Olive"',
    ),
    new LoopTest(
      'Keyboard Aptitude - Char Test',
      keyboardTests.charTest,
      10000,
      'Type the letter "F" to pay respects...and test the individual character test',
    ),
  ]),
  network: new TestGroup('Network Aptitude', [
    new LoopTest(
      'Network Aptitude - HTTPS test',
      networkTests.networkHTTPS,
      5000,
      'Calling a public HTTPS API. Should succeed.',
    ),
    new LoopTest(
      'Network Aptitude - HTTP test',
      networkTests.networkHTTP,
      5000,
      'Calling a public HTTP API. Should fail',
    ),
    new LoopTest(
      'Network Aptitude - WebSocket test',
      networkTests.networkWebSocket,
      20000,
      'Sending/receiving data to websocket should pass.',
    ),
  ]),
  process: new TestGroup('Process Aptitude', [
    new LoopTest(
      'Process Aptitude - Query processes',
      processTests.processQuery,
      10000,
      'Querying what processes are running on the computer...',
    ),
    new LoopTest(
      'Process Aptitude - Stream processes',
      processTests.processStream,
      10000,
      'Streaming info on what processes are running on the computer...',
    ),
  ]),
  ui: new TestGroup('UI Aptitude', [
    new LoopTest(
      'UI Aptitude - Listen Search',
      uiTests.uiSearchTest,
      10000,
      'Click the magnifying lens at the top of the panel and search "for life"',
    ),
    new LoopTest(
      'UI Aptitude - Listen Global Search',
      uiTests.uiGlobalSearchTest,
      10000,
      'Press CMD + O and search "for meaning"',
    ),
  ]),
  user: new TestGroup('User Aptitude', [
    new LoopTest('User Aptitude - JWT', userTests.userJWTTest, 10000, 'No action required'),
  ]),
  vault: new TestGroup('Vault Aptitude', [
    new LoopTest(
      'Vault Aptitude - Write / Read from vault',
      vaultTests.vaultReadWrite,
      10000,
      'Writing value to vault then reading it back.',
    ),
  ]),
  whispers: new TestGroup('Whisper Aptitude', [
    new LoopTest(
      'Whisper Aptitude - Markdown whisper',
      whisperTests.testMarkdownWhisper,
      20000,
      'Did markdown rendered properly?',
    ),
    new LoopTest(
      'Whisper Aptitude - Internal Links',
      whisperTests.testClickableWhisper,
      10000,
      'Click the 5th option',
    ),
    new LoopTest(
      'Whisper Aptitude - Box in the box',
      whisperTests.testBoxInTheBox,
      10000,
      'Verify that box in the box rendered correctly',
    ),
    new LoopTest(
      'Whisper Aptitude - External Links',
      whisperTests.linkWhisper,
      10000,
      'Click the link in the whisper',
    ),
    new LoopTest(
      'Whisper Aptitude - Network and List Items',
      whisperTests.testNetworkAndListComponents,
      5000,
      'No action required',
    ),
    new LoopTest(
      'Whisper Aptitude - Clickable Boxes',
      whisperTests.testClickableBox,
      10000,
      'Click the correct box',
    ),
    new LoopTest(
      'Whisper Aptitude - Nested Clickable Boxes',
      whisperTests.testClickableBoxNestingBoxes,
      10000,
      'Click the correct text',
    ),
    new LoopTest(
      'Whisper Aptitude - Nested Clickable Buttons',
      whisperTests.testClickableBoxNestingButtons,
      10000,
      'Click the button',
    ),
    new LoopTest(
      'Whisper Aptitude - Nested Clickable Links',
      whisperTests.testClickableBoxNestingLinks,
      10000,
      'Click the link',
    ),
    new LoopTest(
      'Whisper Aptitude - Button Whisper',
      whisperTests.buttonWhisper,
      10000,
      'Click the 3rd button',
    ),
    new LoopTest(
      'Whisper Aptitude - ListPair Copyable Value',
      whisperTests.listPairWhisperCopyableValue,
      10000,
      'Click the ListPair value to copy its text',
    ),
    new LoopTest(
      'Whisper Aptitude - ListPair Copyable Label',
      whisperTests.listPairWhisperCopyableLabel,
      10000,
      'Click the ListPair label to copy its text',
    ),
    new LoopTest(
      'Whisper Aptitude - Simple Form Whisper',
      whisperTests.simpleFormWhisper,
      10000,
      `Enter 'Stonks' into the field`,
    ),
    new LoopTest(
      'Whisper Aptitude - Number Inputs',
      whisperTests.numberInputs,
      10000,
      `No action required`,
    ),
    new LoopTest(
      'Whisper Aptitude - Initial Value for Select and Radio',
      whisperTests.initialValueSelectAndRadioWhispers,
      10000,
      `No action required`,
    ),
    new LoopTest(
      'Whisper Aptitude - multiple components tooltip test',
      whisperTests.tooltips,
      20000,
      `Hover on each component to see a tooltip`,
    ),
    new LoopTest(
      'Whisper Aptitude - onBlur test',
      whisperTests.onBlurTest,
      10000,
      `Focus on each field and exit out`,
    ),
    new LoopTest(
      'Whisper Aptitude - CollapseBox OnClick',
      whisperTests.collapseBoxOnClick,
      10000,
      'Click both CollapseBoxes',
    ),
  ]),
  whisperUpdate: new TestGroup('Whisper Updates', [
    new LoopTest(
      'Whisper Update - Basic Whisper Update',
      whisperUpdateTests.basicWhisperUpdate,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - Collapse State Across Update',
      whisperUpdateTests.updateCollapseState,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - OnChange Across Update',
      whisperUpdateTests.updateOnChange,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - Automated OnChange',
      whisperUpdateTests.whisperStateOnChange,
      5000,
      `Detecting changes across updates - No action needed.`,
    ),
  ]),
  window: new TestGroup('Window Aptitude', [
    new LoopTest(
      'Window Aptitude - Active Window Test',
      windowTests.activeWindowTest,
      10000,
      'Make window active...',
    ),
    new LoopTest(
      'Window Aptitude - All Window Test',
      windowTests.allWindowTest,
      10000,
      'Getting all windows...',
    ),
    new LoopTest(
      'Window Aptitude - Listen Active Window Test',
      windowTests.listenActiveWindowTest,
      10000,
      'Listening to active windows, please change active window...',
    ),
  ]),
  file: new TestGroup('File Aptitude', [
    new LoopTest(
      'File Aptitude - Query File Directory',
      filesystemTests.queryDirectory,
      10000,
      'Querying root directory to look for newly created "file.json"...',
    ),
    new LoopTest(
      'File Aptitude - Create and Delete File',
      filesystemTests.createAndDeleteFile,
      10000,
      'Trying to create then delete "test.txt"',
    ),
    new LoopTest(
      'File Aptitude - Update and read a file',
      filesystemTests.updateAndReadFile,
      15000,
      'Trying to create, update, then read the text in "test.txt" before deleting',
    ),
    new LoopTest(
      'File Aptitude - Listen File',
      filesystemTests.listenFile,
      10000,
      'Monitoring for file changes...',
    ),
    new LoopTest(
      'File Aptitude - Listen Dir',
      filesystemTests.listenDir,
      10000,
      'Monitoring for dir change...',
    ),
    new LoopTest(
      'File Aptitude - Dir Exists',
      filesystemTests.dirExists,
      10000,
      'Checking for directory existence...',
    ),
    new LoopTest(
      'File Aptitude - File Exists',
      filesystemTests.fileExists,
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

    const clickableElements: whisper.Component[] = [];
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
            let form: whisper.Whisper;
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
              .then((whisperForm: whisper.Whisper) => {
                form = whisperForm;
              });
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
          let prompt: whisper.Whisper;
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
            .then((whisperForm: whisper.Whisper) => {
              prompt = whisperForm;
            });
          setTimeout(() => {
            prompt.close((error) => console.error(error));
          }, 5000);
        });
      },
      text: 'Run All Tests',
      style: whisper.Urgency.None,
    });

    return whisper.create({
      label: 'Self Test Loop',
      onClose: () => {
        console.log('closed Self Test whisper');
      },
      components: clickableElements,
    });
  }
}
