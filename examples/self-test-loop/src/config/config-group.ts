import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as configTests from '../tests/config';

export const configTestGroup = (): TestGroup =>
  new TestGroup('Config Aptitude', [
    new LoopTest(
      'Config Aptitude - Loop Config Test',
      configTests.testLoopConfig,
      10000,
      'Getting Loop config...',
    ),
  ]);
