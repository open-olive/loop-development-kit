import * as GRPC from '@grpc/grpc-js';
import { StoppableMessage } from './stoppables';
/**
 * @internal
 */
export declare class TransformingMessage<TOutput, TResponse> implements StoppableMessage<TOutput> {
    private callbackPromise;
    private promiseResolve;
    private promiseReject;
    private transformer;
    private _call;
    constructor(transformer: (input: TResponse) => TOutput);
    promise(): Promise<TOutput>;
    stop(): void;
    callback: (error: GRPC.ServiceError | null, response: TResponse) => void;
    assignCall(call: GRPC.ClientUnaryCall): void;
    private get call();
}
