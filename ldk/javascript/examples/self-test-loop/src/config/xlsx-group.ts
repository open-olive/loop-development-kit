import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as xlsxTests from '../tests/xlsx';

export const xlsxTestGroup = (): TestGroup =>
  new TestGroup('XLSX Aptitude', [
    new LoopTest(
      'Excel Aptitude - Encode test',
      xlsxTests.testXLSXEncodeAndDecode,
      5000,
      'Encodes a workbook object into Uint8Array data. Should succeed.',
    ),
  ]);
