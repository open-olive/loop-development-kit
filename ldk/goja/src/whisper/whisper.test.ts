import { mocked } from 'ts-jest/utils';
import { whisper, Whisper, WhisperComponentType } from '.';

describe('Clipboard', () => {
  beforeEach(() => {
    oliveHelps.whisper = {
      all: jest.fn(),
      create: jest.fn(),
    };
  });

  describe('all', () => {
    it('returns a promise result with expected clipboard value', () => {
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
          onChange: (theWhisper: Whisper) => {
            console.log();
          },
        },
      ];
      mocked(oliveHelps.whisper.all).mockImplementation((callback) => callback(expected));

      const actual = whisper.all(() => console.log());

      return expect(actual).resolves.toBe(expected);
    });

    /* it('returns a rejected promise', () => {
      const exception = 'Exception';
      mocked(oliveHelps.clipboard.read).mockImplementation(() => {
        throw exception;
      });

      const actual = clipboard.read();

      return expect(actual).rejects.toBe(exception);
    }); */
  });
});
