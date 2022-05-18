declare namespace Clipboard {
  interface Aptitude {
    read: Common.Readable<string>;

    write: Common.ReadableWithParam<string, void>;

    listen2: Common.ListenableWithParam<boolean, string>;

  }
}
