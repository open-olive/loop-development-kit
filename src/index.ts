import 'core-js';
import * as React from 'react';
import * as ReactWhisper from './whisper/react/renderer';
import * as browser from './browser';
import * as clipboard from './clipboard';
import * as config from './config';
import * as cursor from './cursor';
import * as document from './document';
import * as filesystem from './filesystem';
import * as keyboard from './keyboard';
import * as network from './network';
import * as process from './process';
import * as screen from './screen';
import * as search from './search';
import * as system from './system';
import * as ui from './ui';
import * as user from './user';
import * as vault from './vault';
import * as whisper from './whisper';
import * as window from './window';
// These are provided to validate that the aptitude object meets the interface contract.

/* eslint-disable */
const _browser: browser.Browser = browser;
const _clipboard: clipboard.Clipboard = clipboard;
const _config: config.Config = config;
const _cursor: cursor.Cursor = cursor;
const _document: document.Document = document;
const _filesystem: filesystem.Filesystem = filesystem;
const _keyboard: keyboard.Keyboard = keyboard;
const _network: network.Network = network;
const _process: process.Process = process;
const _screen: screen.Screen = screen;
const _search: search.Search = search;
const _system: system.System = system;
const _ui: ui.UI = ui;
const _user: user.User = user;
const _vault: vault.Vault = vault;
const _whisper: whisper.WhisperAptitude = whisper;
const _window: window.Window = window;
/* eslint-enable */

export {
  browser,
  clipboard,
  config,
  cursor,
  document,
  filesystem,
  keyboard,
  network,
  process,
  screen,
  search,
  system,
  ui,
  user,
  vault,
  whisper,
  window,
  React,
  ReactWhisper,
};
