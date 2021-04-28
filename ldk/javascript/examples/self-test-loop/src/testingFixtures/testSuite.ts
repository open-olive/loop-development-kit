import { keyboard, whisper } from '@oliveai/ldk';

import { LoopTest } from './loopTest';

export default class TestSuite {
  private tests: LoopTest[];

  constructor(tests: LoopTest[]) {
    this.tests = tests;
  }

  public async start(): Promise<boolean> {
    const elements: any[] = [];
    // eslint-disable-next-line
    for await (const test of this.tests) {
      try {
        await test.runTest();
        elements.push({
          copyable: false,
          label: `${test.getId()}`,
          value: test.getStatus(),
          style: whisper.Urgency.None,
          type: whisper.WhisperComponentType.ListPair,
        });
      } catch (err) {
        elements.push({
          copyable: false,
          label: `${test.getId()}`,
          value: test.getStatus(),
          style: whisper.Urgency.Error,
          type: whisper.WhisperComponentType.ListPair,
        });
      }
    }

    const hotkeys = {
      key: '/',
      control: true,
    };

    whisper.create({
      label: 'Self Test Loop - Results',
      onClose: () => {
        console.log('closed Results');
      },
      components: elements,
    });
    whisper.create({
      label: 'Self Test Loop - Results',
      onClose: () => {
        console.log('closed Results');
      },
      components: [
        {
          body: `Press "Ctrl + /" to bring back up the original whisper`,
          type: whisper.WhisperComponentType.Markdown,
        },
      ],
    });
    keyboard.listenHotkey(hotkeys, (pressed) => {
      /* listWhisper.stop();
        markdown.stop();
        keyboard.stop(); */
    });
    return true;
  }
}
