import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as clipboardTests from '../tests/clipboard';

export const clipboardTestGroup = (): TestGroup =>
  new TestGroup('Clipboard Aptitude', [
    new LoopTest(
      'Clipboard Aptitude - Write And Read Test',
      clipboardTests.testWriteAndRead,
      10000,
      'Copying value to clipboard and reading it back',
    ),
    new LoopTest(
      'Clipboard Aptitude - Clipboard Stream',
      clipboardTests.testListen,
      10000,
      'Copying the value "LDKThxBai" to the clipboard',
    ),
  ]);
