import { promisify } from '../promisify';

/**
 * The System Aptitude provides access to various operating system details
 */
export interface System {
  /**
   * Gets the current Operating System
   *
   * @returns a Promise resolving with a string representation of the host system's OS
   */
  operatingSystem(): Promise<string>;
}

export function operatingSystem(): Promise<string> {
  return promisify(oliveHelps.system.operatingSystem);
}
