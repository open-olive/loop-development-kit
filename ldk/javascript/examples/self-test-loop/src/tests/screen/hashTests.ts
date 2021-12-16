import { screen } from '@oliveai/ldk';
import { Bounds, HashType } from '@oliveai/ldk/dist/screen';
import { Cancellable } from '../../../../../dist/cancellable';

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
      const fullScreen: Bounds = {
        top: 0,
        left: 0,
        width: 512,
        height: 512,
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

export const testCompareHash = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const hashA = 'bbbb';
      const hashB = 'cccc';
      const expectedDistance = 4;

      let distance = await screen.compareHash(hashA, hashB);
      if (distance != expectedDistance) {
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
        if (Object.values(verified).indexOf(false) == -1) {
          resolve(true);
        }
      }

      function generateCb(fnType: string) {
        return (distance: number) => {
          verified[fnType] = true;
          listeners[fnType].cancel();
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
        .listenPixelDiff(bounds, threshold, delayMs, generateCb('pixelDiff'))
        .then((cancellable) => (listeners['pixelDiff'] = cancellable));

      screen
        .listenPixelDiffActiveWindow(threshold, delayMs, generateCb('activeWindow'))
        .then((cancellable) => (listeners['activeWindow'] = cancellable));
    } catch (error) {
      reject(error);
    }
  });
