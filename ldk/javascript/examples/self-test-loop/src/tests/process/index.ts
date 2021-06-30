import { process } from '@oliveai/ldk';

import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testProcess = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    process
      .all()
      .then((processList) => {
        console.debug(JSON.stringify(processList[0].pid));
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const testListenAll = (): Promise<boolean> =>
  new Promise((resolve) => {
    let cancellableStream: Cancellable;
    process
      .listenAll((response) => {
        console.debug(response.processInfo.pid);
        cancellableStream.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => {
        cancellableStream = cancellable;
      });
  });
