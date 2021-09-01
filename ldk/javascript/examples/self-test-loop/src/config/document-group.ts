import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as documentTests from '../tests/document';

export const documentTestGroup = (): TestGroup =>
  new TestGroup('Document Aptitude', [
    new LoopTest(
      'Excel Aptitude - Encode test',
      documentTests.testDocumentEncodeAndDecode,
      5000,
      'Encodes a workbook object into Uint8Array data. Should succeed.',
    ),
  ]);
