declare namespace Clipboard {
  interface Aptitude {
    includeOliveHelpsEvents(enabled: boolean): void;

    listen: Common.Listenable<string>;

    listenAll: Common.Listenable<string>;

    read: Common.Readable<string>;

    write: Common.ReadableWithParam<string, void>;
    
  }
}
