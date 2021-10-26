import { mocked } from 'ts-jest/utils';
import * as screen from '.';
import { OCRCoordinates, OCRResult } from './types';

describe('screen', () => {
  beforeEach(() => {
    oliveHelps.screen = {
      ocr: jest.fn(),
    };
  });
  describe('ocr', () => {
    it('return a promise of void', () => {
      const ocrCoordinates: OCRCoordinates = {
        top: 1,
        left: 1,
        width: 1,
        height: 1,
      };
      const ocrResultf: OCRResult[] = [
        {
          level: 1,
          page_num: 1,
          block_num: 1,
          par_num: 1,
          line_num: 1,
          word_num: 1,
          left: 1,
          top: 1,
          width: 1,
          height: 1,
          conf: 1,
          text: '',
        },
      ];
      mocked(oliveHelps.screen.ocr).mockImplementation((returnCb, ocrCoordinatesParam) => {
        expect(ocrCoordinatesParam).toEqual(ocrCoordinates);
        returnCb(undefined, ocrResultf);
      });
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.screen.ocr).mockImplementation(() => {
        throw exception;
      });

      expect(screen.ocr).rejects.toBe(exception);
    });
  });
});
