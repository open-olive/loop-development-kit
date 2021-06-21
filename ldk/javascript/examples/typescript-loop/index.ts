import { clipboard, whisper } from '@oliveai/ldk';
import { WhisperComponentType } from '@oliveai/ldk/dist/whisper/types';

const clipboardListenAndWhisper = () => {
  clipboard.listen(true, (incomingText: string) => {
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
};

clipboardListenAndWhisper();
