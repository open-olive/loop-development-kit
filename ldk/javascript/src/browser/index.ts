/**
 * Allows Loops to communicate with a web browser running the Olive Helps extension.
 */
import { Cancellable } from '../cancellable';
import {
  promisifyListenable,
  promisifyListenableWithParam,
  promisifyWithParam,
} from '../promisify';

export type NavigationTypeReal = 'real';
export type NavigationTypeHistory = 'history';

export type NavigationType = NavigationTypeReal | NavigationTypeHistory;

export interface NavigationDetails {
  frameId: number;
  navigationType: NavigationType;
  parentFrameId: number;
  tabId: number;
  timestamp: number;
  url: string;
}

export interface NetworkActivityDetails {
  domain: string;
  frameId: number;
  method: string;
  requestUrl: string;
  requestBody: null | string;
  tabId: number;
  type: string;
}

export interface OpenConfiguration {
  includeSource: boolean;
}

export interface PageDetails {
  id: number;
  sourceHTML: string;
}

export interface TabChangeDetails {
  tabId: number;
  title: string;
  url: string;
  windowId: number;
}

export interface UIElementDetails {
  type: string;
  selector: string;
}
export interface UIElementArguments {
  address: string;
  listenerType?: string;
  selector: string;
}
export interface Browser {
  /**
   * Calls callback on any navigation event pushed from a browser running the Olive Helps extension.
   *
   * @param callback - The callback function called when a navigation event happens.
   */
  listenNavigation(callback: (details: NavigationDetails) => void): Promise<Cancellable>;

  /**
   * Calls callback on any tab change event pushed from a browser running the Olive Helps extension
   *
   * @param callback - the callback function called when a tab change event happens
   */
  listenTabChange(callback: (detail: TabChangeDetails) => void): Promise<Cancellable>;

  /**
   * Calls callback on any text selection event pushed from a browser running the Olive Helps extension.
   *
   * @param callback - The callback function called when text is selected in the browser.
   */
  listenTextSelection(callback: (value: string) => void): Promise<Cancellable>;

  /**
   * Calls the callback on any network activity event pushed from a browser running the Olive Helps extension.
   *
   * @param callback - The callback function called when a network activity event happens.
   */
  listenNetworkActivity(callback: (details: NetworkActivityDetails) => void): Promise<Cancellable>;

  /**
   * Calls the callback when an event is pushed from the provided UIElement in a browser running the olive Helps extension.
   *
   * @param uiElementArguments - { selector: string; address: string;} You can get an element's selector by inspecting the element -> right click the HTML tag -> copy -> copy selector. Address is the pre-defined website address to perform listenUIElement
   * @param callback - The callback function called when a click event happens in a pre-defined website.
   */
  listenUIElement(
    uiElementArguments: UIElementArguments,
    callback: (details: UIElementDetails) => void,
  ): Promise<Cancellable>;

  /**
   * Opens a tab in the browser running the Olive Helps extension.
   *
   * @param address - The address to navigate to in the tab.
   * @param configuration - An optional configuration object that determines how the function behaves
   * @returns The tab ID of the new tab or a PageDetails object with both the id and source if the configuration object specifies to include the source
   */
  openTab(
    address: string,
    configuration?: OpenConfiguration,
  ): Promise<number> | Promise<PageDetails>;

  /**
   * Opens a window in the browser running the Olive Helps extension.
   *
   * @param address - The address to navigate to in the new window.
   * @param configuration - An optional configuration object that determines how the function behaves
   * @returns The window ID of the new window or a PageDetails object with both the id and source if the configuration object specifies to include the source
   */
  openWindow(
    address: string,
    configuration?: OpenConfiguration,
  ): Promise<number> | Promise<PageDetails>;

  /**
   * Retrieves the source for the specified url
   *
   * @param address - The address to retrieve the source for
   * @returns An object containing the id of the tab or window and the html source
   */
  sourceHTML(address: string): Promise<PageDetails>;
}

export function listenNavigation(
  callback: (details: NavigationDetails) => void,
): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.browser.listenNavigation);
}

export function listenTabChange(
  callback: (details: TabChangeDetails) => void,
): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.browser.listenTabChange);
}

export function listenTextSelection(callback: (value: string) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.browser.listenTextSelection);
}

export function listenNetworkActivity(
  callback: (details: NetworkActivityDetails) => void,
): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.browser.listenNetworkActivity);
}

export function openTab(
  address: string,
  configuration?: OpenConfiguration,
): Promise<number> | Promise<PageDetails> {
  if (configuration?.includeSource) {
    return promisifyWithParam(address, oliveHelps.browser.openTab2);
  }
  return promisifyWithParam(address, oliveHelps.browser.openTab);
}

export function openWindow(
  address: string,
  configuration?: OpenConfiguration,
): Promise<number> | Promise<PageDetails> {
  if (configuration?.includeSource) {
    return promisifyWithParam(address, oliveHelps.browser.openWindow2);
  }
  return promisifyWithParam(address, oliveHelps.browser.openWindow);
}

export function sourceHTML(address: string): Promise<PageDetails> {
  return promisifyWithParam(address, oliveHelps.browser.sourceHTML);
}

export function listenUIElement(
  uiElementArguments: UIElementArguments,
  callback: (details: UIElementDetails) => void,
): Promise<Cancellable> {
  return promisifyListenableWithParam(
    uiElementArguments,
    callback,
    oliveHelps.browser.listenUIElement,
  );
}
