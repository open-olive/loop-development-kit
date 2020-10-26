import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import Messages, { WindowAction } from '../grpc/window_pb';
import { WindowClient as WindowGRPCClient } from '../grpc/window_grpc_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  WindowService,
  WindowInfoResponse,
  WindowInfoStreamResponse,
  WindowStreamAction,
} from './windowService';
import { StoppableStream, StreamListener } from './stoppableStream';
import { TransformingStream } from './transformingStream';

/**
 * @param action
 * @internal
 */
function parseWindowAction(action: Messages.WindowAction): WindowStreamAction {
  switch (action) {
    case WindowAction.WINDOW_ACTION_FOCUSED:
      return WindowStreamAction.Focused;
    case WindowAction.WINDOW_ACTION_UNFOCUSED:
      return WindowStreamAction.Unfocused;
    case WindowAction.WINDOW_ACTION_OPENED:
      return WindowStreamAction.Opened;
    case WindowAction.WINDOW_ACTION_CLOSED:
      return WindowStreamAction.Closed;
    case WindowAction.WINDOW_ACTION_UNKNOWN:
    default:
      return WindowStreamAction.Unknown;
  }
}

/**
 * @internal
 */
export class WindowClient
  extends BaseClient<WindowGRPCClient>
  implements WindowService {
  protected generateClient(): GRPCClientConstructor<WindowGRPCClient> {
    return WindowGRPCClient;
  }

  queryActiveWindow(): Promise<WindowInfoResponse> {
    return this.buildQuery<
      Messages.WindowActiveWindowRequest,
      Messages.WindowActiveWindowResponse,
      WindowInfoResponse
    >(
      (message, callback) => this.client.windowActiveWindow(message, callback),
      () => new Messages.WindowActiveWindowRequest(),
      (response) => {
        return response.toObject().window;
      },
    );
  }

  queryWindows(): Promise<WindowInfoResponse[]> {
    return this.buildQuery<
      Messages.WindowStateRequest,
      Messages.WindowStateResponse,
      WindowInfoResponse[]
    >(
      (message, callback) => this.client.windowState(message, callback),
      () => new Messages.WindowStateRequest(),
      (response) => response.toObject().windowList,
    );
  }

  streamActiveWindow(
    listener: StreamListener<WindowInfoResponse>,
  ): StoppableStream<WindowInfoResponse> {
    return new TransformingStream<
      Messages.WindowActiveWindowStreamResponse,
      WindowInfoResponse
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

  streamWindows(
    listener: StreamListener<WindowInfoStreamResponse>,
  ): StoppableStream<WindowInfoStreamResponse> {
    return new TransformingStream<
      Messages.WindowStateStreamResponse,
      WindowInfoStreamResponse
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
}
