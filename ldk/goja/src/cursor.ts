/**
 * Response object containing the cursor position, where 0,0 is the top-left of the screen.
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * The CursorService provides access to the cursor position.
 */
export interface Cursor {

  /**
   * @returns Promise resolving with the cursor position.
   */
  position(): Promise<Position>

   /**
   * Starts listening to changes to the clipboard.
   *
   * @param callback - The callback function called when the function changes.
   */
  listenPosition(callback: (pos: Position) => void): void
}

function position(): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      try {
        oliveHelps.cursor.position((pos: Position) => resolve(pos));
      } catch (error) {
        console.log(error.getMessage(), error);
        reject(error);
      }
    });
  }
 
function listenPosition(callback: (pos: Position) => void): void {
    oliveHelps.cursor.listenPosition(callback);
}

export const cursor: Cursor = {
  position,
  listenPosition
}
