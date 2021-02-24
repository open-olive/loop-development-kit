import { WhisperService } from './aptitudes/whisperService';
import { VaultService } from './aptitudes/vaultService';
import { KeyboardService } from './aptitudes/keyboardService';
import { ClipboardService } from './aptitudes/clipboardService';
import { CursorService } from './aptitudes/cursorService';
import { FileSystemService } from './aptitudes/fileSystemService';
import { ProcessService } from './aptitudes/processService';
import { NetworkService } from './aptitudes/networkService';
import { UIService } from './aptitudes/uiService';
// import { HoverService } from './aptitudes/hoverService';
// import { WindowService } from './aptitudes/windowService';
// import { BrowserService } from './aptitudes/browserService';

/**
 * The Aptitudes interface provides access to the aptitudes (sensors, services, etc.) provided by Olive Helps.
 */
export interface Aptitudes {
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
