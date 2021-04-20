import { Cancellable } from '../cancellable';
import { promisify } from "../promisify";

export interface ProcessInfo {
  arguments: string;
  command: string;
  pid: number;
}

export enum ProcessAction {
  Started = 1,
  Unknown = 0,
  Stopped = 2,
}

export interface ProcessEvent {
  processInfo: ProcessInfo;
  processAction: ProcessAction;
}

/**
 * The ProcessService provides access to the list of running processes for all users.
 */
export interface Process {
  /**
   * Gets a list of the current running processes for all users.
   *
   * @returns a Promise resolving with a list of the current processes.
   */
  all(): Promise<ProcessInfo[]>;

  /**
   * Starts listening for processes starting and stopping for all users.
   *
   * @param callback - callback function called every time a process is started or stopped.
   */
  listenAll(callback: (event: ProcessEvent) => void): Cancellable;
}

function all(): Promise<ProcessInfo[]> {
  return promisify(oliveHelps.process.all);
}

function listenAll(callback: (processEvent: ProcessEvent) => void): Cancellable {
  return oliveHelps.process.listenAll(callback);
}

export const process = {
  all,
  listenAll,
};
