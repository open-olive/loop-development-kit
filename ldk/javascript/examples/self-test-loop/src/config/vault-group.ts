import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as vaultTests from '../tests/vault';

export const vaultTestGroup = (): TestGroup => new TestGroup('Vault Aptitude', [
    new LoopTest(
      'Vault Aptitude - Write / Read from vault',
      vaultTests.vaultReadWrite,
      10000,
      'Writing value to vault then reading it back.',
    ),
  ]);
