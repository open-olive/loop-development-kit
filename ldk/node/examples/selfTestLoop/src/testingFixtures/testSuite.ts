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

  public async start(host: HostServices): Promise<boolean> {
    const elements = {} as Element;
    let i = 0;
    for await (const test of this.tests) {
      try {
        await test.runTest(host, this.logger);
        elements[`${i}`] = {
          value: test.getStatus(),
          label: test.getId(),
          order: i + 1,
          type: 'pair',
        };
        i += 1;
      } catch (err) {
        // do nothing, already logging
      }
    }
    host.whisper.listWhisper({
      label: 'Self Test - Results',
      markdown: '',
      elements,
    });
    return true;
  }
}
