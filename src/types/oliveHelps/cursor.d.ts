declare namespace Cursor {
  interface Aptitude {
    position: Common.Readable<Position>;

    listenPosition: Common.Listenable<Position>;
  }

  interface Position {
    x: number;
    y: number;
  }
}
