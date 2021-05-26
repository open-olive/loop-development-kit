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
        close: (c: (r: Error | undefined) => void) => {
          console.log(c);
        },
        id: '1',
      };

      mocked(oliveHelps.whisper.create).mockImplementation((_whisper, callback) =>
        // TS isn't recognizing compatibility b/c readable requires a second undefined param.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback(undefined, expected as any),
      );

      const actual = whisper.create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(newWhisper, expect.any(Function));
      return expect(actual).resolves.toBe(expected);
    });

    fit('Replaces form with child components', () => {
      const expectedLabel = 'Test';
      const expectedCloseFunction = jest.fn();

      const formWhisper: whisper.NewWhisper = {
        components: [
          {
            children: [
              {
                body: 'Test',
                id: '1',
                type: whisper.WhisperComponentType.Markdown,
              },
            ],
            onSubmit: () => { },
            type: whisper.WhisperComponentType.Form
          },
        ],
        label: expectedLabel,
        onClose: expectedCloseFunction,
      };

      const expectedWhisper: whisper.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
        ],
        label: expectedLabel,
        onClose: expectedCloseFunction,
      }

      const actual = whisper.create(formWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(expectedWhisper, expect.any(Function)); // TODO: Add captor, test components independently
    });
  });
});
