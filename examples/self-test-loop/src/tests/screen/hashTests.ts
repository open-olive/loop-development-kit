import { screen } from '@oliveai/ldk';
import { Bounds, HashType } from '@oliveai/ldk/dist/screen';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testFullScreenHash = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const fullScreen: Bounds = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      };

      const sensitivity: number = 1;

      await screen.hash(fullScreen, sensitivity);
      const averageHash = await screen.hash(fullScreen, sensitivity, HashType.Average);
      const differenceHash = await screen.hash(fullScreen, sensitivity, HashType.Difference);
      const perceptionHash = await screen.hash(fullScreen, sensitivity, HashType.Perception);

      const usedDifferentAlg =
        averageHash != differenceHash &&
        averageHash != perceptionHash &&
        differenceHash != perceptionHash;
      if (usedDifferentAlg) {
        resolve(true);
      } else {
        reject('Algorithm hashes returned the same');
      }
    } catch (error) {
      reject(error);
    }
  });

export const testScreenHash = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const bounds: Bounds = {
        top: 0,
        left: 0,
        width: 512,
        height: 512,
      };

      const sensitivity: number = 1;

      await screen.hash(bounds, sensitivity);
      const averageHash = await screen.hash(bounds, sensitivity, HashType.Average);
      const differenceHash = await screen.hash(bounds, sensitivity, HashType.Difference);
      const perceptionHash = await screen.hash(bounds, sensitivity, HashType.Perception);

      const usedDifferentAlg =
        averageHash != differenceHash &&
        averageHash != perceptionHash &&
        differenceHash != perceptionHash;
      if (usedDifferentAlg) {
        resolve(true);
      } else {
        reject('Algorithm hashes returned the same');
      }
    } catch (error) {
      reject(error);
    }
  });

export const testCompareHash = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const boundsA: Bounds = {
        top: 0,
        left: 0,
        width: 512,
        height: 512,
      };

      const boundsB: Bounds = {
        top: 0,
        left: 512,
        width: 512,
        height: 512,
      };

      const sensitivity: number = 1;

      const hashA = await screen.hash(boundsA, sensitivity);
      const hashB = await screen.hash(boundsB, sensitivity);

      let distance = await screen.compareHash(hashA, hashB);
      if (distance == 0) {
        reject(`Distance between ${hashA} and ${hashB} resulted in ${distance}`);
      }

      distance = await screen.compareHash(hashA, hashA);
      if (distance != 0) {
        reject('Same hash resulted in a distance != 0');
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const testListenFunctions = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const verified: { [key: string]: boolean } = {
        average: false,
        perception: false,
        difference: false,
        pixelDiff: false,
        activeWindow: false,
      };

      const listeners: { [key: string]: Cancellable } = {};

      const delayMs = 2500;
      const sensitivity = 1;
      HashType.Average;
      const threshold = 3;
      const bounds = {
        top: 0,
        left: 0,
        width: 256,
        height: 256,
      };

      function verifyAllCalled() {
        console.log(JSON.stringify(verified));
        if (Object.values(verified).indexOf(false) == -1) {
          resolve(true);
        }
      }

      function clearListener(fnType: string) {
        console.log(`Clearing ${fnType} listener`);
        if (listeners[fnType]) {
          listeners[fnType].cancel();
          listeners[fnType] = undefined;
        }
      }

      function generateCb(fnType: string) {
        return (distance: number) => {
          console.log(`${fnType} callback called.`);
          verified[fnType] = true;
          setTimeout(() => clearListener(fnType), 0);
          setTimeout(verifyAllCalled, 0);
        };
      }

      screen
        .listenHash(
          bounds,
          threshold,
          delayMs,
          sensitivity,
          HashType.Average,
          generateCb('average'),
        )
        .then((cancellable) => (listeners['average'] = cancellable));

      screen
        .listenHash(
          bounds,
          threshold,
          delayMs,
          sensitivity,
          HashType.Perception,
          generateCb('perception'),
        )
        .then((cancellable) => (listeners['perception'] = cancellable));

      screen
        .listenHash(
          bounds,
          threshold,
          delayMs,
          sensitivity,
          HashType.Difference,
          generateCb('difference'),
        )
        .then((cancellable) => (listeners['difference'] = cancellable));

      screen
        .listenPixelDiff(bounds, 0.25, delayMs, generateCb('pixelDiff'))
        .then((cancellable) => (listeners['pixelDiff'] = cancellable));

      screen
        .listenPixelDiffActiveWindow(0.25, delayMs, generateCb('activeWindow'))
        .then((cancellable) => (listeners['activeWindow'] = cancellable));
    } catch (error) {
      reject(error);
    }
  });
