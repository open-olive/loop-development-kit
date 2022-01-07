declare namespace Browser {
  interface Aptitude {
    listenNavigation: Common.Listenable<NavigationDetails>;
    listenTextSelection: Common.Listenable<string>;
    listenNetworkActivity: Common.Listenable<NetworkActivityDetails>;
    openTab: Common.ReadableWithParam<string, number>;
    openWindow: Common.ReadableWithParam<string, number>;
    openTab2: Common.ReadableWithParam<string, PageDetails>;
    openWindow2: Common.ReadableWithParam<string, PageDetails>;
    sourceHTML: Common.ReadableWithParam<string, PageDetails>;
  }

  interface NavigationDetails {
    frameId: number;
    parentFrameId: number;
    tabId: number;
    timestamp: number;
    url: string;
  }

  interface NetworkActivityDetails {
    tabId: number;
    requestUrl: string;
    method: string;
    requestBody: null | string;
    domain: string;
  }

  interface PageDetails {
    id: number;
    sourceHTML: string;
  }
}
