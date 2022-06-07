/* eslint-disable no-async-promise-executor */
import { browser } from '@oliveai/ldk';
import {
  NavigationDetails,
  NetworkActivityDetails,
  PageDetails,
  TabChangeDetails,
  UIElementDetails,
} from '@oliveai/ldk/dist/browser';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testOpenTabAndListenNavigation = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const listener = await browser.listenNavigation(
        (navigationEvent: NavigationDetails): void => {
          const { url: eventUrl } = navigationEvent;

          if (eventUrl === URL) {
            listener.cancel();
            resolve(true);
          }

          reject(new Error('The newest tab and URL do not match the test'));
        },
      );

      await browser.openTab(URL);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testOpenTabAndListenNetworkActivity = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const tabId = await browser.openTab(URL);

      const listener = await browser.listenNetworkActivity(
        (networkActivity: NetworkActivityDetails): void => {
          if (networkActivity.tabId === tabId) {
            listener.cancel();
            resolve(true);
          }
        },
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testOpenTabWithSource = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const { id, sourceHTML } = (await browser.openTab(URL, {
        includeSource: true,
      })) as PageDetails;

      if (!sourceHTML.length) {
        reject(new Error('Source did not come back when opening tab'));
      }

      if (!id) {
        reject(new Error('ID not populated'));
      }

      resolve(true);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testOpenWindowWithSource = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const { id, sourceHTML } = (await browser.openWindow(URL, {
        includeSource: true,
      })) as PageDetails;

      if (!sourceHTML.length) {
        reject(new Error('Source did not come back when opening window'));
      }

      if (!id) {
        reject(new Error('ID not populated'));
      }

      resolve(true);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testSourceHTML = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const { id, sourceHTML } = await browser.sourceHTML(URL);
      if (!sourceHTML.length) {
        reject(new Error('Unable to retrieve the source html'));
      }

      if (!id) {
        reject(new Error('ID not populated'));
      }

      resolve(true);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testOpenWindowAndListenNavigation = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const listener = await browser.listenNavigation(
        (navigationEvent: NavigationDetails): void => {
          const { url: eventUrl } = navigationEvent;

          // TODO: Update with Tab ID after S&A team looks into openWindow tab ID bug
          if (eventUrl === URL) {
            listener.cancel();
            resolve(true);
          }

          reject(new Error('The URL opened in the window does not match the test URL'));
        },
      );

      await browser.openWindow(URL);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testTabChangeEvent = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    let listener: void | Cancellable;
    let timeout;

    try {
      const URL = 'https://www.oliveai.dev/';
      const URL2 = 'https://www.oliveai.com/';
      const TITLE = 'Olive Helps Developer Hub';

      await browser.openTab(URL);
      await browser.openTab(URL2);

      const raceResolve = await Promise.race([
        new Promise(async (res) => {
          listener = await browser
            .listenTabChange((tabChangeDetails: TabChangeDetails): void => {
              const { tabId, title, url, windowId } = tabChangeDetails;
              if (tabId && windowId && title === TITLE && url === URL) {
                res(true);
              }
            })
            .catch(reject);
        }),
        new Promise((_res, rej) => {
          // After 3 seconds, if tabs haven't been switched throw error
          timeout = setTimeout(
            () => rej(new Error('The text selection in your browser does not match the test text')),
            3000,
          );
        }),
      ]);

      if (raceResolve) {
        resolve(<boolean>raceResolve);
      }
    } catch (error) {
      console.error(error);
      reject(error);
    } finally {
      if (listener) {
        listener.cancel();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  });

export const testListenTextSelection = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://www.oliveai.dev/';
      const TEXT_TO_SELECT = 'Welcome to the Olive Helps Developer Hub';
      await browser.openTab(URL);
      // A string to update and compare with to decide if text selection is "final"
      let textSelectedSoFar = '';

      const listener = await browser.listenTextSelection((textSelection: string): void => {
        textSelectedSoFar = textSelection;

        if (textSelection === TEXT_TO_SELECT) {
          listener.cancel();
          resolve(true);
        }

        setTimeout(() => {
          // After 2 seconds, if the text selection hasn't changed, assume it's final
          if (textSelectedSoFar === textSelection) {
            reject(new Error('The text selection in your browser does not match the test text'));
          }
        }, 2000);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListenNavigationType = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const URL = 'https://reactrouter.com/';
      await browser.openTab(URL);
      let realNavigation = false;
      let historyNavigation = false;

      const listener = await browser.listenNavigation(
        (navigationEvent: NavigationDetails): void => {
          const { navigationType } = navigationEvent;

          console.debug(JSON.stringify(navigationEvent));

          if (navigationType === 'real') {
            realNavigation = true;
          }
          if (navigationType === 'history') {
            historyNavigation = true;
          }
          if (realNavigation && historyNavigation) {
            listener.cancel();
            resolve(true);
          }
        },
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testListenUIElement = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    let listener: void | Cancellable;
    let timeout;
    try {
      const url = 'https://www.oliveai.dev';
      await browser.openTab(url);
      const uIArguments = {
        selector: '#comp-ksujuy2f > a > div > span.StylableButton2545352419__label',
        listenerType: 'click',
        address: url,
      } as browser.UIElementArguments;

      console.log('calling listenUIElement...');
      const raceResolve = await Promise.race([
        new Promise(async (res) => {
          listener = await browser
            .listenUIElement(uIArguments, (uiElementEvent: UIElementDetails): void => {
              console.log('listenUIElement called');
              console.log(JSON.stringify(uiElementEvent.selector));
              console.log(JSON.stringify(uiElementEvent.type));
              res(true);
            })
            .catch(reject);
        }),
        new Promise((_res, rej) => {
          // After 5 seconds, if tabs haven't been switched throw error
          timeout = setTimeout(
            () => rej(new Error('The text selection in your browser does not match the test text')),
            5000,
          );
        }),
      ]);

      if (raceResolve) {
        resolve(<boolean>raceResolve);
      }
    } catch (error) {
      console.error(error);
      reject(error);
    } finally {
      if (listener) {
        listener.cancel();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  });
