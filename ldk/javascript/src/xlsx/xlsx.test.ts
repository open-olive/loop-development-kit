import { mocked } from 'ts-jest/utils';
import * as xlsx from '.';

describe('XLSX', () => {
  beforeEach(() => {
    oliveHelps.xlsx = {
      decode: jest.fn(),
      encode: jest.fn(),
    };
  });

  describe('encode', () => {
    const workbook: xlsx.Workbook = {
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
        mocked(oliveHelps.xlsx.encode).mockImplementation((_workbook, callback) =>
          callback(undefined, expected),
        );
        const actual = xlsx.encode(workbook);

        return expect(actual).resolves.toBe(expected);
      },
      undefined,
    );

    it('returns a rejected promise', () => {
      const exception = 'Exception';

      mocked(oliveHelps.xlsx.encode).mockImplementation(() => {
        throw exception;
      });

      const actual = xlsx.encode(workbook);
      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('decode', () => {
    const expected: xlsx.Workbook = {
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
      mocked(oliveHelps.xlsx.decode).mockImplementation((_data, callback) =>
        callback(undefined, expected),
      );
      const actual = xlsx.decode(data);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const data: Uint8Array = new Uint8Array();
      mocked(oliveHelps.xlsx.decode).mockImplementation(() => {
        throw exception;
      });
      const actual = xlsx.decode(data);

      return expect(actual).rejects.toBe(exception);
    });
  });
});
