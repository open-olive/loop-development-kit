import { mocked } from 'ts-jest/utils';
import { OperationCanceledException } from 'typescript';
import { TextDecoder, TextEncoder } from 'text-encoding-shim';
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
    it('returns an Uint8Array promise result ', () => {
      const expected: Uint8Array = new Uint8Array();
      const actual = excel.encode(workbook);

      expect(excel.encode).toBeCalledWith(workbook);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const actual = excel.encode(workbook);

      mocked(TextEncoder.prototype.encode).mockImplementation(() => {
        throw exception;
      });
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
      const actual = excel.decode(data);

      expect(excel.decode).toBeCalledWith(data);
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      const data: Uint8Array = new Uint8Array();
      const actual = excel.decode(data);
      mocked(TextEncoder.prototype.encode).mockImplementation(() => {
        throw exception;
      });
      return expect(actual).rejects.toBe(exception);
    });
  });
});
