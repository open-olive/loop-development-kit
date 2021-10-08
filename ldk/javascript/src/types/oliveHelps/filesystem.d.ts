declare namespace Filesystem {
  interface Aptitude {
    copy: Common.ReadableWithTwoParams<string, string, void>;

    dir: Common.ReadableWithParam<string, FileInfo[]>;

    exists: Common.ReadableWithParam<string, boolean>;

    listenDir: Common.ListenableWithParam<string, FileEvent>;

    listenFile: Common.ListenableWithParam<string, FileEvent>;

    makeDir: Common.ReadableWithTwoParams<string, WriteMode, void>;

    move: Common.ReadableWithTwoParams<string, string, void>;

    readFile: Common.ReadableWithParam<string, ArrayBuffer>;

    remove: Common.ReadableWithParam<string, void>;

    stat: Common.ReadableWithParam<string, FileInfo>;

    writeFile: Common.ReadableWithFourParams<
      string,
      Array<number>,
      WriteOperation,
      WriteMode,
      void
    >;

    join: Common.ReadableWithParam<string[], string>;

    unzip: Common.ReadableWithTwoParams<string, string, void>;

    openWithDefaultApplication: Common.ReadableWithParam<string, void>;

    workDir: Common.Readable<string>;
  }

  interface FileInfo {
    name: string;
    size: number;
    mode: string;
    modTime: GoTime;
    isDir: boolean;
  }

  interface GoTime {
    UnixNano: () => number;
  }

  interface FileEvent {
    action: string;
    info: FileInfo;
  }

  type WriteMode = number;

  type WriteOperationOverwrite = 1;
  type WriteOperationAppend = 2;
  type WriteOperation = WriteOperationOverwrite | WriteOperationAppend;
}
