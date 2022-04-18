declare namespace Browser {
  type NavigationTypeReal = 'real';
  type NavigationTypeHistory = 'history';

  type NavigationType = NavigationTypeReal | NavigationTypeHistory;

  interface Aptitude {
    openTab: Common.ReadableWithParam<string, number>;
    openWindow: Common.ReadableWithParam<string, number>;
    openTab2: Common.ReadableWithParam<string, PageDetails>;
    openWindow2: Common.ReadableWithParam<string, PageDetails>;
    sourceHTML: Common.ReadableWithParam<string, PageDetails>;
    listenNavigation: Common.Listenable<NavigationDetails>;
    listenNetworkActivity: Common.Listenable<NetworkActivityDetails>;
    listenTabChange: Common.Listenable<TabChangeDetails>;
    listenTextSelection: Common.Listenable<string>;
    listenUIElement: Common.ListenableWithParam<UIElementArguments, UIElementDetails>;
  }

  interface NavigationDetails {
    frameId: number;
    navigationType: NavigationType;
    parentFrameId: number;
    tabId: number;
    timestamp: number;
    url: string;
  }

  interface NetworkActivityDetails {
    domain: string;
    frameId: number;
    method: string;
    requestUrl: string;
    requestBody: null | string;
    tabId: number;
    type: string;
  }

  interface PageDetails {
    id: number;
    sourceHTML: string;
  }

  interface TabChangeDetails {
    tabId: number;
    title: string;
    url: string;
    windowId: number;
  }

  interface UIElementArguments {
    selector: string;
    address: string;
  }
  interface UIElementDetails {
    type: string;
    selector: string;
  }
}
