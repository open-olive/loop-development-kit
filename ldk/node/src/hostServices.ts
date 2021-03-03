import { WhisperService } from './hostClients/whisperService';
import { VaultService } from './hostClients/vaultService';
import { KeyboardService } from './hostClients/keyboardService';
import { ClipboardService } from './hostClients/clipboardService';
import { CursorService } from './hostClients/cursorService';
import { FileSystemService } from './hostClients/fileSystemService';
import { ProcessService } from './hostClients/processService';
import { NetworkService } from './hostClients/networkService';
import { UIService } from './hostClients/uiService';
// import { HoverService } from './hostClients/hoverService';
// import { WindowService } from './hostClients/windowService';
// import { BrowserService } from './hostClients/browserService';

/**
 * The HostServices interface provides access to the sensors and services provided by Olive Helps.
 */
export interface HostServices {
  whisper: WhisperService;
  vault: VaultService;
  keyboard: KeyboardService;
  clipboard: ClipboardService;
  cursor: CursorService;
  fileSystem: FileSystemService;
  process: ProcessService;
  network: NetworkService;
  ui: UIService;
  // These services are not yet implemented.
  // hover: HoverService;
  // window: WindowService;
  // browser: BrowserService;
}
