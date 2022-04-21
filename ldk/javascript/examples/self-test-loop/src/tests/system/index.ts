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

export const testGetEnvironment = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    system
      .getEnvironment()
      .then((getEnvironment) => {
        console.debug(`System Aptitude: getEnvironment: osVersion: ${getEnvironment.osVersion}`);
        console.debug(
          `System Aptitude: getEnvironment: oliveHelpsVersion: ${getEnvironment.oliveHelpsVersion}`,
        );
        console.debug(
          `System Aptitude: getEnvironment: loopVersion: ${getEnvironment.loopVersion}`,
        );
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });
