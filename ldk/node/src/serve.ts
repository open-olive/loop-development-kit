import { Loop } from './loop';
import Plugin from './plugin';

/**
 * Takes a Loop implementation and launches it as a plugin.
 *
 * @param loop - The Loop implementation.
 */
export function serveLoop(loop: Loop): void {
  const plugin = new Plugin(loop);
  plugin.serve();
}
