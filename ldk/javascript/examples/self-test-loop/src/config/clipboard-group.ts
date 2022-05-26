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
      'Clipboard Aptitude - Clipboard Stream - function listen',
      clipboardTests.testListen,
      10000,
      'Copy the value "LDKThxBai" to the clipboard',
    ),
    new LoopTest(
      'Clipboard Aptitude - Clipboard Stream excluding olive helps - function listen',
      clipboardTests.testListenExcludingOliveHelps,
      10000,
      'Copying anything outside of olive helps should create a whisper',
    ),
    new LoopTest(
      'Clipboard Aptitude - Clipboard Stream - function listenWithOptions',
      clipboardTests.testListenWithOptions,
      10000,
      'Copy the value "LDKThxBai" to the clipboard',
    ),
    new LoopTest(
      'Clipboard Aptitude - Clipboard Stream excluding olive helps - function listenWithOptions',
      clipboardTests.testListenWithOptionsExcludingOliveHelps,
      10000,
      'Copying anything outside of olive helps should create a whisper',
    ),
  ]);
