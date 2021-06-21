import { clipboard, whisper } from '@oliveai/ldk';
import { WhisperComponentType } from '@oliveai/ldk/dist/whisper/types';

function clipboardListenAndWhisper() {
  clipboard.listen(true, (incomingText) => {
    whisper.create({
      label: 'Clipboard Text Whisper',
      onClose: () => {
        console.log('Closed Clipboard Text Whisper');
      },
      components: [
        {
          body: `Got Clipboard Text: ${incomingText}`,
          type: WhisperComponentType.Markdown,
        },
      ],
    });
  });
}

clipboardListenAndWhisper();
