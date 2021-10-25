import { promisifyWithTwoParams } from '../promisify';
import { OCRResult, OCRCoordinates } from './types';

export * from './types';

export interface Screen {
  ocr: (callback: (error: Error | undefined, value: OCRResult[] ) => void, ocrCoordinates: OCRCoordinates, monitor: number ) => 
  void;
}


export function ocr(callback: (error: Error | undefined,value: OCRResult[]) => void,ocrCoordinates:OCRCoordinates, monitor: number): Promise<OCRResult[]> {
    return promisifyWithTwoParams(callback, ocrCoordinates,monitor, oliveHelps.screen.ocr );
//   callback: (error: Error | undefined, value: OCRResult[]) => void,

}
