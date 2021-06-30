import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as uiTests from '../tests/ui';

export const uiTestGroup = (): TestGroup =>
  new TestGroup('UI Aptitude', [
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
  ]);
