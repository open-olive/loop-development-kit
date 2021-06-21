import { keyboard, whisper } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';
import { Whisper, WhisperComponentType, Urgency } from '@oliveai/ldk/dist/whisper/types';

import { LoopTest } from './loopTest';

export default class TestSuite {
  private tests: LoopTest[];

  constructor(tests: LoopTest[]) {
    this.tests = tests;
  }

  public async start(): Promise<boolean> {
    // eslint-disable-next-line
    const elements: any[] = [];
    // eslint-disable-next-line
    for await (const test of this.tests) {
      try {
        await test.runTest();
        elements.push({
          copyable: false,
          label: `${test.getId()}`,
          value: test.getStatus(),
          style: Urgency.None,
          type: WhisperComponentType.ListPair,
        });
      } catch (err) {
        elements.push({
          copyable: false,
          label: `${test.getId()}`,
          value: test.getStatus(),
          style: Urgency.Error,
          type: WhisperComponentType.ListPair,
        });
      }
    }

    const hotkeys = {
      key: '/',
      control: true,
    };

    var listWhisper: Whisper;
    whisper
      .create({
        label: 'Self Test Loop - Results',
        onClose: () => {
          console.log('closed Results');
        },
        components: elements,
      })
      .then((whisper: Whisper) => (listWhisper = whisper));

    var markdownWhisper: Whisper;
    whisper
      .create({
        label: 'Self Test Loop - Results',
        onClose: () => {
          console.log('closed Results');
        },
        components: [
          {
            body: `Press "Ctrl + /" to bring back up the original whisper`,
            type: WhisperComponentType.Markdown,
          },
        ],
      })
      .then((whisper: Whisper) => (markdownWhisper = whisper));

    var keyboardListener: Cancellable;
    keyboard
      .listenHotkey(hotkeys, (pressed) => {
        listWhisper.close((error) => console.error(error));
        markdownWhisper.close((error) => console.error(error));
        keyboardListener.cancel();
      })
      .then((cancellable: Cancellable) => (keyboardListener = cancellable));
    return true;
  }
}
