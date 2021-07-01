import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as windowTests from '../tests/window';

export const windowTestGroup = (): TestGroup =>
  new TestGroup('Window Aptitude', [
    new LoopTest(
      'Window Aptitude - Active Window Test',
      windowTests.testActiveWindow,
      10000,
      'Make window active...',
    ),
    new LoopTest(
      'Window Aptitude - All Window Test',
      windowTests.testWindowAll,
      10000,
      'Getting all windows...',
    ),
    new LoopTest(
      'Window Aptitude - Listen Active Window Test',
      windowTests.testListenActiveWindow,
      10000,
      'Listening to active windows, please change active window...',
    ),
  ]);
