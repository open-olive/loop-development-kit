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
      'Please check package.json and update the value of email to your email address!',
    ),
  ]);
