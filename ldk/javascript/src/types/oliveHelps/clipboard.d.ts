declare namespace Clipboard {
  interface Aptitude {
    read: Common.Readable<string>;

    write: Common.ReadableWithParam<string, void>;

    // listen: Common.Listenable<string>;

    listen2: Common.ListenableWithParam<boolean, string>;

    // includeOliveHelpsEvents(enabled: boolean): void;
  }
}
