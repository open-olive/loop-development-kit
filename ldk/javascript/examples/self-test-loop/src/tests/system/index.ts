import { system } from '@oliveai/ldk';

export const testOperatingSystem = (): Promise<boolean> =>
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
