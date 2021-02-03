import * as GRPC from '@grpc/grpc-js';
import { StoppableMessage } from './stoppables';
export declare class TransformingMessage<TOutput, TResponse> implements StoppableMessage<TOutput> {
    private callbackPromise;
    private promiseResolve;
    private promiseReject;
    private transformer;
    private _call;
    private logger;
    constructor(transformer: (input: TResponse) => TOutput);
    promise(): Promise<TOutput>;
    stop(): void;
    callback: (error: GRPC.ServiceError | null, response: TResponse) => void;
    assignCall(call: GRPC.ClientUnaryCall): void;
    private get call();
}
