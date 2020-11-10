import { WhisperService } from './hostClients/whisperService';
import { StorageService } from './hostClients/storageService';
import { KeyboardService } from './hostClients/keyboardService';
import { ClipboardService } from './hostClients/clipboardService';
import { CursorService } from './hostClients/cursorService';
import { FileSystemService } from './hostClients/fileSystemService';
import { ProcessService } from './hostClients/processService';
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
}
