import { system, whisper } from '@oliveai/ldk';

import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const operatingSystemTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    system
      .operatingSystem()
      .then((os) => {
        console.debug(`System Aptitude: operatingSystem: ${os}`);
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });
