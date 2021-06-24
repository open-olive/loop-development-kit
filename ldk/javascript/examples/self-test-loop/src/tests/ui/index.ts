import { ui } from '@oliveai/ldk';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

export const uiSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
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

export const uiGlobalSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
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
