import { promisifyWithParam } from '../promisify';
import { OCRResult, OCRCoordinates } from './types';

export * from './types';

/**
 *  Screen aptitude allows Loops to enable Optical character recognition ability.
 */
export interface Screen {
  /**
   * Performs screen OCR and returns recognized text ressults.
   * @param  ocrCoordinates? The ocrCoordinates is used to identify an area on the screen to search for text
   * @returns A Promise resolving with the text results as a string.
   */
  ocr(ocrCoordinates?: OCRCoordinates): Promise<OCRResult[]>;
}

export function ocr(ocrCoordinates: OCRCoordinates): Promise<OCRResult[]> {
  return promisifyWithParam(ocrCoordinates, oliveHelps.screen.ocr);
}
