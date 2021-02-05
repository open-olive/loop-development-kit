import { WhisperSensor } from './loopClients/whisperSensor';
import { StorageSensor } from './loopClients/storageSensor';
import { KeyboardSensor } from './loopClients/keyboardSensor';
import { ClipboardSensor } from './loopClients/clipboardSensor';
import { CursorSensor } from './loopClients/cursorSensor';
import { FileSystemSensor } from './loopClients/fileSystemSensor';
import { ProcessSensor } from './loopClients/processSensor';
import { NetworkSensor } from './loopClients/networkSensor';
/**
 * The LoopSensors interface provides access to the sensors provided by Olive Helps.
 */
export interface LoopSensors {
    whisper: WhisperSensor;
    storage: StorageSensor;
    keyboard: KeyboardSensor;
    clipboard: ClipboardSensor;
    cursor: CursorSensor;
    fileSystem: FileSystemSensor;
    process: ProcessSensor;
    network: NetworkSensor;
}
