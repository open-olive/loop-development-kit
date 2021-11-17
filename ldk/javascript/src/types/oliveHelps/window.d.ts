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

  type WindowActionBlur = 'blur';
  type WindowActionClosed = 'close';
  type WindowActionFocused = 'focus';
  type WindowActionMoved = 'move';
  type WindowActionOpened = 'open';
  type WindowActionResize = 'resize';
  type WindowActionTitleChanged = 'titleChange';

  type WindowAction =
    | WindowActionBlur
    | WindowActionClosed
    | WindowActionFocused
    | WindowActionMoved
    | WindowActionOpened
    | WindowActionResize
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
