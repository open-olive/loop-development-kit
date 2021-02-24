import { StoppableStream, StreamListener } from './stoppables';
export interface WindowInfo {
    title: string;
    path: string;
    pid: number;
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare enum WindowAction {
    Unknown = "unknown",
    Focused = "focused",
    Unfocused = "unfocused",
    Opened = "opened",
    Closed = "closed",
    TitleChanged = "titleChanged",
    Moved = "moved",
    Resized = "resized"
}
export interface WindowEvent {
    window: WindowInfo;
    action: WindowAction;
}
/**
 * The Window provides access to the windows opened in the user's session.
 *
 * This service is not yet implemented.
 */
export interface Window {
    /**
     * Gets the current active window.
     *
     * @returns Promise resolving with information about the current active window.
     */
    activeWindow(): Promise<WindowInfo>;
    /**
     * Gets all the open windows.
     *
     * @returns Promise resolving with a list of all the current windows.
     */
    windows(): Promise<WindowInfo[]>;
    /**
     * Streams changes to the active window.
     *
     * @param listener - Listener function called whenever the active window changes.
     */
    listenActiveWindow(listener: StreamListener<WindowInfo>): StoppableStream<WindowInfo>;
    /**
     * Stream changes to all windows.
     *
     * @param listener - Listener function called whenever a window is opened, changed, or closed.
     */
    listenWindows(listener: StreamListener<WindowEvent>): StoppableStream<WindowEvent>;
}
