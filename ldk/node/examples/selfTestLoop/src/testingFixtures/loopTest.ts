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
      return Promise.resolve(this.status);

      /* return new Promise((resolve) => {
        resolve(this.status);
      }); */
    } catch (error: any) {
      this.status = Status.FAIL;
      logger.error(`💀 FAIL - ${this.id}`);
      logger.error(typeof error === 'string' ? error : error.message);
      return Promise.reject(error);
      /* return new Promise((resolve, reject) => {
        reject(error);
      }); */
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
          this.timeout = setTimeout(() => {
            prompt.stop();
            reject(new Error('Timeout - Too much time has passed'));
          }, this.timeoutTime);
          this.methodToExecute(host)
            .then((response) => {
              clearTimeout(this.timeout);
              prompt.stop();
              resolve(response);
            })
            .catch((error) => {
              clearTimeout(this.timeout);
              prompt.stop();
              reject(error);
            });
        } catch (e) {
          reject(new Error(e));
        }
      } else {
        reject(new Error('Host services are unavailable'));
      }
    });
  }

  public async testJustStorage(host: HostServices, logger: Logger) {
    return new Promise((resolve, reject) => {
      const value = 'Do I exist?';
      host.storage.storageWrite('testKey', value).then(() => {
        host.storage
          .storageExists('testKey')
          .then((exists) => {
            logger.debug(`Value exists in storage: ${exists}`);
            if (!exists) {
              reject(new Error('Key does not exist in storge'));
              return null;
            }

            return host.storage.storageRead('testKey');
          })
          .then((storageValue) => {
            logger.debug(`Value in storage: ${storageValue}`);
            if (storageValue !== value) {
              reject(new Error('Stored value does not match initial value'));
              return null;
            }

            return host.storage.storageDelete('testKey');
          })
          .then(() => {
            logger.debug(`Value deleted from storage`);
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  public getStatus(): Status {
    return this.status;
  }

  public getId(): string {
    return this.id;
  }
}
