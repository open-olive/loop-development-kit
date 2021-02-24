import Messages, { WindowActionPB } from '../grpc/window_pb';
import { WindowClient as WindowGRPCClient } from '../grpc/window_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  WindowInfo,
  WindowEvent,
  Window,
  WindowAction,
} from './window';
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';

/**
 * @param action - The action.
 * @internal
 */
function parseWindowAction(action: WindowActionPB): WindowAction {
  switch (action) {
    case WindowActionPB.WINDOW_ACTION_FOCUSED:
      return WindowAction.Focused;
    case WindowActionPB.WINDOW_ACTION_UNFOCUSED:
      return WindowAction.Unfocused;
    case WindowActionPB.WINDOW_ACTION_OPENED:
      return WindowAction.Opened;
    case WindowActionPB.WINDOW_ACTION_CLOSED:
      return WindowAction.Closed;
    case WindowActionPB.WINDOW_ACTION_TITLE_CHANGED:
      return WindowAction.TitleChanged;
    case WindowActionPB.WINDOW_ACTION_MOVED:
      return WindowAction.Moved;
    case WindowActionPB.WINDOW_ACTION_RESIZED:
      return WindowAction.Resized;
    case WindowActionPB.WINDOW_ACTION_UNKNOWN:
    default:
      return WindowAction.Unknown;
  }
}

/**
 * @internal
 */
export class WindowClient
  extends BaseClient<WindowGRPCClient>
  implements Window {
  protected generateClient(): GRPCClientConstructor<WindowGRPCClient> {
    return WindowGRPCClient;
  }

  activeWindow(): Promise<WindowInfo> {
    return this.buildQuery<
      Messages.WindowActiveWindowRequest,
      Messages.WindowActiveWindowResponse,
      WindowInfo
    >(
      (message, callback) => this.client.windowActiveWindow(message, callback),
      () => new Messages.WindowActiveWindowRequest(),
      (response) => response.toObject().window,
    );
  }

  windows(): Promise<WindowInfo[]> {
    return this.buildQuery<
      Messages.WindowStateRequest,
      Messages.WindowStateResponse,
      WindowInfo[]
    >(
      (message, callback) => this.client.windowState(message, callback),
      () => new Messages.WindowStateRequest(),
      (response) => response.toObject().windowList,
    );
  }

  listenActiveWindow(
    listener: StreamListener<WindowInfo>,
  ): StoppableStream<WindowInfo> {
    return new TransformingStream<
      Messages.WindowActiveWindowStreamResponse,
      WindowInfo
    >(
      this.client.windowActiveWindowStream(
        new Messages.WindowActiveWindowStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (response) => response.toObject().window,
      listener,
    );
  }

  listenWindows(
    listener: StreamListener<WindowEvent>,
  ): StoppableStream<WindowEvent> {
    return new TransformingStream<
      Messages.WindowStateStreamResponse,
      WindowEvent
    >(
      this.client.windowStateStream(
        new Messages.WindowStateStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (response) => {
        const window = response.getWindow();
        if (window == null) {
          return undefined;
        }
        return {
          window: window.toObject(),
          action: parseWindowAction(response.getAction()),
        };
      },
      listener,
    );
  }

  protected serviceName(): string {
    return 'window';
  }
}
