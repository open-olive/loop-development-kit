import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as userTests from '../tests/user';

export const userTestGroup = (): TestGroup =>
  new TestGroup('User Aptitude', [
    new LoopTest(
      'User Aptitude - JWT - Default Claims',
      userTests.testJwt,
      10000,
      'No action required',
    ),
    new LoopTest(
      'User Aptitude - JWT - No Email Claim',
      userTests.testJwtExcludeEmail,
      10000,
      'No action required',
    ),
    new LoopTest(
      'User Aptitude - JWT - Email Claim',
      userTests.testJwtIncludeEmail,
      10000,
      'Log in to the team-ldx@oliveai.com account in Olive Helps and try this again.',
    ),
  ]);
