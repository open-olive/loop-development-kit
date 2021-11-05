import { promisifyWithParam } from '../promisify';
import { OCRResult, OCRCoordinates } from './types';

export * from './types';

/**
 *  @ignore Screen aptitude allows Loops to enable Optical character recognition ability.
 */
export interface Screen {
  /**
   * @ignore
   * Performs screen OCR and returns recognized text ressults.
   * @param  ocrCoordinates? - The term that will be used to identify the coordination of cursor???
   * @returns A Promise resolving with the text results as a string.
   */
  ocr(ocrCoordinates?: OCRCoordinates): Promise<OCRResult[]>;
}

export function ocr(ocrCoordinates: OCRCoordinates): Promise<OCRResult[]> {
  return promisifyWithParam(ocrCoordinates, oliveHelps.screen.ocr);
}
