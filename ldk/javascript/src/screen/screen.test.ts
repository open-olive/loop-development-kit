import { mocked } from 'ts-jest/utils';
import * as screen from '.';
import { OCRCoordinates, OCRResult } from './types';

describe('screen', () => {
  beforeEach(() => {
    oliveHelps.screen = {
      ocr: jest.fn(),
      averageHash: jest.fn(),
      differenceHash: jest.fn(),
      perceptionHash: jest.fn(),
      compareHashes: jest.fn(),
      listenAverageHash: jest.fn(),
      listenDifferenceHash: jest.fn(),
      listenPerceptionHash: jest.fn(),
      listenPixelDiff: jest.fn(),
      listenPixelDiffActiveWindow: jest.fn(),
      listenOcrMonitor: jest.fn(),
      ocrFileEncoded: jest.fn(),
    };
  });
  describe('ocr', () => {
    it('return a promise of OCRResult[]', () => {
      const ocrCoordinates: OCRCoordinates = {
        top: 1,
        left: 1,
        width: 1,
        height: 1,
      };
      const ocrResult: OCRResult[] = [
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
          confidence: 1,
          text: '',
        },
      ];
      mocked(oliveHelps.screen.ocr).mockImplementation((ocrCoordinatesParam) => {
        expect(ocrCoordinatesParam).toEqual(ocrCoordinates);
      });
      const actual = screen.ocr(ocrCoordinates);
      expect(actual).resolves.toBe(ocrResult);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.screen.ocr).mockImplementation(() => {
        throw exception;
      });

      expect(screen.ocr).rejects.toBe(exception);
    });
  });
  describe('listenOcrMonitor', () => {
    it('return a promise of ocrEvent', () => {
      // eslint-disable-next-line @typescript-eslint/no-array-constructor
      const resultArray = new Array();
      // eslint-disable-next-line @typescript-eslint/no-array-constructor
      const theArray = new Array();
      screen.listenOcrMonitor((result) => {
        result.forEach((element) => {
          resultArray.push(element.new.text);
        });
      });
      expect(theArray).toStrictEqual(resultArray);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.screen.listenOcrMonitor).mockImplementation(() => {
        throw exception;
      });

      expect(screen.listenOcrMonitor).rejects.toBe(exception);
    });
  });
  describe('ocrFileEncoded', () => {
    it('return a promise of OCRResult[]', () => {
      const ocrResult: OCRResult[] = [
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
          confidence: 1,
          text: '',
        },
      ];
      mocked(oliveHelps.screen.ocrFileEncoded).mockImplementation((data, callback) => {
        callback(undefined, ocrResult);
      });
      const actual = screen.ocrFileEncoded('string');
      expect(actual).resolves.toBe(ocrResult);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.screen.ocrFileEncoded).mockImplementation(() => {
        throw exception;
      });

      expect(screen.ocrFileEncoded).rejects.toBe(exception);
    });
  });
});
