declare namespace Browser {
  interface Aptitude {
    listenNavigation: Common.Listenable<NavigationDetails>;
    listenTextSelection: Common.Listenable<string>;
    openTab: Common.ReadableWithParam<string, number>;
    openWindow: Common.ReadableWithParam<string, number>;
  }

  interface NavigationDetails {
    frameId: number;
    parentFrameId: number;
    tabId: number;
    timestamp: number;
    url: string;
  }
}
