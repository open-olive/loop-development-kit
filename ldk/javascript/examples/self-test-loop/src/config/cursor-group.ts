import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as cursorTests from '../tests/cursor';

export const cursorTestGroup = (): TestGroup =>
  new TestGroup('Cursor Aptitude', [
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
  ]);
