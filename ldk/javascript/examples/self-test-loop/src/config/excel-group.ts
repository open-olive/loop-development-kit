import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as excelTests from '../tests/excel';

export const excelTestGroup = (): TestGroup =>
  new TestGroup('Excel Aptitude', [
    new LoopTest(
      'Excel Aptitude - Encode test',
      excelTests.testExcelEncode,
      5000,
      'Encodes a workbook object into Uint8Array data. Should succeed.',
    ),
    // new LoopTest(
    //     'Excel Aptitude - Decode test',
    //     excelTests.testExcelDecode,
    //     5000,
    //     'Decodes Uint8Array data into a workbook object. Should succeed.',
    // ),
  ]);
