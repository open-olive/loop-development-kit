import { mocked } from 'ts-jest/utils';
import * as whisper from '.';

describe('Whisper', () => {
  beforeEach(() => {
    oliveHelps.whisper = {
      create: jest.fn(),
    };
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
        close: () => {
          console.log();
        },
        id: '1',
      };

      mocked(oliveHelps.whisper.create).mockImplementation((_whisper, callback) =>
        callback(undefined, expected),
      );

      const actual = whisper.create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(newWhisper, expect.any(Function));
      return expect(actual).resolves.toBe(expected);
    });
  });
});
