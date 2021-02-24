import BaseClient, { GRPCClientConstructor } from './baseClient';
import { CursorClient as CursorGRPCClient } from '../grpc/cursor_grpc_pb';
import messages from '../grpc/cursor_pb';
import { Cursor, CursorPosition } from './cursor';
import { StreamTransformer, TransformingStream } from './transformingStream';
import { StoppableStream, StreamListener } from './stoppables';

/**
 * @internal
 * @param message - The message to transform.
 */
const cursorTransformer: StreamTransformer<
  messages.CursorPositionStreamResponse | messages.CursorPositionResponse,
  CursorPosition
> = (message) => ({
  screen: message.getScreen(),
  x: message.getX(),
  y: message.getY(),
});

/**
 * @internal
 */
export class CursorClient
  extends BaseClient<CursorGRPCClient>
  implements Cursor {
  protected generateClient(): GRPCClientConstructor<CursorGRPCClient> {
    return CursorGRPCClient;
  }

  position(): Promise<CursorPosition> {
    return this.buildQuery<
      messages.CursorPositionRequest,
      messages.CursorPositionResponse,
      CursorPosition
    >(
      (message, callback) => this.client.cursorPosition(message, callback),
      () => new messages.CursorPositionRequest(),
      cursorTransformer,
    );
  }

  listenPosition(
    listener: StreamListener<CursorPosition>,
  ): StoppableStream<CursorPosition> {
    return new TransformingStream<
      messages.CursorPositionStreamResponse,
      CursorPosition
    >(
      this.client.cursorPositionStream(
        new messages.CursorPositionStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      cursorTransformer,
      listener,
    );
  }

  protected serviceName(): string {
    return 'cursor';
  }
}
