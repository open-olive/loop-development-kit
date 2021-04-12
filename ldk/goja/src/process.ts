export interface ProcessInfo {
  arguments: string
  command: string
  pid: number
}

interface ProcessEvent {
  processInfo: ProcessInfo
  processAction: ProcessAction
}

enum ProcessAction {
  Unknown = 0,
  Started = 1,
  Stopped = 2
}

export interface Process {
  all(): Promise<ProcessInfo[]>
  listenAll(cb: (event: ProcessEvent) => void): void
}

export class ProcessImpl implements Process {

  all(): Promise<ProcessInfo[]> {
    return new Promise<ProcessInfo[]>((resolve, reject) => {
      try {
        oliveHelps.process.all((processInfo: ProcessInfo[]) => resolve(processInfo));
      } catch (e) {
        reject(e);
      }
    })
  }
  
  listenAll(callback: (processEvent: ProcessEvent) => void): void {
    oliveHelps.process.listenAll(callback);
  }
}
