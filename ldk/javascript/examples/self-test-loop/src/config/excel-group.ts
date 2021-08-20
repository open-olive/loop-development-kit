import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as excelTests from '../tests/excel';

export const excelTestGroup = (): TestGroup =>
  new TestGroup('Excel Aptitude', [
    new LoopTest(
      'Excel Aptitude - Encode test',
      excelTests.testXLSXEncodeAndDecode,
      5000,
      'Encodes a workbook object into Uint8Array data. Should succeed.',
    ),
  ]);
