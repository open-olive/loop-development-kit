import { mocked } from 'ts-jest/utils';
import * as excel from '.';

describe('Excel', () => {
  beforeEach(() => {
    oliveHelps.excel = {
      decode: jest.fn(),
      encode: jest.fn(),
    };
  });

  describe('encode', () => {
    const workbook: excel.Workbook = {
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
        mocked(oliveHelps.excel.encode).mockImplementation((_workbook, callback) =>
          callback(undefined, expected),
        );
        const actual = excel.encode(workbook);

        // expect(excel.encode).toBeCalledWith(workbook);
        return expect(actual).resolves.toBe(expected);
      },
      undefined,
    );

    it('returns a rejected promise', () => {
      const exception = 'Exception';

      mocked(oliveHelps.excel.encode).mockImplementation(() => {
        throw exception;
      });

      const actual = excel.encode(workbook);
      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('decode', () => {
    const expected: excel.Workbook = {
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
      mocked(oliveHelps.excel.decode).mockImplementation((_data, callback) =>
        callback(undefined, expected),
      );
      const actual = excel.decode(data);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const data: Uint8Array = new Uint8Array();
      mocked(oliveHelps.excel.decode).mockImplementation(() => {
        throw exception;
      });
      const actual = excel.decode(data);

      return expect(actual).rejects.toBe(exception);
    });
  });
});
