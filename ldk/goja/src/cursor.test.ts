import { mocked } from 'ts-jest/utils';
import { Cursor, CursorImpl, Position } from './cursor';

describe('Cursor', () => {
  let subject: Cursor;

  beforeEach(() => {
    oliveHelps.cursor = {
      position: jest.fn(),
      listenPosition: jest.fn(),
    };

    subject = new CursorImpl();
  });

  describe('position', () => {
    it('returns a promise result with expected cursor position', () => {
      const expected: Position = {
        x: 2345,
        y: 6789
      };
      mocked(oliveHelps.cursor.position).mockImplementation((callback) => callback(expected));

      const actual = subject.position();

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.cursor.position).mockImplementation(() => {
        throw exception;
      });

      const actual = subject.position();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listenPosition', () => {
    it('passed in listen position callback to olive helps', () => {
      const callback = jest.fn();
      subject.listenPosition(callback);

      expect(oliveHelps.cursor.listenPosition).toHaveBeenCalledWith(callback);
    });

    it('throws exception when passing in listen position callback', () => {
      const exception = 'Exception';
      mocked(oliveHelps.cursor.listenPosition).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => subject.listenPosition(callback)).toThrow(exception);
    });
  });
});
