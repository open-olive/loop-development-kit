import {
  ClientReadableStream,
  ClientReadableStreamImpl,
  ClientUnaryCall,
  ClientUnaryCallImpl,
  ServiceError,
} from '@grpc/grpc-js/build/src/call';
import { Deadline } from '@grpc/grpc-js';
import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
type CallbackFunc<TResponse = any> = (
  err: ServiceError | null,
  response: TResponse,
) => void;
/**
 * A simple callback handler that passes back the response when the callback gets invoked
 *
 * @param response - the response to pass through when the callback gets invoked
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function createCallbackHandler<TRequest, TResponse>(
  response?: TResponse,
) {
  return ((request: TRequest, callback: CallbackFunc): ClientUnaryCall => {
    const clientCall = new ClientUnaryCallImpl();

    callback(null, response);

    return clientCall;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

type WaitFunc = (err: Error | undefined) => void;

/**
 * A simple wait handler that stands in for what gRPC implements
 */
export function createWaitHandler() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (deadline: Deadline, callback: WaitFunc): void => {
    callback(undefined);
  };
}

/**
 * A stream that is largely a target for later emits
 */
export function createEmptyStream<TResponse>(): ClientReadableStream<
  TResponse
> {
  return new ClientReadableStreamImpl<TResponse>(() => {
    return {} as TResponse;
  });
}

/**
 * A simple streaming handler that passes back the response for every stream chunk
 *
 * @param stream - an optional stream to use, if you don't want this to create it for you
 */
export function createStreamingHandler<TResponse>(
  stream?: ClientReadableStream<TResponse>,
) {
  return (): ClientReadableStream<TResponse> => {
    if (stream) {
      return stream;
    }

    return createEmptyStream();
  };
}

interface CaptureParameters {
  call?: number;
  position?: number;
}
/**
 * A argument capture function for jest mocks that lets you do further investigation on a captured argument
 *
 * @param mock - a mock that you want to capture arguments for
 * @param params - the optional parameters for what call and arg to capture
 */
export function captureMockArgument<TArgument>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock: jest.MockInstance<any, any>,
  params?: CaptureParameters,
): TArgument {
  const call = params?.call || 0;
  const position = params?.position || 0;

  const called = mock.mock.calls[call];
  if (!called) {
    throw new Error(`mock ${mock} was not called at least ${call} times`);
  }

  return called[position] as TArgument;
}

/**
 * An identity callback that passes the value through and ignores any errors.
 *
 * @param err - the error passed to the callback (ignored)
 * @param value - the value passed to the callback (passed through)
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function identityCallback(err: any, value: any) {
  return value;
}

export const defaultConnInfo: ConnInfo.AsObject = {
  address: 'a',
  serviceId: 1,
  network: 'n',
};

export const defaultSession: Session.AsObject = {
  loopid: 'LOOP_ID',
  token: 'TOKEN',
};
