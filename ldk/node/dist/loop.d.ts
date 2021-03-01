import { Aptitudes } from './aptitudes';
/**
 * Your Loop must implement this interface.
 *
 * Here's an example implementation:
 * ```
 * const { Logger } = require('@oliveai/ldk');
 *
 * class Loop {
 *   constructor() {
 *     this.logger = new Logger('my-loop');
 *   }
 *
 *   start(aptitudes) {
 *     this.aptitudes = aptitudes;
 *     this.logger.info('started');
 *   }
 *
 *   stop() {
 *     this.aptitudes = null;
 *     this.logger.info('stopped');
 *   }
 * }
 * ```
 */
export interface Loop {
    /**
     * Executed when Olive Helps starts the Loop.
     * The Loop should not do anything before this is called.
     *
     * @param aptitudes - The Olive Helps Aptitudes. You should assign this as an instance property for use by the Loop.
     */
    start(aptitudes: Aptitudes): void;
    /**
     * Executed by Olive Helps to stop the Loop.
     * All Loop activity should stop when this is called.
     */
    stop(): void;
}
