import { promisify } from '../promisify';

/**
 * The Config aptitude allows Loops to retrieve config variables defined by an
 * organizational admin in the Loop Library, or by the developer in a local loop
 * installation.
 */
export interface Config {
  /**
   * Retrieves the Loop config
   * @returns - A promise containing a stringified object
   */
  getLoopConfig(): Promise<string>;
}

export function getLoopConfig(): Promise<string> {
  return promisify(oliveHelps.loopconfig.getLoopConfig);
}
