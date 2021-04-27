import { clipboard, whisper } from '@oliveai/ldk'

function clipboardListenAndWhisper() {
    clipboard.listen(true, function(incomingText) {
        whisper.create({
            label: 'Clipboard Text Whisper',
            onClose: function() { console.log('Closed Clipboard Text Whisper') },
            components: [
                {
                    body: 'Got Clipboard Text: ' + incomingText,
                    type: whisper.WhisperComponentType.Markdown,
                },
            ]
        });
    });
}

clipboardListenAndWhisper();