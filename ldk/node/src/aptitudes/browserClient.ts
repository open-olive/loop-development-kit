import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import Messages from '../grpc/browser_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { BrowserSelectedTextResponse, Browser } from './browser';
import { StoppableStream, StreamListener } from './stoppables';
import { StreamTransformer, TransformingStream } from './transformingStream';

/**
 * @internal
 *
 * @param message - The message to transform.
 */
const transformSelectedTextResponse: StreamTransformer<
  | Messages.BrowserSelectedTextResponse
  | Messages.BrowserSelectedTextStreamResponse,
  BrowserSelectedTextResponse
> = (message) => ({
  url: message.getUrl(),
  text: message.getText(),
  tabTitle: message.getTabtitle(),
});

/**
 * @internal
 */
export class BrowserClient
  extends BaseClient<BrowserGRPCClient>
  implements Browser {
  queryActiveURL(): Promise<string> {
    return this.buildQuery<
      Messages.BrowserActiveURLRequest,
      Messages.BrowserActiveURLResponse,
      string
    >(
      (message, callback) => this.client.browserActiveURL(message, callback),
      () => new Messages.BrowserActiveURLRequest(),
      (response) => response.getUrl(),
    );
  }

  querySelectedText(): Promise<BrowserSelectedTextResponse> {
    return this.buildQuery<
      Messages.BrowserSelectedTextRequest,
      Messages.BrowserSelectedTextResponse,
      BrowserSelectedTextResponse
    >(
      (message, callback) => this.client.browserSelectedText(message, callback),
      () => new Messages.BrowserSelectedTextRequest(),
      transformSelectedTextResponse,
    );
  }

  streamActiveURL(listener: StreamListener<string>): StoppableStream<string> {
    return new TransformingStream<
      Messages.BrowserActiveURLStreamResponse,
      string
    >(
      this.client.browserActiveURLStream(
        new Messages.BrowserActiveURLRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (message) => message.getUrl(),
      listener,
    );
  }

  streamSelectedText(
    listener: StreamListener<BrowserSelectedTextResponse>,
  ): StoppableStream<BrowserSelectedTextResponse> {
    return new TransformingStream<
      Messages.BrowserSelectedTextStreamResponse,
      BrowserSelectedTextResponse
    >(
      this.client.browserSelectedTextStream(
        new Messages.BrowserSelectedTextStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      transformSelectedTextResponse,
      listener,
    );
  }

  protected generateClient(): GRPCClientConstructor<BrowserGRPCClient> {
    return BrowserGRPCClient;
  }

  protected serviceName(): string {
    return 'browser';
  }
}
