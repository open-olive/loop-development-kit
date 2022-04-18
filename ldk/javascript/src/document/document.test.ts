import { mocked } from 'ts-jest/utils';
import * as document from '.';
import { PDFOutputWithOcrResult } from '.';
import { OCRResult } from '../screen';
import { PDFContentType, Workbook } from './types';

describe('Document', () => {
  beforeEach(() => {
    oliveHelps.document = {
      xlsxDecode: jest.fn(),
      xlsxEncode: jest.fn(),
      readPDF: jest.fn(),
    };
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

  describe('xlsxEncode', () => {
    const workbook: Workbook = {
      worksheets: [
        {
          hidden: false,
          hiddenColumns: [],
          hiddenRows: [],
          name: 'name',
          rows: [
            {
              cells: [{ value: 'value' }],
            },
          ],
        },
      ],
    };

    it(
      'returns an Uint8Array promise result ',
      () => {
        const expected: Uint8Array = new Uint8Array();
        mocked(oliveHelps.document.xlsxEncode).mockImplementation((_workbook, callback) =>
          callback(undefined, expected),
        );
        const actual = document.xlsxEncode(workbook);

        return expect(actual).resolves.toStrictEqual(expected);
      },
      undefined,
    );

    it('returns a rejected promise', () => {
      const exception = 'Exception';

      mocked(oliveHelps.document.xlsxEncode).mockImplementation(() => {
        throw exception;
      });

      const actual = document.xlsxEncode(workbook);
      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('xlsxDecode', () => {
    const expected: Workbook = {
      worksheets: [
        {
          hidden: false,
          hiddenColumns: [],
          hiddenRows: [],
          name: 'name',
          rows: [
            {
              cells: [{ value: 'value' }],
            },
          ],
        },
      ],
    };

    it('returns a Workbook promise result ', () => {
      const data: Uint8Array = new Uint8Array();
      mocked(oliveHelps.document.xlsxDecode).mockImplementation((_data, callback) =>
        callback(undefined, expected),
      );
      const actual = document.xlsxDecode(data);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const data: Uint8Array = new Uint8Array();
      mocked(oliveHelps.document.xlsxDecode).mockImplementation(() => {
        throw exception;
      });
      const actual = document.xlsxDecode(data);

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('readPDF', () => {
    it('parses a PDF', () => {
      const pdfFile = new Uint8Array();
      const expected = {
        '1': {
          content: [
            {
              value: 'test',
              type: PDFContentType.Text,
            },
          ],
        },
      };

      mocked(oliveHelps.document.readPDF).mockImplementation((data, callback) => {
        callback(undefined, expected);
      });

      const actual = document.readPDF(pdfFile);

      return expect(actual).resolves.toBe(expected);
    });
  });

  describe('readPDFWithOcr', () => {
    it('returns a pdfoutputwithocr promise result ', () => {
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
          conf: 1,
          text: '',
        },
      ];

      const pdfFile = new Uint8Array();
      const pdfoutput = {
        '1': {
          content: [
            {
              value: 'test',
              type: PDFContentType.Text,
            },
            {
              value: 'test',
              type: PDFContentType.Photo,
            },
          ],
        },
      };
      const OCRResults = {
        '1': {
          ocrResult,
        },
      };

      const expected: PDFOutputWithOcrResult = {
        ocrResults: OCRResults,
        pdfOutput: pdfoutput,
      };

      mocked(oliveHelps.document.readPDF).mockImplementation((data, callback) => {
        callback(undefined, pdfoutput);
      });
      mocked(oliveHelps.screen.ocrFileEncoded).mockImplementation((data, callback) => {
        callback(undefined, ocrResult);
      });

      const actual = document.readPDFWithOcr(pdfFile);
      console.log(actual);
      return expect(actual).resolves.toStrictEqual(expected);
    });
  });
});
