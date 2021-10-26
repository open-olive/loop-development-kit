import { promisifyWithThreeParams } from '../promisify';
import { OCRResult, OCRCoordinates } from './types';

export * from './types';

export interface Screen {
  ocr: (
    callback: (error: Error | undefined, value: OCRResult[]) => void,
    ocrCoordinates: OCRCoordinates,
    monitor: number,
  ) => Promise<void>;
}

export function ocr(
  callback: (error: Error | undefined, value: OCRResult[]) => void,
  ocrCoordinates: OCRCoordinates,
  monitor: number,
): Promise<void> {
  return promisifyWithThreeParams(callback, ocrCoordinates, monitor, oliveHelps.screen.ocr);
  //   callback: (error: Error | undefined, value: OCRResult[]) => void,
}
