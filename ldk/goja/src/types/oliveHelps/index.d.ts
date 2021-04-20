/* eslint-disable */
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
  enum ProcessAction {
    Unknown = 0,
    Started = 1,
    Stopped = 2,
  }

  interface ProcessEvent {
    processInfo: ProcessInfo;
    processAction: ProcessAction;
  }

  interface ProcessInfo {
    arguments: string;
    command: string;
    pid: number;
  }

  interface Process {
    all(cb: (processInfo: ProcessInfo[]) => void): void;

    listenAll(cb: (event: ProcessEvent) => void): void;
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

    includeOliveHelpsEvents(enabled: boolean): void;
  }

  //-- Whisper
  interface WhisperService {
    create(whisper: NewWhisper, cb: (whisper: Whisper) => void): void;

    all(cb: (whispers: Whisper[]) => void): void;
  }

  enum Alignment {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
    SPACE_AROUND = 'space_around',
    SPACE_EVENLY = 'space_evenly',
  }

  enum Urgency {
    ERROR = 'error',
    NONE = 'none',
    SUCCESS = 'success',
    WARNING = 'warning',
  }

  enum Direction {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
  }

  enum TextAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',
  }

  interface Component {
    type: string;
    id?: string;
  }

  interface Button extends Component {
    label: string;
    onClick: () => void;
  }

  interface Checkbox extends Component {
    label: string;
    tooltip?: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }

  interface Link extends Component {
    href?: string;
    onClick?: () => void;
    text: string;
    style?: Urgency;
    textAlign?: TextAlign;
  }

  interface ListPair extends Component {
    copyable: boolean;
    label: string;
    value: string;
    style: Urgency;
  }

  interface Markdown extends Component {
    body: string;
  }

  interface Message extends Component {
    body?: string;
    header?: string;
    style?: Urgency;
    textAlign?: TextAlign;
  }

  interface NumberInput extends Component {
    label: string;
    onChange: (value: number) => void;
    value?: number;
    max?: number;
    min?: number;
    step?: number;
    tooltip?: string;
  }

  interface Password extends Component {
    label: string;
    onChange: (value: string) => void;
    value?: string;
    tooltip?: string;
  }

  interface Email extends Component {
    label: string;
    onChange: (value: string) => void;
    value?: string;
    tooltip?: string;
  }

  interface RadioGroup extends Component {
    onSelect: (value: number) => void; 
    options: string[];
    selected?: number;
  }

  interface Select extends Component {
    label: string;
    onSelect: (value: number) => void;
    selected?: number;
    tooltip?: string;
    options: string[];
  }

  interface Telephone extends Component {
    label: string;
    onChange: (value: string) => void;
    // pattern?: RegExp; TODO: implement this
    tooltip?: string;
    value?: string;
  }

  interface TextInput extends Component {
    label: string;
    onChange: (value: string) => void;
    tooltip?: string;
    value?: string;
  }

type Divider = Component

type Components = 
      | Button
      | Checkbox
      | Link
      | ListPair
      | Markdown
      | Message
      | NumberInput
      | Password
      | RadioGroup
      | Select
      | Telephone
      | TextInput
      | Divider
      | Email

  interface CollapseBox extends Component {
    children: Array<Components>;
    label?: string;
    open: boolean;
  }

  interface Box extends Component {
    alignment: Alignment;
    children: Array<Components>;
    direction: Direction;
  }

  interface NewWhisper {
    label: string;
    components: Array<Components>;
    onClose: () => void
  }

  interface Whisper {
    id: string;
    label: string;
    components: Array<Components>;
    close(cb: () => void): void;
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
