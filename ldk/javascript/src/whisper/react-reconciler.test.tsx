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
          <whisper label="whisper.label">
            <button>button.label</button>
            <markdown>markdown.body</markdown>
            nakedmarkdown.body
          </whisper>,
          whisperInterface,
          () => resolve(null),
        );
      });

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: 'button.label',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'markdown.body',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'nakedmarkdown.body',
          },
        ],
      });
    });
  });
});
