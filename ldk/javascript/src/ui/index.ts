/**
 * The UI aptitude gives access to the Olive helps search bar
 */
import { Cancellable } from '../cancellable';
import { promisifyListenable } from '../promisify';

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

function listenSearchbar(callback: (val: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.ui.listenSearchbar);
}

function listenGlobalSearch(callback: (val: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.ui.listenGlobalSearch);
}

export const ui: UI = {
  listenSearchbar,
  listenGlobalSearch,
};
