/* eslint-disable no-async-promise-executor */
import { whisper } from '@oliveai/ldk';

export enum Status {
  PASS = 'pass',
  FAIL = 'fail',
  NOT_STARTED = 'not_started',
}

export class LoopTest {
  private id: string;

  private methodToExecute: () => Promise<boolean>;

  private status: Status;

  private timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
    // Do nothing
  }, 0);

  private timeoutTime?: number;

  private promptMarkdown: string;

  constructor(
    name: string,
    methodToExecute: () => Promise<boolean>,
    timeoutTime: number,
    promptMarkdown: string,
  ) {
    this.id = name;
    this.methodToExecute = methodToExecute;
    this.status = Status.NOT_STARTED;
    this.timeoutTime = timeoutTime;
    this.promptMarkdown = promptMarkdown;
  }

  public async runTest(): Promise<Status> {
    try {
      await this.testWrapper();
      this.status = Status.PASS;
      console.log(`✅ PASS - ${this.id}`);
      return Promise.resolve(this.status);
    } catch (error) {
      this.status = Status.FAIL;
      console.error(`💀 FAIL - ${this.id}`);
      console.error(typeof error === 'string' ? error : error.message);
      return Promise.reject(error);
    }
  }

  private async testWrapper(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const prompt = await whisper.create({
          label: this.id,
          onClose: () => {
            console.log('closed prompt');
          },
          components: [
            {
              body: this.promptMarkdown,
              type: whisper.WhisperComponentType.Markdown,
            },
          ],
        });

        if (this.timeoutTime) {
          this.timeout = setTimeout(() => {
            prompt.close((error) => console.error(error));
            reject(new Error('Timeout - Too much time has passed'));
          }, this.timeoutTime);
        }
        this.methodToExecute()
          .then((response) => {
            clearTimeout(this.timeout);
            prompt.close((error) => console.error(error));
            resolve(response);
          })
          .catch((error) => {
            clearTimeout(this.timeout);
            prompt.close((e) => console.error(e));
            reject(error);
          });
      } catch (e) {
        reject(new Error(e));
      }
    });
  }

  public getStatus(): Status {
    return this.status;
  }

  public getId(): string {
    return this.id;
  }

  public setTimeoutTime(timeoutTime?: number): void {
    this.timeoutTime = timeoutTime;
  }
}
