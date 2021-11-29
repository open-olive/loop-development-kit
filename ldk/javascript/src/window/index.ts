import { Cancellable } from '../cancellable';
import { promisify, promisifyListenable } from '../promisify';

export interface WindowInfo {
  title: string;
  path: string;
  pid: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type WindowActionBlur = 'blur';
export type WindowActionClosed = 'close';
export type WindowActionFocused = 'focus';
export type WindowActionMoved = 'move';
export type WindowActionOpened = 'open';
export type WindowActionResize = 'resize';
export type WindowActionTitleChanged = 'titleChange';

export type WindowAction =
  | WindowActionBlur
  | WindowActionClosed
  | WindowActionFocused
  | WindowActionMoved
  | WindowActionOpened
  | WindowActionResize
  | WindowActionTitleChanged;

export interface WindowEvent {
  info: WindowInfo;
  action: WindowAction;
}

/**
 *  The Window aptitude provides access to the the ability to identyfy window status.
 */
export interface Window {
  /**
   * Get the currently focused window and it's data.
   *
   * @returns A promise containing active window info.
   */
  activeWindow(): Promise<WindowInfo>;

  /**
   * Receive notifications whenever the currently focused window changes.
   *
   * @param callback A function called when active window changes.
   */
  listenActiveWindow(callback: (windowInfo: WindowInfo) => void): Promise<Cancellable>;

  /**
   * Get a list of all the windows and their information.
   *
   * @returns A promise containing all window info.
   */
  all(): Promise<WindowInfo[]>;

  /**
   * Receive a notification whenever a window is opened, closed, focused,
   * unfocused, moved, resized, or its title changes. A window that is
   * opened with focus will generate an Opened event and a Focused event.
   *
   * @param callback A function called when any window changes.
   */
  listenAll(callback: (windowEvent: WindowEvent) => void): Promise<Cancellable>;
}

export function activeWindow(): Promise<WindowInfo> {
  return promisify(oliveHelps.window.activeWindow);
}

export function listenActiveWindow(
  callback: (windowInfo: WindowInfo) => void,
): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.window.listenActiveWindow);
}

export function all(): Promise<WindowInfo[]> {
  return promisify(oliveHelps.window.all);
}

export function listenAll(callback: (windowEvent: WindowEvent) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.window.listenAll);
}
