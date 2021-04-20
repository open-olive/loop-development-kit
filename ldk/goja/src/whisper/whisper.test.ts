import { mocked } from 'ts-jest/utils';
import { NewWhisper, whisper, Whisper, WhisperComponentType } from '.';

describe('Whisper', () => {
  beforeEach(() => {
    oliveHelps.whisper = {
      all: jest.fn(),
      create: jest.fn(),
    };
  });

  describe('all', () => {
    it('Returns an array of all current whispers', () => {
      const whisperCallback = jest.fn();
      const expected: Whisper[] = [
        {
          components: [
            {
              body: 'Test',
              id: '1',
              type: WhisperComponentType.MARKDOWN,
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
      const whisperCallback = (theWhisper: Whisper) => {
        return whisperCallback;
      };
      const newWhisper: NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: WhisperComponentType.MARKDOWN,
          },
        ],
        label: 'Test',
        onClose: () => {}
      };

      whisper.create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(newWhisper);
    });
  });
});
