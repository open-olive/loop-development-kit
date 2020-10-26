import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { CursorClient as CursorGRPCClient } from '../grpc/cursor_grpc_pb';
import messages from '../grpc/cursor_pb';
import { CursorService, CursorResponse } from './cursorService';
import { StreamTransformer, TransformingStream } from './transformingStream';
import { StoppableStream, StreamListener } from './stoppableStream';

/**
 * @internal
 * @param message
 */
const cursorTransformer: StreamTransformer<
  messages.CursorPositionStreamResponse | messages.CursorPositionResponse,
  CursorResponse
> = (message) => {
  return {
    screen: message.getScreen(),
    x: message.getX(),
    y: message.getY(),
  };
};

/**
 * @internal
 */
export class CursorClient
  extends BaseClient<CursorGRPCClient>
  implements CursorService {
  protected generateClient(): GRPCClientConstructor<CursorGRPCClient> {
    return CursorGRPCClient;
  }

  queryCursorPosition(): Promise<CursorResponse> {
    return this.buildQuery<
      Empty,
      messages.CursorPositionResponse,
      CursorResponse
    >(
      (message, callback) => this.client.cursorPosition(message, callback),
      () => new Empty(),
      cursorTransformer,
    );
  }

  streamCursorPosition(
    listener: StreamListener<CursorResponse>,
  ): StoppableStream<CursorResponse> {
    return new TransformingStream<
      messages.CursorPositionStreamResponse,
      CursorResponse
    >(
      this.client.cursorPositionStream(new Empty()),
      cursorTransformer,
      listener,
    );
  }
}
