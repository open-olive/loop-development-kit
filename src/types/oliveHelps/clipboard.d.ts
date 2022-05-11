declare namespace Clipboard {
  interface Aptitude {
    read: Common.Readable<string>;

    write: Common.ReadableWithParam<string, void>;

    listen: Common.Listenable<string>;

    includeOliveHelpsEvents(enabled: boolean): void;
  }
}
