import { WhisperService } from './hostClients/whisperService';
import { StorageService } from './hostClients/storageService';
import { KeyboardService } from './hostClients/keyboardService';
import { ClipboardService } from './hostClients/clipboardService';
import { CursorService } from './hostClients/cursorService';
import { HoverService } from './hostClients/hoverService';
import { FileSystemService } from './hostClients/fileSystemService';
import { ProcessService } from './hostClients/processService';
import { WindowService } from './hostClients/windowService';
import { BrowserService } from './hostClients/browserService';

/**
 * The HostServices interface provides access to the sensors and services provided by Olive Helps.
 */
export interface HostServices {
  whisper: WhisperService;
  storage: StorageService;
  keyboard: KeyboardService;
  clipboard: ClipboardService;
  cursor: CursorService;
  fileSystem: FileSystemService;
  process: ProcessService;
  // These services are not yet implemented.
  // hover: HoverService;
  // window: WindowService;
  // browser: BrowserService;
}
