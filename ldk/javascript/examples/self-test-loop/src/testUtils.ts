import { Cancellable } from '@oliveai/ldk/dist/cancellable';
import { network } from '@oliveai/ldk';

export const finalizeWebsocketTest = async (cancellable: Cancellable, socket: network.Socket) => {
  try {
    cancellable.cancel();
    await socket.close();
  } catch (e) {
    console.error(`Received error while finalizing websocket: ${e.message}`);
  }
};
