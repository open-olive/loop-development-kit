/**
 * The ClipboardService provides access to the OS's clipboard.
 */
export interface Clipboard {

    /**
   * @returns A Promise resolving with the current contents of the clipboard.
   */
  read(): Promise<string>;

    /**
   * Writes the provided text into the clipboard.
   *
   * @param text
   */
  write(text: string): Promise<void>;
  
  /**
   * Starts listening to changes to the clipboard.
   *
   * @param callback - A function that's called whenever the clipboard's contents change.
   */
  listen(callback: (clipboardText: string) => void): void;
}

export class ClipboardImpl implements Clipboard {

  listen(callback: (clipboardText: string) => void): void {
    return oliveHelps.clipboard.listen(callback);
  }

  read(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        oliveHelps.clipboard.read((clipboardText: string) => resolve(clipboardText));
      } catch (e) {
        reject(e);
        // TODO: add console log
      }
    });
  }

  write(text: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        oliveHelps.clipboard.write(text, () => resolve());
      } catch (e) {
        reject(e);
      }
    });
  }
}
