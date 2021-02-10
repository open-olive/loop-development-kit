import { Logger } from '../../../../dist/logging';
import { HostServices } from '../../../../dist';

export enum Status {
  PASS = 'pass',
  FAIL = 'fail',
  NOT_STARTED = 'not_started',
}

export class LoopTest {
  private id: string;

  private methodToExecute: (host: HostServices) => Promise<boolean>;

  private status: Status;

  private timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
    // Do nothing
  }, 0);

  private timeoutTime: number;

  private promptMarkdown: string;

  constructor(
    name: string,
    methodToExecute: (host: HostServices) => Promise<boolean>,
    timeoutTime: number,
    promptMarkdown: string,
  ) {
    this.id = name;
    this.methodToExecute = methodToExecute;
    this.status = Status.NOT_STARTED;
    this.timeoutTime = timeoutTime;
    this.promptMarkdown = promptMarkdown;
  }

  public async runTest(host: HostServices, logger: Logger): Promise<Status> {
    try {
      logger.info('Starting test...');
      await this.testWrapper(host, logger);
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

  private async testWrapper(
    host: HostServices,
    logger: Logger,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof host !== 'undefined') {
        try {
          const prompt = host.whisper.markdownWhisper({
            label: this.id,
            markdown: this.promptMarkdown,
          });
          logger.info('After emit whisper...');
          this.timeout = setTimeout(() => {
            logger.info('Timeout');
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, this.timeoutTime);
          logger.info(this.getId());
          logger.info('Before method...');
          this.methodToExecute(host)
            .then((response) => {
              logger.info('Success...');
              clearTimeout(this.timeout);
              prompt.stop();
              resolve(response);
            })
            .catch((error) => {
              logger.error('An error was caught...');
              clearTimeout(this.timeout);
              prompt.stop();
              reject(error);
            });
          logger.info('Method to execute called...');
        } catch (e) {
          logger.error('unknown error...');
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  public getStatus(): Status {
    return this.status;
  }

  public getId(): string {
    return this.id;
  }
}
