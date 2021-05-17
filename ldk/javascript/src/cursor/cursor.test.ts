import { mocked } from 'ts-jest/utils';
import * as cursor from '.';

describe('Cursor', () => {
  beforeEach(() => {
    oliveHelps.cursor = {
      position: jest.fn(),
      listenPosition: jest.fn(),
    };
  });

  describe('position', () => {
    it('returns a promise result with expected cursor position', () => {
      const expected: cursor.Position = {
        x: 2345,
        y: 6789,
      };
      mocked(oliveHelps.cursor.position).mockImplementation((callback) =>
        callback(undefined, expected),
      );

      const actual = cursor.position();

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.cursor.position).mockImplementation(() => {
        throw exception;
      });

      const actual = cursor.position();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listenPosition', () => {
    it('passed in listen position callback to olive helps', async () => {
      const callback = jest.fn();
      const position = {
        x: 1,
        y: 2,
      };
      mocked(oliveHelps.cursor.listenPosition).mockImplementation((listenerCb, returnCb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        returnCb({} as any);
        listenerCb(undefined, position);
      });
      await cursor.listenPosition(callback);

      expect(callback).toHaveBeenCalledWith(position);
    });

    it('rejects with the error when the underlying call throws an error', () => {
      const exception = 'Exception';
      mocked(oliveHelps.cursor.listenPosition).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => cursor.listenPosition(callback)).rejects.toBe(exception);
    });
  });
});
