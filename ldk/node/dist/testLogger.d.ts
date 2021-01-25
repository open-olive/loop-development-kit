import { ILogger } from './logging';
/**
 * This ILogger implementation swallows logging statements.
 *
 * @internal
 */
export declare class TestLogger implements ILogger {
    debug(): void;
    error(): void;
    info(): void;
    trace(): void;
    warn(): void;
    with(): ILogger;
}
