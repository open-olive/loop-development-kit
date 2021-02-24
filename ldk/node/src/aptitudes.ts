import { Whisper } from './aptitudes/whisper';
import { Vault } from './aptitudes/vault';
import { Keyboard } from './aptitudes/keyboard';
import { Clipboard } from './aptitudes/clipboard';
import { Cursor } from './aptitudes/cursor';
import { FileSystem } from './aptitudes/fileSystem';
import { Process } from './aptitudes/process';
import { Network } from './aptitudes/network';
import { Ui } from './aptitudes/ui';
// import { Hover } from './aptitudes/hoverService';
// import { Window } from './aptitudes/windowService';
// import { Browser } from './aptitudes/browserService';

/**
 * The Aptitudes interface provides access to the aptitudes (sensors, services, etc.) provided by Olive Helps.
 */
export interface Aptitudes {
  whisper: Whisper;
  vault: Vault;
  keyboard: Keyboard;
  clipboard: Clipboard;
  cursor: Cursor;
  fileSystem: FileSystem;
  process: Process;
  network: Network;
  ui: Ui;
  // These services are not yet implemented.
  // hover: Hover;
  // window: Window;
  // browser: Browser;
}
