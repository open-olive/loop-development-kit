import { StoppableStream, StreamListener } from './stoppables';
export declare enum ProcessAction {
    Unknown = "unknown",
    Started = "started",
    Stopped = "stopped"
}
export interface ProcessInfo {
    pid: number;
    command: string;
    arguments: string;
}
export interface ProcessEvent {
    process: ProcessInfo;
    action: ProcessAction;
}
export interface ProcessInfoList {
    processes: ProcessInfo[];
}
/**
 * The Process Aptitude allows you to query and listen for OS processes.
 */
export interface Process {
    /**
     * Gets a list of the current running processes.
     *
     * @returns a Promise resolving with a list of the current processes.
     */
    processes(): Promise<ProcessInfoList>;
    /**
     * Listen for processes starting and stopping.
     *
     * @param listener - Listener function called every time a process is started or stopped.
     */
    listenProcesses(listener: StreamListener<ProcessEvent>): StoppableStream<ProcessEvent>;
}
