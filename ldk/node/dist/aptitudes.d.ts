import { Whisper } from './aptitudes/whisper';
import { Vault } from './aptitudes/vault';
import { Keyboard } from './aptitudes/keyboard';
import { Clipboard } from './aptitudes/clipboard';
import { Cursor } from './aptitudes/cursor';
import { FileSystem } from './aptitudes/fileSystem';
import { Process } from './aptitudes/process';
import { Network } from './aptitudes/network';
import { Ui } from './aptitudes/ui';
import { Window } from './aptitudes/window';
/**
 * The Aptitudes interface groups Olive Helps' Aptitudes in one place.
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
    window: Window;
}
