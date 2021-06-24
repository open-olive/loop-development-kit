import { process } from '@oliveai/ldk';

import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const processQuery = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    process
      .all()
      .then((processList) => {
        console.debug(JSON.stringify(processList[0].pid));
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const processStream = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
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
