import { promisifyWithTwoParams } from '../promisify';
import { OCRResult, OCRCoordinates } from './types';

export * from './types';

export interface Screen {
  /**
   * Performs screen OCR and returns recognized text ressults.
   * @param  ocrCoordinates - The term that will be used to identify the coordination of cursor???
   * @param  callback - The callback function called when the OCRResult is generated.
   * @returns A Promise resolving with the text results as a string.
   */
  ocr: (
    callback: (error: Error | undefined, value: OCRResult[]) => void,
    ocrCoordinates: OCRCoordinates,
  ) => Promise<void>;
}

export function ocr(
  callback: (error: Error | undefined, value: OCRResult[]) => void,
  ocrCoordinates: OCRCoordinates,
): Promise<void> {
  return promisifyWithTwoParams(callback, ocrCoordinates, oliveHelps.screen.ocr);
}

export const screen: Screen = {
  ocr,
};
