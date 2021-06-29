import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as keyboardTests from '../tests/keyboard';

export const keyboardTestGroup = (): TestGroup =>
  new TestGroup('Keyboard Aptitude', [
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
  ]);
