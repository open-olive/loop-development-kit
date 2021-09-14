declare namespace Window {
  interface Aptitude {
    activeWindow: Common.Readable<WindowInfo>;

    listenActiveWindow: Common.Listenable<WindowInfo>;

    all: Common.Readable<WindowInfo[]>;

    listenAll: Common.Listenable<WindowEvent>;
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
}
