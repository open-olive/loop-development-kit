declare namespace UI {
  interface Aptitude {
    listenSearchbar: Common.Listenable<string>;

    listenGlobalSearch: Common.Listenable<string>;

    loopOpenHandler: Common.Listenable<void>;
  }
}
