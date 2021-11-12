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

export const testListenAll = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let activeStream: Cancellable;
    const actionsReceived = {
      blur: false,
      close: false,
      focus: false,
      move: false,
      open: false,
      resize: false,
      titleChange: false,
    };

    window
      .listenAll((windowEvent) => {
        console.debug('received action:', windowEvent.action);
        const { action } = windowEvent;
        actionsReceived[action] = true;

        const values = Array.from(Object.values(actionsReceived));

        if (!values.includes(false)) {
          resolve(true);
          activeStream.cancel();
        } else {
          console.debug(values);
        }
      })
      .then((cancellable: Cancellable) => {
        activeStream = cancellable;
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
