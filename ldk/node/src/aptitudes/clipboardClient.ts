import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { ClipboardClient as ClipboardGRPCClient } from '../grpc/clipboard_grpc_pb';
import messages from '../grpc/clipboard_pb';
import { Clipboard } from './clipboard';
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
> = (message) => message.getText();

/**
 * @internal
 */
export class ClipboardClient
  extends BaseClient<ClipboardGRPCClient>
  implements Clipboard {
  protected generateClient(): GRPCClientConstructor<ClipboardGRPCClient> {
    return ClipboardGRPCClient;
  }

  text(): Promise<string> {
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

  listenText(listener: StreamListener<string>): StoppableStream<string> {
    const request = new messages.ClipboardReadStreamRequest().setSession(
      this.createSessionMessage(),
    );
    this.logger.info(
      'Stream Clipboard Request',
      'request',
      request.getJsPbMessageId() || 'not assigned',
    );
    return new TransformingStream<messages.ClipboardReadStreamResponse, string>(
      this.client.clipboardReadStream(request),
      clipboardTransformer,
      listener,
    );
  }

  writeText(text: string): Promise<void> {
    return this.buildQuery<messages.ClipboardWriteRequest, Empty, void>(
      (message, callback) => {
        this.client.clipboardWrite(message, callback);
      },
      () => new messages.ClipboardWriteRequest().setText(text),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  protected serviceName(): string {
    return 'clipboard';
  }
}
