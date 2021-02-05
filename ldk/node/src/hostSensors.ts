import { WhisperSensor } from './hostClients/whisperSensor';
import { StorageSensor } from './hostClients/storageSensor';
import { KeyboardSensor } from './hostClients/keyboardSensor';
import { ClipboardSensor } from './hostClients/clipboardSensor';
import { CursorSensor } from './hostClients/cursorSensor';
// import { HoverSensor } from './hostClients/hoverSensor';
import { FileSystemSensor } from './hostClients/fileSystemSensor';
import { ProcessSensor } from './hostClients/processSensor';
// import { WindowSensor } from './hostClients/windowSensor';
// import { BrowserSensor } from './hostClients/browserSensor';
import { NetworkSensor } from './hostClients/networkSensor';

/**
 * The HostSensors interface provides access to the sensors provided by Olive Helps.
 */
export interface HostSensors {
  whisper: WhisperSensor;
  storage: StorageSensor;
  keyboard: KeyboardSensor;
  clipboard: ClipboardSensor;
  cursor: CursorSensor;
  fileSystem: FileSystemSensor;
  process: ProcessSensor;
  network: NetworkSensor;
  // These sensors are not yet implemented.
  // hover: HoverSensor;
  // window: WindowSensor;
  // browser: BrowserSensor;
}
