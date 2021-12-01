import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as whisperUpdateTests from '../tests/whisper/whisper-update';

export const whisperUpdateTestGroup = (): TestGroup =>
  new TestGroup('Whisper Updates', [
    new LoopTest(
      'Whisper Update - Values Persistance',
      whisperUpdateTests.testValuePersistOnUpdate,
      20000,
      `Did the persist after update?`,
    ),
    new LoopTest(
      'Whisper Update - Values Override',
      whisperUpdateTests.testValueOverwrittenOnUpdate,
      20000,
      `Did the values got overridden after update?`,
    ),
    new LoopTest(
      'Whisper Update - Collapse State Across Update',
      whisperUpdateTests.testUpdateCollapseState,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - Automated OnChange',
      whisperUpdateTests.testWhisperStateOnChange,
      5000,
      `Detecting changes across updates - No action needed.`,
    ),
    new LoopTest(
      'Whisper Update - Non Text Inputs - No Value',
      whisperUpdateTests.testNonTextInputs,
      20000,
      `Interact with components and then click the button`,
    ),
    new LoopTest(
      'Whisper Update - Non Text Inputs - With Value',
      whisperUpdateTests.testNonTextInputsWithValue,
      20000,
      `Interact with components and then click the button`,
    ),
    new LoopTest(
      'Whisper Update - Icon With Component State',
      whisperUpdateTests.testIconUpdates,
      10000,
      `Check box and update`,
    ),

    new LoopTest(
      'Whisper Update - Progress',
      whisperUpdateTests.testProcessComponent,
      10000,
      `Test Progress Component`,
    ),
    new LoopTest(
      'Whisper Update - Breadcrumb',
      whisperUpdateTests.testBreadcrumbUpdates,
      10000,
      `Click button and update`,
    ),
  ]);
