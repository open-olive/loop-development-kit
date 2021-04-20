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

  enum WhisperComponentType {
    Box = 'box',
    Button = 'button',
    Checkbox = 'checkbox',
    CollapseBox = 'collapseBox',
    Divider = 'divider',
    Email = 'email',
    Link = 'link',
    ListPair = 'listPair',
    Markdown = 'markdown',
    Message = 'message',
    Number = 'number',
    Password = 'password',
    RadioGroup = 'radioGroup',
    Select = 'select',
    Telephone = 'telephone',
    TextInput = 'textInput',
  }

  enum Urgency {
    Error = 'error',
    None = 'none',
    Success = 'success',
    Warning = 'warning',
  }

  enum Alignment {
    Center = 'center',
    Left = 'left',
    Right = 'right',
    SpaceAround = 'space_around',
    SpaceEvenly = 'space_evenly',
  }

  enum Direction {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
  }

  enum TextAlign {
    Center = 'center',
    Left = 'left',
    Right = 'right',
  }

  interface Component {
    type: WhisperComponentType;
    id?: string;
  }

  interface Button extends Component {
    label: string;
    onClick: () => void;
    submit?: boolean;
  }

  interface Checkbox extends Component {
    label: string;
    tooltip?: string;
    value?: boolean;
    onChange: (value: boolean) => void;
  }

  interface Email extends Component {
    label: string;
    onChange?: (value: string) => void;
    pattern?: RegExp;
    tooltip?: string;
    value?: string;
  }

  interface Link extends Component {
    href?: string;
    style?: Urgency;
    onClick?: (value: string) => void;
    text: string;
    textAlign?: TextAlign;
  }

  interface ListPair extends Component {
    copyable: boolean;
    label: string;
    style?: Urgency;
    value?: string;
  }

  interface Markdown extends Component {
    body: string;
  }

  interface Message extends Component {
    body: string;
    header: string;
    style?: Urgency;
    textAlign?: TextAlign;
  }

  interface NumberInput extends Component {
    label: string;
    max?: number;
    min?: number;
    onChange?: (value: string) => void;
    step?: number;
    tooltip?: string;
    value?: number;
  }

  interface Password extends Component {
    label: string;
    onChange?: (value: string) => void;
    tooltip?: string;
    value?: string;
  }

  interface RadioGroup extends Component {
    onSelect: (value: number) => void;
    options: string[];
    selected?: number;
  }

  interface Select extends Component {
    label: string;
    onSelect: (value: number) => void;
    tooltip?: string;
    options: string[];
  }

  interface Telephone extends Component {
    label: string;
    onChange?: (value: string) => void;
    pattern?: RegExp;
    tooltip?: string;
    value?: string;
  }

  interface TextInput extends Component {
    label: string;
    onChange?: (value: string) => void;
    tooltip?: string;
    value?: string;
  }

  type ChildElement =
    | Button
    | Checkbox
    | Component
    | Email
    | Link
    | ListPair
    | Markdown
    | Message
    | NumberInput
    | Password
    | RadioGroup
    | Select
    | Telephone
    | TextInput;

  interface CollapseBox extends Component {
    children: Array<ChildElement>;
    label?: string;
    open: boolean;
  }

  interface Box extends Component {
    alignment: Alignment;
    children: Array<ChildElement | CollapseBox>;
    direction: string;
  }

  interface NewWhisper {
    label: string;
    components: Array<Box | ChildElement | CollapseBox>;
    onClose: () => void;
  }

  interface Whisper {
    id: string;
    label: string;
    components: Array<Box | ChildElement | CollapseBox>;
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
