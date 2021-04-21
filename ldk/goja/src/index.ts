import * as clipboard from './clipboard';
import * as cursor from './cursor';
import * as filesystem from './filesystem';
import * as keyboard from './keyboard';
import * as network from './network';
import * as process from './process';
import * as ui from './ui';
import * as vault from './vault';
import * as whisper from './whisper';
import * as window from './window';

const _clipboard: clipboard.Clipboard = clipboard;
const _cursor: cursor.Cursor = cursor;
const _keyboard: keyboard.Keyboard = keyboard;
const _filesystem: filesystem.Filesystem = filesystem;
const _network: network.Network = network;
const _process: process.Process = process;
const _ui: ui.UI = ui;
const _vault: vault.Vault = vault;
const _whisper: whisper.WhisperAptitude = whisper;
const _window: window.Window = window;

export {
    clipboard,
    cursor,
    filesystem,
    keyboard,
    network,
    process,
    ui,
    vault,
    whisper,
    window
}