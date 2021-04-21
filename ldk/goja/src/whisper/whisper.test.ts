import * as whisper from '.';
import { mocked } from 'ts-jest/utils';

describe('Whisper', () => {
  beforeEach(() => {
    oliveHelps.whisper = {
      all: jest.fn(),
      create: jest.fn(),
    };
  });

  describe('all', () => {
    it('Returns an array of all current whispers', () => {
      const expected: whisper.Whisper[] = [
        {
          components: [
            {
              body: 'Test',
              id: '1',
              type: whisper.WhisperComponentType.Markdown,
            },
          ],
          close: () => {
            console.log();
          },
          id: '1',
          label: 'Test',
        },
      ];
      mocked(oliveHelps.whisper.all).mockImplementation((callback) => callback(expected));

      const actual = whisper.all();

      expect(oliveHelps.whisper.all).toHaveBeenCalled();
      return expect(actual).resolves.toBe(expected);
    });

    it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.whisper.all).mockImplementation(() => {
        throw exception;
      });

      const actual = whisper.all();

      return expect(actual).rejects.toBe(exception);
    });
  });

  describe('create', () => {
    it('Creates a whisper', () => {
      const newWhisper: whisper.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
        ],
        label: 'Test',
        onClose: jest.fn(),
      };

      const expected: whisper.Whisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
        ],
        close: () => {
          console.log();
        },
        id: '1',
        label: 'Test',
      };

      mocked(oliveHelps.whisper.create).mockImplementation((_whisper, callback) =>
        callback(expected),
      );

      const actual = whisper.create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(newWhisper, expect.any(Function));
      return expect(actual).resolves.toBe(expected);
    });
  });
});
