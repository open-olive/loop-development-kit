import {
  InterceptingCall,
  Interceptor,
  InterceptorOptions,
  ListenerBuilder,
  RequesterBuilder,
} from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import { NextCall } from '@grpc/grpc-js/build/src/client-interceptors';
import { ILogger } from '../logging';

const METHOD_PATH = /^\/proto\.(?<service>\w+)\/(?<method>\w+)$/;
/**
 * Extracts a standardized method context from string based interceptor options
 *
 * @param options - interceptor options, including the method definition
 */
function extractContext(options: InterceptorOptions) {
  const match = METHOD_PATH.exec(options.method_definition.path);

  return {
    service: match?.groups?.service || 'UNKNOWN',
    method: match?.groups?.method || 'UNKNOWN',
  };
}
/**
 * Builds an interceptor that logs low-level exceptions
 *
 * @param logger - the logger to use for logging exceptions
 */
export default (logger: ILogger): Interceptor => (
  options: InterceptorOptions,
  nextCall: NextCall,
) => {
  const listener = new ListenerBuilder()
    .withOnReceiveStatus((status, next) => {
      if (status.code !== grpc.status.OK) {
        const { service, method } = extractContext(options);
        logger.error(
          'Client exception',
          'error',
          status.details,
          'service',
          service,
          'method',
          method,
        );
      }
      next(status);
    })
    .build();

  const requester = new RequesterBuilder()
    .withStart((metadata, _listener, next) => {
      next(metadata, listener);
    })
    .build();

  return new InterceptingCall(nextCall(options), requester);
};
