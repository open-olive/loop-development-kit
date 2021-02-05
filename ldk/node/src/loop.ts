import { LoopSensors } from './loopSensors';

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
 *   start(sensors) {
 *     this.sensors = sensors;
 *     this.logger.info('started');
 *   }
 *
 *   stop() {
 *     this.sensors = null;
 *     this.logger.info('stopped');
 *   }
 * }
 * ```
 */
export interface Loop {
  /**
   * Executed when the host starts the Loop.
   * The Loop should not do anything before this is called.
   *
   * @param sensors - The Loop sensors. You should assign this as an instance property for use by the Loop.
   */
  start(sensors: LoopSensors): void;
  /**
   * Executed by when the Loop is stopped.
   * All Loop activity should stop when this is called.
   */
  stop(): void;
}
