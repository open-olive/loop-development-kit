import { mocked } from 'ts-jest/utils';
import * as whisper from '.';
import { Direction, JustifyContent, WhisperComponentType } from '.';

describe('Whisper', () => {
  beforeEach(() => {
    oliveHelps.whisper = {
      create: jest.fn(),
    };
  });

  describe('create', () => {
    it('Creates a whisper', () => {
      const expectedClose = jest.fn();
      const newWhisper: whisper.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
          {
            justifyContent: JustifyContent.Center,
            children: [],
            direction: Direction.Horizontal,
            type: WhisperComponentType.Box,
          },
        ],
        label: 'Test',
        onClose: expectedClose,
      };
      const expectedWhisper: OliveHelps.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
          {
            alignment: JustifyContent.Center,
            children: [],
            direction: Direction.Horizontal,
            type: WhisperComponentType.Box,
          },
        ],
        label: 'Test',
        onClose: expectedClose,
      };

      const expected: whisper.Whisper = {
        close: (c: (r: Error | undefined) => void) => {
          console.log(c);
        },
        update: (w: whisper.NewWhisper) => {
          console.log(w);
        },
        id: '1',
      };

      mocked(oliveHelps.whisper.create).mockImplementation((_whisper, callback) =>
        // TS isn't recognizing compatibility b/c readable requires a second undefined param.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback(undefined, expected as any),
      );

      const actual = whisper.create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(expectedWhisper, expect.any(Function));
      return expect(actual).resolves.toStrictEqual({
        close: expected.close,
        update: expect.any(Function),
        id: '1'
      });
    });
  });
});
