import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as windowTests from '../tests/window';

export const windowTestGroup = (): TestGroup =>
  new TestGroup('Window Aptitude', [
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
  ]);
