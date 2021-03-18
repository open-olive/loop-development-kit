import { Interceptor } from '@grpc/grpc-js';
import { ILogger } from '../logging';
declare const _default: (logger: ILogger) => Interceptor;
/**
 * Builds an interceptor that logs low-level exceptions
 *
 * @param logger - the logger to use for logging exceptions
 */
export default _default;
