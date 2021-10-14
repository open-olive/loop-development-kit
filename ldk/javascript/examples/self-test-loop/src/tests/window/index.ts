import { window } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testListenActiveWindow = (): Promise<boolean> =>
  new Promise((resolve) => {
    let activeWindowStream: Cancellable;
    window
      .listenActiveWindow((response) => {
        if (response) {
          console.debug('Window become active', 'response', response.title);
          activeWindowStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => {
        activeWindowStream = cancellable;
      });
  });

export const testActiveWindow = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .activeWindow()
      .then((windowInfo) => {
        console.debug(windowInfo.height);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const testWindowAll = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .all()
      .then((allWindows) => {
        console.debug(allWindows.length);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const testWindowInfoPath = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .all()
      .then((windowInfoArr) => {
        if (!windowInfoArr.length) {
          reject('No windows found');
          return;
        }

        const windowInfo = windowInfoArr[0];
        windowInfo.path ? resolve(true) : reject('No path on window info');
      })
      .catch((e) => {
        reject(e);
      });
  });
