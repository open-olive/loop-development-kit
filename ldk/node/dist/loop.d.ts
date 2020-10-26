import { HostServices } from './hostServices';
/**
 * Your Loop must implement this interface.
 *
 * Here's an example implementation:
 * ```
 * const { Logger } = require('ldk');
 *
 * class Loop {
 *   constructor() {
 *     this.logger = new Logger('my-loop');
 *   }
 *
 *   start(services) {
 *     this.services = services;
 *     this.logger.info('started');
 *   }
 *
 *   stop() {
 *     this.host = null;
 *     this.logger.info('stopped');
 *   }
 * }
 * ```
 */
export interface Loop {
    /**
     * Executed when the host starts the plugin.
     * The plugin should not do anything before this is called.
     *
     * @param host - The host services. You should assign this as an instance property for use by the Loop.
     */
    start(host: HostServices): void;
    /**
     * Executed by the host to stop the plugin.
     * All plugin activity should stop when this is called.
     */
    stop(): void;
}
