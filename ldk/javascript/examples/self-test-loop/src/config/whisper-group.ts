import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as whisperTests from '../tests/whisper';

export const whisperTestGroup = (): TestGroup =>
  new TestGroup('Whisper Aptitude', [
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
      'Whisper Aptitude - Float Number Inputs',
      whisperTests.floatNumberInputs,
      20000,
      `Enter 0.6 in the input field`,
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
      'Whisper Aptitude - onFocus test',
      whisperTests.onFocusTest,
      10000,
      `Focus on each field`,
    ),
    new LoopTest(
      'Whisper Aptitude - CollapseBox OnClick',
      whisperTests.collapseBoxOnClick,
      10000,
      'Click both CollapseBoxes',
    ),
  ]);
