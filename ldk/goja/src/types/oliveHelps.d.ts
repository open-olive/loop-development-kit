declare module 'fastestsmallesttextencoderdecoder';
declare const oliveHelps: OliveHelps.Aptitudes;

declare namespace OliveHelps {
  interface Aptitudes {
    clipboard: Clipboard;
    whisper: WhisperService;
    filesystem: Filesystem;
    cursor: Cursor;
    keyboard: Keyboard;
    network: Network;
    process: Process;
    ui: UI;
    vault: Vault;
    window: Window;
  }

  //-- Window
  interface Window {
    activeWindow(cb: (windowInfo: WindowInfo) => void): void;

    listenActiveWindow(cb: (windowInfo: WindowInfo) => void): void;

    all(cb: (windowInfos: WindowInfo[]) => void): void;

    listenAll(cb: (windowInfo: WindowInfo) => void): void;
  }

  interface WindowEvent {
    info: WindowInfo;
    action: number;
  }

  interface WindowInfo {
    title: string;
    path: string;
    pid: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }

  //-- Vault
  interface Vault {
    remove(key: string, cb: () => void): void;

    exists(key: string, cb: (exists: boolean) => void): void;

    read(key: string, cb: (value: string) => void): void;

    write(key: string, value: string, cb: () => void): void;
  }

  //-- UI
  interface UI {
    listenSearchbar(cb: (text: string) => void): void;

    listenGlobalSearch(cb: (text: string) => void): void;
  }

  //-- Process
  interface Process {
    all(cb: (processInfo: ProcessInfo[]) => void): void;

    listenAll(cb: (event: ProcessEvent) => void): void;
  }

  interface ProcessEvent {
    process: ProcessInfo;
    action: number;
  }

  interface ProcessInfo {
    arguments: string;
    command: string;
    pid: number;
  }

  //-- Network
  interface Network {
    httpRequest(req: HTTPRequest, cb: (res: HTTPResponse) => void): void;
  }

  interface HTTPRequest {
    body: Uint8Array;
    headers: Record<string, string[]>;
    method: string;
    url: string;
  }

  interface HTTPResponse {
    statusCode: number;
    data: Uint8Array;
    headers: Record<string, string[]>;
  }

  //--Keyboard
  interface Keyboard {
    listenHotkey(hotkey: Hotkey, cb: (pressed: boolean) => void): void;

    listenText(cb: (text: string) => void): void;

    listenCharacter(cb: (char: string) => void): void;
  }

  interface Hotkey {
    key: string;
    alt?: boolean;
    altLeft?: boolean;
    altRight?: boolean;
    control?: boolean;
    controlLeft?: boolean;
    controlRight?: boolean;
    meta?: boolean;
    metaLeft?: boolean;
    metaRight?: boolean;
    shift?: boolean;
    shiftLeft?: boolean;
    shiftRight?: boolean;
  }

  //-- Cursor
  interface Cursor {
    position(cb: (pos: Position) => void): void;

    listenPosition(cb: (pos: Position) => void): void;
  }

  interface Position {
    x: number;
    y: number;
  }

  //-- Clipboard
  interface Clipboard {
    read(cb: (val: string) => void): void;

    write(value: string, cb: () => void): void;

    listen(cb: (val: string) => void): void;
  }

  //-- Whisper
  interface WhisperService {
    create(whisper: NewWhisper, cb: (whisper: Whisper) => void): void;

    all(cb: (whispers: Whisper[]) => void): void;
  }

  interface NewWhisper {
    label: string;
    components: Component[];
  }

  interface Whisper {
    id: string;
    label: string;
    components: Component[];

    onChange(cb: (whisper: Whisper) => void): void;

    close(cb: () => void): void;
  }

  interface Component {
    type: string;
    id: string;
  }

  interface MarkdownComponent extends Component {
    body: string;
  }

  interface ButtonComponent extends Component {
    body: string;
  }

  //-- Filesystem
  interface Filesystem {
    writeFile(path: string, data: Uint8Array, op: number, mode: WriteMode, cb: () => void): void;

    readFile(path: string, cb: (data: Uint8Array) => void): void;

    listenFile(path: string, cb: (fileEvent: FileEvent) => void): void;

    remove(path: string, recursive: boolean, cb: () => void): void;

    stat(path: string, cb: (fi: FileInfo) => void): void;

    copy(src: string, dest: string, cb: () => void): void;

    move(src: string, dest: string, cb: () => void): void;

    dir(path: string, cb: (fileInfos: FileInfo[]) => void): void;

    makeDir(path: string, mode: number, cb: () => void): void;

    listenDir(path: string, cb: (fileEvent: FileEvent) => void): void;
  }

  interface FileInfo {
    name: string;
    size: number;
    mode: string;
    modTime: string;
    isDir: boolean;
  }

  interface FileEvent {
    action: string;
    info: FileInfo;
  }

  type WriteMode = number;
}
