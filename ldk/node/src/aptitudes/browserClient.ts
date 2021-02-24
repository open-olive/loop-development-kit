import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import Messages from '../grpc/browser_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { SelectedText, Browser } from './browser';
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
  SelectedText
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
  activeURL(): Promise<string> {
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

  selectedText(): Promise<SelectedText> {
    return this.buildQuery<
      Messages.BrowserSelectedTextRequest,
      Messages.BrowserSelectedTextResponse,
      SelectedText
    >(
      (message, callback) => this.client.browserSelectedText(message, callback),
      () => new Messages.BrowserSelectedTextRequest(),
      transformSelectedTextResponse,
    );
  }

  listenActiveURL(listener: StreamListener<string>): StoppableStream<string> {
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

  listenActiveText(
    listener: StreamListener<SelectedText>,
  ): StoppableStream<SelectedText> {
    return new TransformingStream<
      Messages.BrowserSelectedTextStreamResponse,
      SelectedText
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
