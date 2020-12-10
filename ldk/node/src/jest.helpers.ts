import {
  ClientReadableStream,
  ClientReadableStreamImpl,
} from '@grpc/grpc-js/build/src/call';
import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
type CallbackHandlerFunc<TRequest = any, TResponse = any> = (
  request: TRequest,
  callback: (err: Error | null, response: TResponse) => void,
) => void;

/**
 * A simple callback handler that passes back the response when the callback gets invoked
 *
 * @param response - the response to pass through when the callback gets invoked
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function createCallbackHandler(response?: any): CallbackHandlerFunc {
  return (request, callback) => {
    callback(null, response);
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

/**
 * A argument capture function for jest mocks that lets you do further investigation on a captured argument
 *
 * @param mock - a mock that you want to capture arguments for
 * @param time - the call time (first, second, etc.) of the mock
 * @param position - the position in the argument list for the mock
 */
export function captureMockArgument<TArgument>(
  mock: jest.Mock,
  time = 0,
  position = 0,
): TArgument {
  return mock.mock.calls[time][position] as TArgument;
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
