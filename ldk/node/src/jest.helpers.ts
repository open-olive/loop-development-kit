import {
  ClientReadableStream,
  ClientReadableStreamImpl,
} from '@grpc/grpc-js/build/src/call';

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
 * A simple streaming handler that passes back the response for every stream chunk
 *
 * @param response - the response to pass through each time the handler streams a chunk
 */
export function createStreamingHandler<TResponse>(response: TResponse) {
  return (): ClientReadableStream<TResponse> => {
    return new ClientReadableStreamImpl<TResponse>(() => {
      return response;
    });
  };
}

/**
 * A argument capture function for jest mocks that lets you do further investigation on a capture argument
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
