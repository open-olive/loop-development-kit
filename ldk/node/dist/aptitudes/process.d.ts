import { StoppableStream, StreamListener } from './stoppables';
export declare enum ProcessStreamAction {
    Unknown = "unknown",
    Started = "started",
    Stopped = "stopped"
}
export interface ProcessInfoResponse {
    pid: number;
    command: string;
    arguments: string;
}
export interface ProcessStreamResponse {
    process: ProcessInfoResponse;
    action: ProcessStreamAction;
}
export interface ProcessListResponse {
    processes: ProcessInfoResponse[];
}
/**
 * The Process provides access to the list of running processes.
 */
export interface Process {
    /**
     * Gets a list of the current running processes.
     *
     * @returns a Promise resolving with a list of the current processes.
     */
    readProcesses(): Promise<ProcessListResponse>;
    /**
     * Starts listening for processes starting and stopping.
     *
     * @param listener - Listener function called every time a process is started or stopped.
     */
    listenProcesses(listener: StreamListener<ProcessStreamResponse>): StoppableStream<ProcessStreamResponse>;
}
