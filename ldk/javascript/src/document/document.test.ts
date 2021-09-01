import { mocked } from 'ts-jest/utils';
import * as document from '.';

describe('Document', () => {
  beforeEach(() => {
    oliveHelps.document = {
      xlsxDecode: jest.fn(),
      xlsxEncode: jest.fn(),
    };
  });

  describe('xlsxEncode', () => {
    const workbook: document.Workbook = {
      worksheets: [
        {
          hidden: false,
          hiddenColumns: [],
          hiddenRows: [],
          name: 'name',
          rows: [{ cells: [{ value: 'value' }] }],
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

        return expect(actual).resolves.toBe(expected);
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
    const expected: document.Workbook = {
      worksheets: [
        {
          hidden: false,
          hiddenColumns: [],
          hiddenRows: [],
          name: 'name',
          rows: [{ cells: [{ value: 'value' }] }],
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
});
