
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

    listenAll(cb: (windowEvent: WindowEvent) => void): void;
  }

  interface WindowEvent {
    info: WindowInfo;
    action: WindowAction;
  }
  type WindowActionFocused = "focus"
  type WindowActionUnfocused = "unfocused"
  type WindowActionOpened = "open"
  type WindowActionClosed = "close"
  type WindowActionMoved = "move"
  type WindowActionResized = "resized"
  type WindowActionTitleChanged = "titleChange"

  type WindowAction =
    WindowActionFocused
    | WindowActionUnfocused
    | WindowActionOpened
    | WindowActionClosed
    | WindowActionMoved
    | WindowActionResized
    | WindowActionTitleChanged

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

  interface Component<T extends WhisperComponentType> {
    id?: string;
    type: T;
  }

  type Button = Component<WhisperComponentType.Button> & {
    label: string;
    onClick: () => void;
  };

  type Checkbox = Component<WhisperComponentType.Checkbox> & {
    label: string;
    tooltip?: string;
    value: boolean;
    onChange: (value: boolean) => void;
  };

  type Email = Component<WhisperComponentType.Email> & {
    label: string;
    onChange: (value: string) => void;
    tooltip?: string;
    value?: string;
  };

  type Link = Component<WhisperComponentType.Link> & {
    href?: string;
    text: string;
    onClick?: () => void;
    style?: Urgency;
    textAlign?: TextAlign;
  };

  type ListPair = Component<WhisperComponentType.ListPair> & {
    copyable: boolean;
    label: string;
    value: string;
    style: Urgency;
  };

  type Markdown = Component<WhisperComponentType.Markdown> & {
    body: string;
  };

  type Message = Component<WhisperComponentType.Message> & {
    body?: string;
    header?: string;
    style?: Urgency;
    textAlign?: TextAlign;
  };

  type NumberInput = Component<WhisperComponentType.Number> & {
    label: string;
    onChange: (value: number) => void;
    value?: number;
    max?: number;
    min?: number;
    step?: number;
    tooltip?: string;
  };

  type Password = Component<WhisperComponentType.Password> & {
    label: string;
    onChange: (value: string) => void;
    tooltip?: string;
    value?: string;
  };

  type RadioGroup = Component<WhisperComponentType.RadioGroup> & {
    onSelect: (value: number) => void;
    options: string[];
    selected?: number;
  };

  type Select = Component<WhisperComponentType.Select> & {
    label: string;
    options: string[];
    onSelect: (value: number) => void;
    selected?: number;
    tooltip?: string;
  };

  type Telephone = Component<WhisperComponentType.Telephone> & {
    label: string;
    onChange: (value: string) => void;
    // pattern?: RegExp; TODO: Implement this
    tooltip?: string;
    value?: string;
  };

  type TextInput = Component<WhisperComponentType.TextInput> & {
    label: string;
    onChange: (value: string) => void;
    tooltip?: string;
    value?: string;
  };

  type Divider = Component<WhisperComponentType.Divider>;

  type CollapseBox = Component<WhisperComponentType.CollapseBox> & {
    children: Array<ChildComponents>;
    label?: string;
    open: boolean;
  };

  type Box = Component<WhisperComponentType.Box> & {
    alignment: Alignment;
    children: Array<ChildComponents>;
    direction: Direction;
  };

  type ChildComponents =
    | Button
    | Checkbox
    | Divider
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

  type Components = Box | ChildComponents | CollapseBox;

  interface NewWhisper {
    label: string;
    components: Array<Components>;
    onClose: () => void;
  }

  interface Whisper {
    id: string;
    label: string;
    components: Array<Components>;
    close(cb: () => void): void;
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

  enum WriteOperation {
    overwrite = 1,
    append = 2,
  }

  //-- Filesystem
  interface Filesystem {
    copy(source: string, destination: string, callback: () => void): void;

    dir(path: string, callback: (fileInfos: FileInfo[]) => void): void;

    exists(path: string, callback: (exists: boolean) => void): void;

    listenDir(path: string, callback: (fileEvent: FileEvent) => void): void;

    listenFile(path: string, callback: (fileEvent: FileEvent) => void): void;

    makeDir(path: string, writeMode: WriteMode, callback: () => void): void;

    move(source: string, destination: string, callback: () => void): void;

    readFile(path: string, callback: (data: Uint8Array) => void): void;

    remove(path: string, callback: () => void): void;

    stat(path: string, callback: (fileInfo: FileInfo) => void): void;

    writeFile(
      path: string,
      data: Uint8Array,
      writeOperation: WriteOperation,
      writeMode: WriteMode,
      callback: () => void,
    ): void;

    join(segments: string[], cb: (path: string) => void): void;
  }
}
