/* eslint-disable */

declare module 'fastestsmallesttextencoderdecoder';
declare const oliveHelps: OliveHelps.Aptitudes;

declare namespace OliveHelps {
  interface Cancellable {
    cancel(): void;
  }

  type Callback<T> = (error: Error | undefined, value: T) => void;

  type ReturnCallback = (obj: Cancellable) => void;

  type Readable<T> = (callback: Callback<T>) => void;

  type ReadableWithParam<TParam, TOut> = (param: TParam, callback: Callback<TOut>) => void;

  type ReadableWithTwoParams<TParam1, TParam2, TOut> = (
    param: TParam1,
    param2: TParam2,
    callback: Callback<TOut>,
  ) => void;

  type ReadableWithFourParams<TParam1, TParam2, TParam3, TParam4, TOut> = (
    param: TParam1,
    param2: TParam2,
    param3: TParam3,
    param4: TParam4,
    callback: Callback<TOut>,
  ) => void;

  type Listenable<T> = (callback: Callback<T>, returnCb: ReturnCallback) => void;

  type ListenableWithParam<TParam, TOut> = (
    param: TParam,
    callback: Callback<TOut>,
    returnCb: ReturnCallback,
  ) => void;

  interface Aptitudes {
    clipboard: Clipboard;
    whisper: WhisperService;
    filesystem: Filesystem;
    cursor: Cursor;
    keyboard: Keyboard;
    network: Network;
    process: Process;
    ui: UI;
    user: User;
    vault: Vault;
    window: Window;
  }

  interface User {
    jwt: Readable<string>;
  }

  //-- Window
  interface Window {
    activeWindow: Readable<WindowInfo>;

    listenActiveWindow: Listenable<WindowInfo>;

    all: Readable<WindowInfo[]>;

    listenAll: Listenable<WindowEvent>;
  }

  interface WindowEvent {
    info: WindowInfo;
    action: WindowAction;
  }
  type WindowActionFocused = 'focus';
  type WindowActionUnfocused = 'unfocused';
  type WindowActionOpened = 'open';
  type WindowActionClosed = 'close';
  type WindowActionMoved = 'move';
  type WindowActionResized = 'resized';
  type WindowActionTitleChanged = 'titleChange';

  type WindowAction =
    | WindowActionFocused
    | WindowActionUnfocused
    | WindowActionOpened
    | WindowActionClosed
    | WindowActionMoved
    | WindowActionResized
    | WindowActionTitleChanged;

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
    remove: ReadableWithParam<string, void>;

    exists: ReadableWithParam<string, boolean>;

    read: ReadableWithParam<string, string>;

    write: ReadableWithTwoParams<string, string, void>;
  }

  //-- UI
  interface UI {
    listenSearchbar: Listenable<string>;

    listenGlobalSearch: Listenable<string>;
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
    all: Readable<ProcessInfo[]>;

    listenAll: Listenable<ProcessEvent>;
  }

  //-- Network
  interface Network {
    httpRequest: ReadableWithParam<HTTPRequest, HTTPResponse>;
    webSocketConnect: ReadableWithParam<SocketConfiguration, Socket>;
  }

  interface SocketConfiguration {
    url: string;
    headers?: Record<string, string[]>;
    useCompression?: boolean;
    subprotocols?: Array<string>;
  }

  enum MessageType {
    text = 1,
    binary = 2,
  }

  interface Socket {
    writeMessage(
      messageType: MessageType,
      data: Array<number>,
      callback: (error: Error | undefined) => void,
    ): void;
    close(callback: (error: Error | undefined) => void): void;
    listenMessage: (
      callback: (error: Error | undefined, messageType: MessageType, data: ArrayBuffer) => void,
      returnCb: ReturnCallback,
    ) => void;
    onCloseHandler(callback: (error: Error | undefined, code: number, text: string) => void): void;
  }

  interface HTTPRequest {
    body?: Array<number>;
    headers?: Record<string, string[]>;
    method: string;
    url: string;
  }

  interface HTTPResponse {
    statusCode: number;
    body: ArrayBuffer;
    headers: Record<string, string[]>;
  }

  //--Keyboard
  interface Keyboard {
    listenHotkey: ListenableWithParam<Hotkey, boolean>;

    listenText: Listenable<string>;

    listenCharacter: Listenable<string>;
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
    position: Readable<Position>;

    listenPosition: Listenable<Position>;
  }

  interface Position {
    x: number;
    y: number;
  }

  //-- Clipboard
  interface Clipboard {
    read: Readable<string>;

    write: ReadableWithParam<string, void>;

    listen: Listenable<string>;

    includeOliveHelpsEvents(enabled: boolean): void;
  }

  //-- Whisper
  interface WhisperService {
    create: ReadableWithParam<NewWhisper, Whisper>;
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

  enum ButtonSize {
    Large = 'large',
    Small = 'small',
  }

  enum ButtonStyle {
    Primary = 'primary',
    Secondary = 'secondary',
    Text = 'text',
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

  interface Whisper {
    id: string;
    close: Readable<undefined>;
    update(whisper: UpdateWhisper, cb?: (err: Error) => void): void;
  }
  interface Component<T extends WhisperComponentType> {
    id?: string;
    type: T;
  }

  type WhisperHandler = (error: Error | undefined, whisper: Whisper) => void;
  type WhisperHandlerWithParam<T> = (error: Error | undefined, param: T, whisper: Whisper) => void;

  type Button = Component<WhisperComponentType.Button> & {
    buttonStyle?: ButtonStyle;
    disabled?: boolean;
    label: string;
    onClick: WhisperHandler;
    size?: ButtonSize;
    tooltip?: string;
  };

  type Checkbox = Component<WhisperComponentType.Checkbox> & {
    label: string;
    tooltip?: string;
    value: boolean;
    onChange: WhisperHandlerWithParam<boolean>;
  };

  type Email = Component<WhisperComponentType.Email> & {
    label: string;
    onChange: WhisperHandlerWithParam<string>;
    tooltip?: string;
    value?: string;
  };

  type Link = Component<WhisperComponentType.Link> & {
    href?: string;
    text: string;
    onClick?: WhisperHandler;
    style?: Urgency;
    textAlign?: TextAlign;
  };

  type ListPair = Component<WhisperComponentType.ListPair> & {
    copyable: boolean;
    labelCopyable?: boolean;
    label: string;
    value: string;
    style: Urgency;
  };

  type Markdown = Component<WhisperComponentType.Markdown> & {
    body: string;
    tooltip?: string;
  };

  type Message = Component<WhisperComponentType.Message> & {
    body?: string;
    header?: string;
    style?: Urgency;
    textAlign?: TextAlign;
    tooltip?: string;
  };

  type NumberInput = Component<WhisperComponentType.Number> & {
    label: string;
    onChange: WhisperHandlerWithParam<number>;
    value?: number;
    max?: number;
    min?: number;
    step?: number;
    tooltip?: string;
  };

  type Password = Component<WhisperComponentType.Password> & {
    label: string;
    onChange: WhisperHandlerWithParam<string>;
    tooltip?: string;
    value?: string;
  };

  type RadioGroup = Component<WhisperComponentType.RadioGroup> & {
    onSelect: WhisperHandlerWithParam<number>;
    options: string[];
    selected?: number;
  };

  type Select = Component<WhisperComponentType.Select> & {
    label: string;
    options: string[];
    onSelect: WhisperHandlerWithParam<number>;
    selected?: number;
    tooltip?: string;
  };

  type Telephone = Component<WhisperComponentType.Telephone> & {
    label: string;
    onChange: WhisperHandlerWithParam<string>;
    // pattern?: RegExp; TODO: Implement this
    tooltip?: string;
    value?: string;
  };

  type TextInput = Component<WhisperComponentType.TextInput> & {
    label: string;
    onChange: WhisperHandlerWithParam<string>;
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
    | Box
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
    onClose?: () => void;
  }

  interface UpdateWhisper {
    label?: string;
    components: Array<Components>;
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
    copy: ReadableWithTwoParams<string, string, void>;

    dir: ReadableWithParam<string, FileInfo[]>;

    exists: ReadableWithParam<string, boolean>;

    listenDir: ListenableWithParam<string, FileEvent>;

    listenFile: ListenableWithParam<string, FileEvent>;

    makeDir: ReadableWithTwoParams<string, WriteMode, void>;

    move: ReadableWithTwoParams<string, string, void>;

    readFile: ReadableWithParam<string, ArrayBuffer>;

    remove: ReadableWithParam<string, void>;

    stat: ReadableWithParam<string, FileInfo>;

    writeFile: ReadableWithFourParams<string, Array<number>, WriteOperation, WriteMode, void>;

    join: ReadableWithParam<string[], string>;
  }
}
