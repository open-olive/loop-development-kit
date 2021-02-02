import { Logger } from '../../../../dist/logging';

export enum Status {
  PASS = 'pass',
  FAIL = 'fail',
  NOT_STARTED = 'not_started',
}

export class LoopTest {
  private id: string;

  private methodToExecute: () => void;

  private status: Status;

  constructor(name: string, methodToExecute: () => void) {
    this.id = name;
    this.methodToExecute = methodToExecute;
    this.status = Status.NOT_STARTED;
  }

  public runTest(logger: Logger): void {
    try {
      this.methodToExecute();
      this.status = Status.PASS;
      logger.info(`PASS - ${this.id}`);
    } catch (error: any) {
      this.status = Status.FAIL;
      logger.error(`ERROR - ${this.id}`);
      logger.error(typeof error === 'string' ? error : error.message);
    }
  }
}
