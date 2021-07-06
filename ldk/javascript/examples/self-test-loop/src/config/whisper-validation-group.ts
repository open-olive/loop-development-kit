import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as whisperValidationTests from '../tests/whisper/whisper-validation';

export const whisperValidationTestGroup = (): TestGroup =>
  new TestGroup('Whisper Validation', [
    new LoopTest(
      'Whisper Validation - Basic Form Validation',
      whisperValidationTests.testComponentsValidation,
      20000,
      `Did the form validate?`,
    ),
  ]);
