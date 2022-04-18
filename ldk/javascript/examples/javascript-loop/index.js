import { clipboard, ui, whisper } from '@oliveai/ldk';

async function clipboardListenAndWhisper() {
  clipboard.listen(true, (incomingText) => {
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
}

ui.loopOpenHandler(() => clipboardListenAndWhisper());
