import { keyboard, whisper } from '@oliveai/ldk';
import { Component, WhisperComponentType, Urgency } from '@oliveai/ldk/dist/whisper/types';

import { LoopTest } from './loopTest';

export default class TestSuite {
  private tests: LoopTest[];

  constructor(tests: LoopTest[]) {
    this.tests = tests;
  }

  public start = async (): Promise<void> => {
    const elements: Component[] = [];
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

    const listWhisper = await whisper.create({
      label: 'Self Test Loop - Results',
      onClose: () => {
        console.log('closed Results');
      },
      components: elements,
    });

    const markdownWhisper = await whisper.create({
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
    });

    const hotkeys = {
      key: '/',
      control: true,
    };
    const keyboardListener = await keyboard.listenHotkey(hotkeys, () => {
      listWhisper.close((error) => console.error(error));
      markdownWhisper.close((error) => console.error(error));
      keyboardListener.cancel();
    });
  };
}
