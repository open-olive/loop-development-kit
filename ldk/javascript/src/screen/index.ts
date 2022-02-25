import { Cancellable } from '../cancellable';
import {
  promisifyListenable,
  promisifyListenableWithFourParams,
  promisifyListenableWithThreeParams,
  promisifyListenableWithTwoParams,
  promisifyWithParam,
  promisifyWithTwoParams,
} from '../promisify';
import { Bounds, HashType, OCRResult, OCRCoordinates, OcrEvent } from './types';

export * from './types';

/**
 *  Screen aptitude allows Loops to enable Optical character recognition ability.
 */
export interface Screen {
  /**
   * Performs screen OCR and returns recognized text ressults.
   * @param  ocrCoordinates? - The ocrCoordinates is used to identify an area on the screen to search for text
   * @returns A Promise resolving with the text results as a string.
   */
  ocr(ocrCoordinates?: OCRCoordinates): Promise<OCRResult[]>;

  /**
   * @experimental This functionality is experimental and subject to breaking changes.
   * Calculates the image hash of the specified screen area using the specified hash algorithm
   * @param bounds - The area on the screen where to take the hash.
   * @param sensitivity - Controls the hash size. Larger hash sizes will be more sensitive to changes. Exceeding a value of 3 will result in a very slow calculation and is not recommended. Must be a positive integer.
   * @param hashType? - Specifies the type of hash to use. By default it uses the average hashing algorithm.
   * @returns A promise resolving with the hash of the selected area
   */
  hash(bounds: Bounds, sensitivity: number, hashType?: HashType): Promise<string>;

  /**
   * @experimental This functionality is experimental and subject to breaking changes.
   * Returns the hamming distance between the two hashes. The more the hashes differ, the larger the distance will be. If the hashes are equal, the distance will be 0.
   * @param hashA - The first hash to compare
   * @param hashB - The second hash to compare
   * @returns A promise with the hamming distance from hashA to hashB
   */
  compareHash(hashA: string, hashB: string): Promise<number>;

  /**
   * @experimental This functionality is experimental and subject to breaking changes.
   * Monitors the specified screen area for changes. The callback is called when a change is detected. The screen is considered different when the distance between subsequent hashes exceeds the provided threshold.
   * @param bounds - The area on the screen to monitor for changes
   * @param threshold - The distance between subsequent hashes required to trigger the callback. Must be a positive integer.
   * @param delayMs - The delay in milliseconds between checks. Must be a positive integer.
   * @param sensitivity -controls the hash size. Larger hash sizes will be more sensitive to changes. Exceeding a value of 3 will result in a very slow calculation and is not recommended. Must be a positive integer.
   * @param hashType - Specifies the type of hash to use
   * @param callback - The function called when the distance between hashes results in a value higher than the specified threshold value.
   */
  listenHash(
    bounds: Bounds,
    threshold: number,
    delayMs: number,
    sensitivity: number,
    hashType: HashType,
    callback: (distance: number) => void,
  ): Promise<Cancellable>;

  /**
   * @experimental This functionality is experimental and subject to breaking changes.
   * Monitors the specified screen area for changes. The callback is called when a change is detected. The screen is considered different when the distance between subsequent hashes exceeds the provided threshold. This counts the number of differences in the image by pixel component. The returned difference is a number between 0 and 1. A difference of 0 means the images are the same. A difference of 1 means the images are entirely different.
   * @param bounds - The area on the screen to monitor for changes
   * @param threshold - The required difference to trigger the callback. Ranges from 0-1.
   * @param delayMs - The delay in milliseconds between checks. Must be a positive integer.
   * @param callback - The function to call when a change is detected
   */
  listenPixelDiff(
    bounds: Bounds,
    threshold: number,
    delayMs: number,
    callback: (difference: number) => void,
  ): Promise<Cancellable>;

  /**
   * @experimental This functionality is experimental and subject to breaking changes.
   * Monitors the active window for changes. The callback is called when a change is detected. The screen is considered different when the distance between subsequent hashes exceeds the provided threshold. This counts the number of differences in the image by pixel component. The returned difference is a number between 0 and 1. A difference of 0 means the images are the same. A difference of 1 means the images are entirely different.
   * @param threshold - The required difference to trigger the callback. Rnages from 0-1.
   * @param delayMs - The delay in milliseconds between checks. Must be a positive integer.
   * @param callback - The function to call when a change is detected
   */
  listenPixelDiffActiveWindow(
    threshold: number,
    delayMs: number,
    callback: (difference: number) => void,
  ): Promise<Cancellable>;
  /**
   * @experimental This functionality is experimental and subject to breaking changes.
   * listenOcrMonitor listens to active window changes. This function provides active window recognition on the backend.
   * @param ocrEvents - The event that records bounds and text changes.
   */
  listenOcrMonitor(callback: (ocrEvents: OcrEvent[]) => void): Promise<Cancellable>;
}

export function ocr(ocrCoordinates: OCRCoordinates): Promise<OCRResult[]> {
  return promisifyWithParam(ocrCoordinates, oliveHelps.screen.ocr);
}

export function hash(bounds: Bounds, sensitivity: number, hashType?: HashType): Promise<string> {
  const defaultOrHashType = hashType || HashType.Average;
  switch (defaultOrHashType) {
    case HashType.Difference:
      return promisifyWithTwoParams(bounds, sensitivity, oliveHelps.screen.differenceHash);
    case HashType.Perception:
      return promisifyWithTwoParams(bounds, sensitivity, oliveHelps.screen.perceptionHash);
    case HashType.Average:
    default:
      return promisifyWithTwoParams(bounds, sensitivity, oliveHelps.screen.averageHash);
  }
}

export function compareHash(hashA: string, hashB: string): Promise<number> {
  return promisifyWithTwoParams(hashA, hashB, oliveHelps.screen.compareHashes);
}

export function listenHash(
  bounds: Bounds,
  threshold: number,
  delayMs: number,
  sensitivity: number,
  hashType: HashType,
  callback: (distance: number) => void,
): Promise<Cancellable> {
  let listenFunc: Common.ListenableWithFourParams<Bounds, number, number, number, number>;

  switch (hashType) {
    case HashType.Difference:
      listenFunc = oliveHelps.screen.listenDifferenceHash;
      break;
    case HashType.Perception:
      listenFunc = oliveHelps.screen.listenPerceptionHash;
      break;
    case HashType.Average:
    default:
      listenFunc = oliveHelps.screen.listenAverageHash;
      break;
  }

  return promisifyListenableWithFourParams(
    bounds,
    threshold,
    delayMs,
    sensitivity,
    callback,
    listenFunc,
  );
}

export function listenPixelDiff(
  bounds: Bounds,
  threshold: number,
  delayMs: number,
  callback: (difference: number) => void,
): Promise<Cancellable> {
  return promisifyListenableWithThreeParams(
    bounds,
    threshold,
    delayMs,
    callback,
    oliveHelps.screen.listenPixelDiff,
  );
}

export function listenPixelDiffActiveWindow(
  threshold: number,
  delayMs: number,
  callback: (difference: number) => void,
): Promise<Cancellable> {
  return promisifyListenableWithTwoParams(
    threshold,
    delayMs,
    callback,
    oliveHelps.screen.listenPixelDiffActiveWindow,
  );
}
export function listenOcrMonitor(callback: (ocrEvents: OcrEvent[]) => void): Promise<Cancellable> {
  return promisifyListenable(callback, oliveHelps.screen.listenOcrMonitor);
}
