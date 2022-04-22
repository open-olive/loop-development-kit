import { promisify } from '../promisify';

/**
 *  The System Aptitude provides access to various operating system details
 */
export interface System {
  /**
   * Gets the current Operating System
   *
   * @returns a Promise resolving with a string representation of the host system's OS
   */
  operatingSystem(): Promise<string>;
  getEnvironment(): Promise<SystemEnvironment>;
}

export interface SystemEnvironment {
  osVersion: string;
  oliveHelpsVersion: string;
  loopVersion: string;
}

export function getEnvironment(): Promise<SystemEnvironment> {
  return promisify(oliveHelps.system.getEnvironment);
}

export function operatingSystem(): Promise<string> {
  return promisify(oliveHelps.system.operatingSystem);
}
