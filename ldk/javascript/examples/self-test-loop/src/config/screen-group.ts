import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as screenTests from '../tests/screen';

export const screenTestGroup = (): TestGroup =>
  new TestGroup('Screen Aptitude', [
    new LoopTest(
      'Screem Aptitude - OCR',
      screenTests.testOCR,
      10000,
      'Can you see recognized text?.',
    ),
  ]);
