/**
 * Response object containing the cursor position, where 0,0 is the top-left of the screen.
 */
import { Cancellable } from '../cancellable';
import { promisify, promisifyListenable } from '../promisify';

export interface Position {
  x: number;
  y: number;
}

/**
 *  Cursor Aptitude provides access to the cursor position.
 */
export interface Cursor {
  /**
   * @returns Promise resolving with the cursor position.
   */
  position(): Promise<Position>;

  /**
   * Starts listening to changes to the clipboard.
   *
   * @param callback - The callback function called when the function changes.
   */
  listenPosition(callback: (pos: Position) => void): Promise<Cancellable>;
}

export function position(): Promise<Position> {
  return promisify(oliveHelps.cursor.position);
}

export function listenPosition(callback: (pos: Position) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.cursor.listenPosition);
}
