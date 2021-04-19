import { Cancellable } from '../cancellable';

export interface WindowInfo {
  title: string;
  path: string;
  pid: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type WindowActionFocused = "focus"
export type WindowActionUnfocused = "unfocused"
export type WindowActionOpened = "open"
export type WindowActionClosed = "close"
export type WindowActionMoved = "move"
export type WindowActionResized = "resized"
export type WindowActionTitleChanged = "titleChange"

export type WindowAction =
      WindowActionFocused
    | WindowActionUnfocused
    | WindowActionOpened
    | WindowActionClosed
    | WindowActionMoved
    | WindowActionResized
    | WindowActionTitleChanged

export interface WindowEvent {
  info: WindowInfo;
  action: WindowAction;
}

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
  listenActiveWindow(callback: (windowInfo: WindowInfo) => void): Cancellable;

  /**
   * Get a list of all the windows and their information.
   *
   * @returns A promise containing all window info.
   */
  all(): Promise<WindowInfo[]>;

  /**
   * Receive a notification whenever a window is opened, closed, focused, unfocused, moved, resized, or its title changes. A window that is opened with focus will generate an Opened event and a Focused event.
   *
   * @param callback A function called when any window changes.
   */
  listenAll(callback: (windowEvent: WindowEvent) => void): Cancellable;
}

function activeWindow(): Promise<WindowInfo> {
  return new Promise<WindowInfo>((resolve, reject) => {
    try {
      oliveHelps.window.activeWindow((windowInfo: WindowInfo) => resolve(windowInfo));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function listenActiveWindow(callback: (windowInfo: WindowInfo) => void): Cancellable {
  return oliveHelps.window.listenActiveWindow(callback);
}

function all(): Promise<WindowInfo[]> {
  return new Promise<WindowInfo[]>((resolve, reject) => {
    try {
      oliveHelps.window.all((windowInfos: WindowInfo[]) => resolve(windowInfos));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function listenAll(callback: (windowEvent: WindowEvent) => void): Cancellable {
  return oliveHelps.window.listenAll(callback);
}

export const window: Window = {
  activeWindow,
  listenActiveWindow,
  all,
  listenAll,
};
