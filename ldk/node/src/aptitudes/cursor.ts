import { StoppableStream, StreamListener } from './stoppables';

/**
 * Response object containing the cursor position, where 0,0 is the top-left of the screen.
 */
export interface CursorPosition {
  x: number;
  y: number;
  /**
   * The screen identifier.
   */
  screen: number;
}

/**
 * The Cursor Aptitude allows you to query and listen for the cursor position.
 */
export interface Cursor {
  /**
   * @returns Promise resolving with the cursor position.
   */
  position(): Promise<CursorPosition>;

  /**
   * Listen for cursor position updates.
   *
   * @param listener - The listener function called when the cursor position changes.
   * @returns a StoppableStream object that can be stopped.
   */
  listenPosition(
    listener: StreamListener<CursorPosition>,
  ): StoppableStream<CursorPosition>;
}
