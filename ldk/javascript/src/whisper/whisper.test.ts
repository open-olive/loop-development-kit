import { mocked } from 'ts-jest/utils';
import * as whisper from './types';
import { create } from './index';

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
            justifyContent: whisper.JustifyContent.Center,
            children: [],
            direction: whisper.Direction.Horizontal,
            type: whisper.WhisperComponentType.Box,
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
            alignment: whisper.JustifyContent.Center,
            children: [],
            direction: whisper.Direction.Horizontal,
            type: whisper.WhisperComponentType.Box,
          },
        ],
        label: 'Test',
        onClose: expectedClose,
      };

      const expected: OliveHelps.Whisper = {
        close: (c: (r: Error | undefined, value: undefined) => void) => {
          console.log(c);
        },
        update: (w: OliveHelps.NewWhisper) => {
          console.log(w);
        },
        id: '1',
      };

      mocked(oliveHelps.whisper.create).mockImplementation((_whisper, callback) =>
        // TS isn't recognizing compatibility b/c readable requires a second undefined param.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback(undefined, expected as any),
      );

      const actual = create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(expectedWhisper, expect.any(Function));
      return expect(actual).resolves.toStrictEqual({
        close: expected.close,
        update: expect.any(Function),
        id: '1',
        componentState: expect.any(Map),
      });
    });
    it('Throws if it encounters a duplicate key', async () => {
      const expectedClose = jest.fn();
      const newWhisper: whisper.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
            key: 'a',
          },
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
            key: 'a',
          },
        ],
        label: 'Test',
        onClose: expectedClose,
      };

      expect(() => create(newWhisper)).rejects.toEqual(expect.any(Error));
      expect(oliveHelps.whisper.create).not.toHaveBeenCalled();
    });

    it('wraps calls to update', async () => {
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
      const internalResponse: OliveHelps.Whisper = {
        close: jest.fn(),
        update: jest.fn(),
        id: '1',
      };
      mocked(oliveHelps.whisper.create).mockImplementationOnce((_, callback) => {
        callback(undefined, internalResponse);
      });
      const returnedExternal = await create(newWhisper);
      returnedExternal.update(newWhisper);
      expect(internalResponse.update).toHaveBeenCalled();
    });

    describe('component state', () => {
      it('initializes when given component ids', async () => {
        const textInputId = 'myTextInput';
        const expectedValue = 'expected';

        const newWhisper: whisper.NewWhisper = {
          components: [
            {
              type: whisper.WhisperComponentType.TextInput,
              label: 'myTextInput',
              value: expectedValue,
              id: textInputId,
              onChange: jest.fn(),
            },
          ],
          label: 'Test',
          onClose: jest.fn(),
        };

        const internalResponse: OliveHelps.Whisper = {
          close: jest.fn(),
          update: jest.fn(),
          id: '1',
        };
        mocked(oliveHelps.whisper.create).mockImplementationOnce((_, callback) => {
          callback(undefined, internalResponse);
        });

        const actualWhisper = await create(newWhisper);

        expect(actualWhisper.componentState.get(textInputId)).toBe(expectedValue);
      });

      it('does not initialize when given component id with no value', async () => {
        const textInputId = 'myTextInput';
        const newWhisper: whisper.NewWhisper = {
          components: [
            {
              type: whisper.WhisperComponentType.TextInput,
              label: 'myTextInput',
              id: textInputId,
              onChange: jest.fn(),
            },
          ],
          label: 'Test',
          onClose: jest.fn(),
        };

        const internalResponse: OliveHelps.Whisper = {
          close: jest.fn(),
          update: jest.fn(),
          id: '1',
        };
        mocked(oliveHelps.whisper.create).mockImplementationOnce((_, callback) => {
          callback(undefined, internalResponse);
        });

        const actualWhisper = await create(newWhisper);

        expect(actualWhisper.componentState.get(textInputId)).toBeUndefined();
      });

      it('is empty given no component ids', async () => {
        const newWhisper: whisper.NewWhisper = {
          components: [
            {
              type: whisper.WhisperComponentType.TextInput,
              label: 'myTextInput',
              onChange: jest.fn(),
            },
          ],
          label: 'Test',
          onClose: jest.fn(),
        };

        const internalResponse: OliveHelps.Whisper = {
          close: jest.fn(),
          update: jest.fn(),
          id: '1',
        };
        mocked(oliveHelps.whisper.create).mockImplementationOnce((_, callback) => {
          callback(undefined, internalResponse);
        });

        const actualWhisper = await create(newWhisper);

        expect(actualWhisper.componentState.keys.length).toBe(0);
      });
    });
  });
});
