import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as systemTests from '../tests/system';

export const systemTestGroup = (): TestGroup =>
  new TestGroup('System Aptitude', [
    new LoopTest(
      'System Aptitude - Operating System',
      systemTests.operatingSystemTest,
      5000,
      `Checking the host's OS...`,
    ),
  ]);
