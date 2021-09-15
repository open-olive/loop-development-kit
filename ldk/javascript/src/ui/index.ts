import { Cancellable } from '../cancellable';
import { promisifyListenable } from '../promisify';

/**
 * The UI aptitude gives access to the Olive helps search bar
 */
export interface UI {
  /**
   * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Searchbar.
   *
   * @param cb - The callback function called when an update to the searchbar occurs.
   */
  listenSearchbar(cb: (val: string) => void): Promise<Cancellable>;

  /**
   * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Global Search.
   *
   * @param cb - The callback function called when an update to the global searchbar occurs.
   */
  listenGlobalSearch(cb: (val: string) => void): Promise<Cancellable>;
}

export function listenSearchbar(callback: (val: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.ui.listenSearchbar);
}

export function listenGlobalSearch(callback: (val: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.ui.listenGlobalSearch);
}
