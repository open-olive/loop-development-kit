import { Cancellable } from '@oliveai/ldk/dist/cancellable';
import { network } from '@oliveai/ldk';

export const finaliseWebsocketTest = async (cancellable: Cancellable, socket: network.Socket) => {
  try {
    cancellable.cancel();
    await socket.close((error) => {
      console.error(`Received error while closing websocket: ${error.message}`);
    });
  } catch (e) {
    console.error(`Received error while finalising websocket: ${e.message}`);
  }
};
