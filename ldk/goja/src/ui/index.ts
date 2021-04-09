export interface UI {
  listenSearchbar(cb: (val: string) => void): void;
  listenGlobalSearch(cb: (val: string) => void): void;
}

export class UIImpl implements UI {
  listenSearchbar(cb: (val: string) => void): void {
    return oliveHelps.ui.listenSearchbar(cb);
  }

  listenGlobalSearch(cb: (val: string) => void): void {
    return oliveHelps.ui.listenSearchbar(cb);
  }
}
