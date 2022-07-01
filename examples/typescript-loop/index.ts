import { clipboard, whisper } from '@oliveai/ldk';
import { ui } from '../../dist/index';

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
          type: whisper.WhisperComponentType.Markdown,
        },
      ],
    });
  });
};

ui.loopOpenHandler(() => clipboardListenAndWhisper());
