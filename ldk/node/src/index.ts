import access from './access';
import categories from './categories';
import operatingSystem from './operatingSystem';
import Plugin from './plugin';
import { Loop } from './loop';
import { Logger } from './logging';
import { serveLoop } from './serve';
import { HostSensors } from './hostSensors';
import * as Browser from './hostClients/browserSensor';
import * as Clipboard from './hostClients/clipboardSensor';
import * as Cursor from './hostClients/cursorSensor';
import * as FileSystem from './hostClients/fileSystemSensor';
import * as Hover from './hostClients/hoverSensor';
import * as Keyboard from './hostClients/keyboardSensor';
import * as Process from './hostClients/processSensor';
import * as Storage from './hostClients/storageClient';
import * as Whisper from './hostClients/whisperSensor';
import * as Window from './hostClients/windowSensor';
import * as Network from './hostClients/networkSensor';

export {
  access,
  categories,
  operatingSystem,
  Loop,
  Plugin,
  Logger,
  serveLoop,
  HostSensors,
  Browser,
  Clipboard,
  Cursor,
  FileSystem,
  Hover,
  Keyboard,
  Process,
  Storage,
  Whisper,
  Window,
  Network,
};
