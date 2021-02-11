import { LoopTest } from './loopTest';
import { Logger } from '../../../../dist/logging';
import { HostServices } from '../../../../dist';
import { WhisperListElements } from '../../../../dist/hostClients/whisperService';

export interface Element {
  [key: string]: WhisperListElements;
}

export default class TestSuite {
  private tests: LoopTest[];

  private logger: Logger;

  constructor(tests: LoopTest[], logger: Logger) {
    this.tests = tests;
    this.logger = logger;
  }

  public async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async start(host: HostServices): Promise<boolean> {
    const elements = {} as Element;
    let i = 0;
    for await (const test of this.tests) {
      try {
        this.logger.info('Before next test');
        await this.sleep(1000);
        this.logger.info('after sleep');
        await test.runTest(host, this.logger);
        elements[`${i}`] = {
          value: test.getStatus(),
          label: test.getId(),
          order: i + 1,
          type: 'pair',
        };
        i += 1;
      } catch (err) {
        elements[`${i}`] = {
          value: test.getStatus(),
          label: test.getId(),
          order: i + 1,
          type: 'pair',
        };
        i += 1;
      }
    }

    const hotkeys = {
      key: '/',
      modifiers: {
        ctrl: true,
      },
    };

    const listWhisper = host.whisper.listWhisper({
      label: 'Self Test - Results',
      markdown: '',
      elements,
    });
    const markdown = host.whisper.markdownWhisper({
      label: 'Self Test - Results',
      markdown: 'Press "Ctrl + /" to bring back up the original whisper',
    });
    const keyboard = host.keyboard.streamHotKey(hotkeys, (error, response) => {
      if (error) {
        // Do nothing
      } else {
        listWhisper.stop();
        markdown.stop();
        keyboard.stop();
      }
    });
    return true;
  }
}
