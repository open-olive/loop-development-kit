import { Interceptor } from '@grpc/grpc-js';
import { Logger } from '../logging';
declare const _default: (logger: Logger) => Interceptor;
/**
 * Builds an interceptor that logs low-level exceptions
 *
 * @param logger - the logger to use for logging exceptions
 */
export default _default;
