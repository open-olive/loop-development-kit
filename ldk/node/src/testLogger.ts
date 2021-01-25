/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any */
import { ILogger } from './logging';

/**
 * This ILogger implementation swallows logging statements.
 *
 * @internal
 */
export class TestLogger implements ILogger {
  debug(): void {}

  error(): void {}

  info(): void {}

  trace(): void {}

  warn(): void {}

  with(): ILogger {
    return this;
  }
}
