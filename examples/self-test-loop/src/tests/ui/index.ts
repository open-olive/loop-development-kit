import { ui } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const testListenSearchbar = (): Promise<boolean> =>
  new Promise((resolve) => {
    let uiStream: Cancellable;
    ui.listenSearchbar((value) => {
      if (value.toLowerCase() === 'for life') {
        uiStream.cancel();
        resolve(true);
      }
    }).then((cancellable: Cancellable) => {
      uiStream = cancellable;
    });
  });

export const testListenGlobalSearch = (): Promise<boolean> =>
  new Promise((resolve) => {
    let uiStream: Cancellable;
    ui.listenGlobalSearch((value) => {
      if (value.toLowerCase() === 'for meaning') {
        uiStream.cancel();
        resolve(true);
      }
    }).then((cancellable: Cancellable) => {
      uiStream = cancellable;
    });
  });
