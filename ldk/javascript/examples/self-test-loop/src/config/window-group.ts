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
    new LoopTest(
      'Window Aptitude - Listen All  Test',
      windowTests.testListenAll,
      10000,
      'Listening to all windows. Please trigger a blur, close, focus, move, open, resize, and title change. NOTE: Some of these events (like blur, close, open) will often happen by changing the focused window',
    ),
    new LoopTest(
      'Window Aptitude - WindowInfo Path',
      windowTests.testWindowInfoPath,
      10000,
      'Gathering windows...',
    ),
  ]);
