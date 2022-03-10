import TestGroup from '../testingFixtures/testGroup';

import { browserTestGroup } from './browser-group';
import { clipboardTestGroup } from './clipboard-group';
import { cursorTestGroup } from './cursor-group';
import { documentTestGroup } from './document-group';
import { filesystemTestGroup } from './filesystem-group';
import { keyboardTestGroup } from './keyboard-group';
import { networkTestGroup } from './network-group';
import { processTestGroup } from './process-group';
import { screenTestGroup } from './screen-group';
import { systemTestGroup } from './system-group';
import { uiTestGroup } from './ui-group';
import { userTestGroup } from './user-group';
import { vaultTestGroup } from './vault-group';
import { whisperTestGroup } from './whisper-group';
import { whisperUpdateTestGroup } from './whisper-update-group';
import { whisperValidationTestGroup } from './whisper-validation-group';
import { windowTestGroup } from './window-group';

export const testConfig: { [key: string]: TestGroup } = {
  browser: browserTestGroup(),
  clipboard: clipboardTestGroup(),
  cursor: cursorTestGroup(),
  document: documentTestGroup(),
  file: filesystemTestGroup(),
  keyboard: keyboardTestGroup(),
  network: networkTestGroup(),
  process: processTestGroup(),
  screen: screenTestGroup(),
  system: systemTestGroup(),
  ui: uiTestGroup(),
  user: userTestGroup(),
  vault: vaultTestGroup(),
  whispers: whisperTestGroup(),
  whisperUpdate: whisperUpdateTestGroup(),
  whisperValidation: whisperValidationTestGroup(),
  window: windowTestGroup(),
};
