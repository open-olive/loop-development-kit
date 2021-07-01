import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as processTests from '../tests/process';

export const processTestGroup = (): TestGroup =>
  new TestGroup('Process Aptitude', [
    new LoopTest(
      'Process Aptitude - Query processes',
      processTests.testProcess,
      10000,
      'Querying what processes are running on the computer...',
    ),
    new LoopTest(
      'Process Aptitude - Stream processes',
      processTests.testListenAll,
      10000,
      'Streaming info on what processes are running on the computer...',
    ),
  ]);
