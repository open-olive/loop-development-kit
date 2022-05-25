declare namespace Clipboard {
  interface Aptitude {
    read: Common.Readable<string>;

    write: Common.ReadableWithParam<string, void>;

    listenAll: Common.Listenable<string>;
  }
}
