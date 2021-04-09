import { mocked } from 'ts-jest/utils';
import { Clipboard, ClipboardImpl } from './clipboard';

describe('Clipboard', () => {
  let subject: Clipboard;

  beforeEach(() => {
    oliveHelps.clipboard = {
      read: jest.fn(),
      write: jest.fn(),
      listen: jest.fn(),
    };
    subject = new ClipboardImpl();
  });

  describe('read', () => {
    it('returns a promise result with expected clipboard value', () => {
      const expected = 'expected string';
      mocked(oliveHelps.clipboard.read).mockImplementation((callback) => callback(expected));

      const actual = subject.read();

      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.read).mockImplementation(() => {
        throw exception;
      });

      const actual = subject.read();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('listen', () => {
    it('passed in listen function to olive helps', () => {
      const callback = jest.fn();
      subject.listen(callback);

      expect(oliveHelps.clipboard.listen).toHaveBeenCalledWith(callback);
    });

    it('throws exception when passing in Listen function', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.listen).mockImplementation(() => {
        throw exception;
      });

      const callback = jest.fn();
      expect(() => subject.listen(callback)).toThrow(exception);
    });
  });

  describe('write', () => {
    it('writes text to an olive helps clipboard', () => {
      const expected = 'text';
      mocked(oliveHelps.clipboard.write).mockImplementation((text, callback) => {
        callback();
      });

      const actual = subject.write(expected);

      expect(oliveHelps.clipboard.write).toHaveBeenCalledWith(expected, expect.any(Function));
      return expect(actual).resolves.toBeUndefined();
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.write).mockImplementation(() => {
        throw exception;
      });

      const actual = subject.write('text');

      return expect(actual).rejects.toBe(exception);
    });
  });
});
