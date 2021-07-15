import TestGroup from '../testingFixtures/testGroup';
import { LoopTest } from '../testingFixtures/loopTest';

import * as whisperUpdateTests from '../tests/whisper/whisper-update';

export const whisperUpdateTestGroup = (): TestGroup =>
  new TestGroup('Whisper Updates', [
    new LoopTest(
      'Whisper Update - Basic Whisper Update',
      whisperUpdateTests.testWhisperUpdate,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - Collapse State Across Update',
      whisperUpdateTests.testUpdateCollapseState,
      20000,
      `Did the whisper update correctly?`,
    ),
    new LoopTest(
      'Whisper Update - OnChange Across Update',
      whisperUpdateTests.testUpdateOnChange,
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
      10000,
      `Interact with components and then click the button`,
    ),
    new LoopTest(
      'Whisper Update - Non Text Inputs - With Value',
      whisperUpdateTests.testNonTextInputsWithValue,
      10000,
      `Interact with components and then click the button`,
    ),
  ]);
