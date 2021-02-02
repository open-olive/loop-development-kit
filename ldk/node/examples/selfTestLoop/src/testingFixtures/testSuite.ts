import { LoopTest } from './loopTest';
import { Logger } from '../../../../dist/logging';

export default class TestSuite {
  private tests: LoopTest[];

  private logger: Logger;

  constructor(tests: LoopTest[], logger: Logger) {
    this.tests = tests;
    this.logger = logger;
  }

  public start(): void {
    this.tests.forEach((test) => {
      test.runTest(this.logger);
    });
  }
}
