import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { ClipboardClient as ClipboardGRPCClient } from '../grpc/clipboard_grpc_pb';
import messages from '../grpc/clipboard_pb';
import { ClipboardService } from './clipboardService';
import { StreamTransformer, TransformingStream } from './transformingStream';
import { StoppableStream, StreamListener } from './stoppables';

/**
 * @internal
 *
 * @param message - The message to transform.
 */
const clipboardTransformer: StreamTransformer<
  messages.ClipboardReadResponse | messages.ClipboardReadStreamResponse,
  string
> = (message) => {
  return message.getText();
};

/**
 * @internal
 */
export class ClipboardClient
  extends BaseClient<ClipboardGRPCClient>
  implements ClipboardService {
  protected generateClient(): GRPCClientConstructor<ClipboardGRPCClient> {
    return ClipboardGRPCClient;
  }

  queryClipboard(): Promise<string> {
    return this.buildQuery<
      messages.ClipboardReadRequest,
      messages.ClipboardReadResponse,
      string
    >(
      (message, callback) => this.client.clipboardRead(message, callback),
      () => new messages.ClipboardReadRequest(),
      clipboardTransformer,
    );
  }

  streamClipboard(listener: StreamListener<string>): StoppableStream<string> {
    return new TransformingStream<messages.ClipboardReadStreamResponse, string>(
      this.client.clipboardReadStream(
        new messages.ClipboardReadStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      clipboardTransformer,
      listener,
    );
  }

  writeClipboard(text: string): Promise<void> {
    return this.buildQuery<messages.ClipboardWriteRequest, Empty, void>(
      (message, callback) => {
        this.client.clipboardWrite(message, callback);
      },
      () => new messages.ClipboardWriteRequest().setText(text),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }
}
