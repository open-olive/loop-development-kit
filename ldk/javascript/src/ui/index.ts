/**
 * The UI aptitude gives access to the Olive helps search bar
 */
export interface UI {
    /**
     * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Searchbar.
     *
     * @param callback - The callback function called when an update to the searchbar occurs.
     */
    listenSearchbar(cb: (val: string) => void): void;
  
    /**
     * Creates a stream receiving updates whenever the user enters a search in the Olive Helps Global Search.
     *
     * @param callback - The callback function called when an update to the global searchbar occurs.
     */
    listenGlobalSearch(cb: (val: string) => void): void;
  }
  
  export function listenSearchbar(callback: (val: string) => void): void {
    return oliveHelps.ui.listenSearchbar(callback);
  }
  
  export function listenGlobalSearch(callback: (val: string) => void): void {
    return oliveHelps.ui.listenGlobalSearch(callback);
  }