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
    system: System;
    ui: UI;
    user: User;
    vault: Vault;
    window: Window;
  }

  interface Cancellable {
    cancel(): void;
  }

  type Callback<T> = (error: Error | undefined, value: T) => void;

  type ReturnCallback = (obj: Cancellable) => void;

  type Readable<T> = (callback: Callback<T>) => void;

  type ReadableWithParam<TParam, TOut> = (param: TParam, callback: Callback<TOut>) => void;
  type ReadableWithParamAfterCallback<TOut, TParam> = (
    callback: Callback<TOut>,
    param: TParam,
  ) => void;

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

  //-- User
  interface JWTConfig {
    includeEmail?: boolean;
  }
  interface User {
    jwt: ReadableWithParamAfterCallback<string, JWTConfig>;
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
  /**
   * Unknown = 0, Started = 1, Stopped = 2
   */
  type ProcessActionUnknown = 0;
  type ProcessActionStarted = 1;
  type ProcessActionStopped = 2;
  type ProcessAction = ProcessActionUnknown | ProcessActionStarted | ProcessActionStopped;

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

  //-- System
  interface System {
    operatingSystem: Readable<string>;
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

  type MessageTypeText = 1;
  type MessageTypeBinary = 2;
  type MessageType = MessageTypeText | MessageTypeBinary;

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
    timeoutMs?: number;
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

  //-- Filesystem
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

  type WriteOperationOverwrite = 1;
  type WriteOperationAppend = 2;
  type WriteOperation = WriteOperationOverwrite | WriteOperationAppend;

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

  //-- Whisper
  type WhisperComponentType =
    | 'box'
    | 'button'
    | 'checkbox'
    | 'collapseBox'
    | 'divider'
    | 'email'
    | 'link'
    | 'listPair'
    | 'markdown'
    | 'message'
    | 'number'
    | 'password'
    | 'radioGroup'
    | 'select'
    | 'telephone'
    | 'textInput'
    | 'dateTimeInput';

  type Urgency = 'error' | 'none' | 'success' | 'warning';

  type Alignment =
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'left'
    | 'right'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';

  type AlignItems = 'center' | 'flex-end' | 'flex-start' | 'stretch';

  type ButtonSize = 'large' | 'small';

  type ButtonStyle = 'primary' | 'secondary' | 'text';

  type Direction = 'horizontal' | 'vertical';

  type TextAlign = 'center' | 'left' | 'right';

  type DateTimeType = 'date' | 'time' | 'date_time';

  interface Whisper {
    id: string;
    close: Readable<undefined>;
    update(whisper: UpdateWhisper, cb?: (err: Error) => void): void;
  }

  interface Component<T extends WhisperComponentType> {
    id?: string;
    type: T;
    key?: string;
  }

  interface InputComponent<T1 extends WhisperComponentType, T2> extends Component<T1> {
    label: string;
    tooltip?: string;
    validationError?: string;
    value?: T2;
    onBlur?: (error: Error | undefined) => void;
    onFocus?: (error: Error | undefined) => void;
    onChange: WhisperHandlerWithParam<T2>;
  }

  interface SelectComponent<T extends WhisperComponentType> extends Component<T> {
    validationError?: string;
  }

  type WhisperHandler = (error: Error | undefined, whisper: Whisper) => void;
  type WhisperHandlerWithParam<T> = (error: Error | undefined, param: T, whisper: Whisper) => void;

  type Button = Component<'button'> & {
    buttonStyle?: ButtonStyle;
    disabled?: boolean;
    label: string;
    onClick: WhisperHandler;
    size?: ButtonSize;
    tooltip?: string;
  };

  type Link = Component<'link'> & {
    href?: string;
    text: string;
    onClick?: WhisperHandler;
    style?: Urgency;
    textAlign?: TextAlign;
  };

  type ListPair = Component<'listPair'> & {
    copyable: boolean;
    labelCopyable?: boolean;
    label: string;
    value: string;
    style: Urgency;
  };

  type Markdown = Component<'markdown'> & {
    copyable?: 'body';
    body: string;
    tooltip?: string;
  };

  type Message = Component<'message'> & {
    copyable?: 'body' | 'header';
    body?: string;
    header?: string;
    style?: Urgency;
    textAlign?: TextAlign;
    tooltip?: string;
  };

  type Email = InputComponent<'email', string>;

  type Password = InputComponent<'password', string>;

  type Telephone = InputComponent<'telephone', string>;

  type TextInput = InputComponent<'textInput', string>;

  type NumberInput = InputComponent<'number', number> & {
    max?: number;
    min?: number;
    step?: number;
  };

  type RadioGroup = SelectComponent<'radioGroup'> & {
    onSelect: WhisperHandlerWithParam<number>;
    options: string[];
    selected?: number;
  };

  type Checkbox = SelectComponent<'checkbox'> & {
    label: string;
    tooltip?: string;
    value?: boolean;
    onChange: WhisperHandlerWithParam<boolean>;
  };

  type Select = SelectComponent<'select'> & {
    label: string;
    options: string[];
    onSelect: WhisperHandlerWithParam<number>;
    selected?: number;
    tooltip?: string;
  };

  type DateTimeInput = InputComponent<'dateTimeInput', string> & {
    dateTimeType: DateTimeType;
    value?: string;
    min?: string;
    max?: string;
  };

  type Divider = Component<'divider'>;

  type CollapseBox = Component<'collapseBox'> & {
    children: Array<ChildComponents>;
    label?: string;
    open: boolean;
    onClick?: WhisperHandlerWithParam<boolean>;
  };

  type Box = Component<'box'> & {
    alignItems?: AlignItems;
    alignment: Alignment;
    children: Array<ChildComponents>;
    direction: Direction;
    onClick?: WhisperHandler;
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
    | TextInput
    | DateTimeInput;

  type Components = ChildComponents | CollapseBox;

  interface NewWhisper {
    label: string;
    components: Array<Components>;
    onClose?: () => void;
  }

  interface UpdateWhisper {
    label?: string;
    components: Array<Components>;
  }

  interface WhisperService {
    create: ReadableWithParam<NewWhisper, Whisper>;
  }
}
