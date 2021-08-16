import { render, WhisperInterface } from './react-reconciler';
import { WhisperComponentType } from './types';

describe('whisper-renderer', () => {
  describe('writing new whisper', () => {
    let whisperInterface: WhisperInterface;
    beforeEach(() => {
      whisperInterface = {
        createOrUpdateWhisper: jest.fn(),
      };
    });
    it('generates a new whisper correctly', async () => {
      await new Promise((resolve) => {
        render(
          <>
            <button>I'm a button</button>
            Hello
          </>,
          whisperInterface,
          () => resolve(null),
        );
      });

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'Whisper Label',
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: 'Hello',
          },
        ],
      });
    });
  });
});
