import { WhisperService } from './hostClients/whisperService';
import { VaultService } from './hostClients/vaultService';
import { KeyboardService } from './hostClients/keyboardService';
import { ClipboardService } from './hostClients/clipboardService';
import { CursorService } from './hostClients/cursorService';
import { FileSystemService } from './hostClients/fileSystemService';
import { ProcessService } from './hostClients/processService';
import { NetworkService } from './hostClients/networkService';
import { UIService } from './hostClients/uiService';
import { WindowService } from './hostClients/windowService';
/**
 * The HostServices interface provides access to the aptitudes and services provided by Olive Helps.
 */
export interface HostServices {
    clipboard: ClipboardService;
    cursor: CursorService;
    fileSystem: FileSystemService;
    keyboard: KeyboardService;
    network: NetworkService;
    process: ProcessService;
    ui: UIService;
    vault: VaultService;
    whisper: WhisperService;
    window: WindowService;
}
