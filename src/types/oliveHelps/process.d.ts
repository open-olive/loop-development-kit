declare namespace Process {
  interface Aptitude {
    all: Common.Readable<ProcessInfo[]>;

    listenAll: Common.Listenable<ProcessEvent>;
  }

  type ProcessActionUnknown = 0;
  type ProcessActionStarted = 1;
  type ProcessActionStopped = 2;
  type ProcessAction = ProcessActionUnknown | ProcessActionStarted | ProcessActionStopped;

  interface ProcessEvent {
    processInfo: ProcessInfo;
    processAction: ProcessAction;
  }

  interface ProcessInfo {
    arguments: string;
    command: string;
    pid: number;
  }
}
