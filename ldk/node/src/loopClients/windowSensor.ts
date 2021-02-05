import { StoppableStream, StreamListener } from './stoppables';

export interface WindowInfoResponse {
  title: string;
  path: string;
  pid: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum WindowStreamAction {
  Unknown = 'unknown',
  Focused = 'focused',
  Unfocused = 'unfocused',
  Opened = 'opened',
  Closed = 'closed',
  TitleChanged = 'titleChanged',
  Moved = 'moved',
  Resized = 'resized',
}

export interface WindowInfoStreamResponse {
  window: WindowInfoResponse;
  action: WindowStreamAction;
}

/**
 * The WindowSensor provides access to the windows opened in the user's session.
 */
export interface WindowSensor {
  /**
   * Gets the current active window.
   *
   * @returns Promise resolving with information about the current active window.
   */
  queryActiveWindow(): Promise<WindowInfoResponse>;

  /**
   * Gets all the open windows.
   *
   * @returns Promise resolving with a list of all the current windows.
   */
  queryWindows(): Promise<WindowInfoResponse[]>;

  /**
   * Streams changes to the active window.
   *
   * @param listener - Listener function called whenever the active window changes.
   */
  streamActiveWindow(
    listener: StreamListener<WindowInfoResponse>,
  ): StoppableStream<WindowInfoResponse>;

  /**
   * Stream changes to all windows.
   *
   * @param listener - Listener function called whenever a window is opened, changed, or closed.
   */
  streamWindows(
    listener: StreamListener<WindowInfoStreamResponse>,
  ): StoppableStream<WindowInfoStreamResponse>;
}
