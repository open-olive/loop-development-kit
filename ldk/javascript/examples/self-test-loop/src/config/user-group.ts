import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as userTests from '../tests/user';

export const userTestGroup = (): TestGroup =>
  new TestGroup('User Aptitude', [
    new LoopTest('User Aptitude - JWT', userTests.testJwt, 10000, 'No action required'),
  ]);
