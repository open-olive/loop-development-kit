import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as screenTests from '../tests/screen';

export const screenTestGroup = (): TestGroup =>
  new TestGroup('Screen Aptitude', [
    new LoopTest(
      'Screen Aptitude - OCR',
      screenTests.testOCR,
      10000,
      'Can you see recognized text?.',
    ),
    new LoopTest(
      'Screen Aptitude - Compare Hash',
      screenTests.testCompareHash,
      10000,
      'Checking hashes...',
    ),
    new LoopTest(
      'Screen Aptitude - Fullscreen Hash',
      screenTests.testFullScreenHash,
      10000,
      'Generating hashes from fullscreen...',
    ),
    new LoopTest(
      'Screen Aptitude - Screen Hash',
      screenTests.testScreenHash,
      10000,
      'Generating hashes...',
    ),
    new LoopTest(
      'Screen Aptitude - Listen Functions',
      screenTests.testListenFunctions,
      10000,
      'Please open a new fullscreen window and change the contents (A browser works well for this).',
    ),
  ]);
