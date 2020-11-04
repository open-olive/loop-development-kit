import * as GRPC from '@grpc/grpc-js';
import { StoppableMessage } from './stoppableStream';

export class TransformingMessage<TOutput, TResponse>
  implements StoppableMessage<TOutput> {
  private callbackPromise: Promise<TOutput>;

  private promiseResolve!: (result: TOutput) => void;

  private promiseReject!: (error: any) => void;

  private transformer: (input: TResponse) => TOutput;

  private _call: GRPC.ClientUnaryCall | undefined;

  constructor(transformer: (input: TResponse) => TOutput) {
    this.callbackPromise = new Promise<TOutput>((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
    this.transformer = transformer;
  }

  promise(): Promise<TOutput> {
    return this.callbackPromise;
  }

  stop(): void {
    this.call.cancel();
  }

  callback = (error: GRPC.ServiceError | null, response: TResponse): void => {
    if (error) {
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
