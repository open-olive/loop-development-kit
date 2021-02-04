import { Logger } from '../../../../dist/logging';
import { HostServices } from '../../../../dist';

export enum Status {
  PASS = 'pass',
  FAIL = 'fail',
  NOT_STARTED = 'not_started',
}

export class LoopTest {
  private id: string;

  private methodToExecute: (host: HostServices) => void;

  private status: Status;

  constructor(name: string, methodToExecute: (host: HostServices) => void) {
    this.id = name;
    this.methodToExecute = methodToExecute;
    this.status = Status.NOT_STARTED;
  }

  public async runTest(host: HostServices, logger: Logger): Promise<Status> {
    try {
      await this.methodToExecute(host);
      this.status = Status.PASS;
      logger.info(`✅ PASS - ${this.id}`);

      return new Promise((resolve) => {
        resolve(this.status);
      });
    } catch (error: any) {
      this.status = Status.FAIL;
      logger.error(`💀 FAIL - ${this.id}`);
      logger.error(typeof error === 'string' ? error : error.message);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
}
