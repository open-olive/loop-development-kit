import * as GRPC from '@grpc/grpc-js';
import { StoppableMessage } from './stoppables';
import { Logger } from '../logging';

/**
 * @internal
 */
export class TransformingMessage<TOutput, TResponse>
  implements StoppableMessage<TOutput> {
  private callbackPromise: Promise<TOutput>;

  private promiseResolve!: (result: TOutput) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private promiseReject!: (error: any) => void;

  private transformer: (input: TResponse) => TOutput;

  private _call: GRPC.ClientUnaryCall | undefined;

  private logger: Logger;

  constructor(transformer: (input: TResponse) => TOutput) {
    this.callbackPromise = new Promise<TOutput>((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
    this.transformer = transformer;
    this.logger = new Logger('loop-core');
  }

  promise(): Promise<TOutput> {
    return this.callbackPromise;
  }

  stop(): void {
    // SIDE-1556: Needs to be wrapped this way so that we don't trigger a race condition
    setImmediate(() => {
      this.call.cancel();
    });
  }

  callback = (error: GRPC.ServiceError | null, response: TResponse): void => {
    // Error code = 1 is what happens when we call stop()
    if (error && error.code !== 1) {
      this.promiseReject(error);
    } else if (response) {
      this.promiseResolve(this.transformer(response));
    }
  };

  assignCall(call: GRPC.ClientUnaryCall): void {
    if (this._call != null) {
      throw new Error("Call already assigned, can't assigned another");
    }
    this._call = call;
  }

  private get call(): GRPC.ClientUnaryCall {
    if (this._call == null) {
      throw new Error('Getting call before assignment');
    }
    return this._call;
  }
}
