import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { BrowserClient as BrowserGRPCClient } from '../grpc/browser_grpc_pb';
import Messages from '../grpc/browser_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { BrowserSelectedTextResponse, BrowserService } from './browserService';
import { StoppableStream, StreamListener } from './stoppableStream';
import { StreamTransformer, TransformingStream } from './transformingStream';

/**
 * @internal
 *
 * @param message
 */
const transformSelectedTextResponse: StreamTransformer<
  | Messages.BrowserSelectedTextResponse
  | Messages.BrowserSelectedTextStreamResponse,
  BrowserSelectedTextResponse
> = (message) => {
  return {
    url: message.getUrl(),
    text: message.getText(),
    tabTitle: message.getTabtitle(),
  };
};

/**
 * @internal
 */
export class BrowserClient
  extends BaseClient<BrowserGRPCClient>
  implements BrowserService {
  queryActiveURL(): Promise<string> {
    return this.buildQuery<Empty, Messages.BrowserActiveURLResponse, string>(
      (message, callback) => this.client.browserActiveURL(message, callback),
      () => new Empty(),
      (response) => response.getUrl(),
    );
  }

  querySelectedText(): Promise<BrowserSelectedTextResponse> {
    return this.buildQuery<
      Empty,
      Messages.BrowserSelectedTextResponse,
      BrowserSelectedTextResponse
    >(
      (message, callback) => this.client.browserSelectedText(message, callback),
      () => new Empty(),
      transformSelectedTextResponse,
    );
  }

  streamActiveURL(listener: StreamListener<string>): StoppableStream<string> {
    return new TransformingStream<
      Messages.BrowserActiveURLStreamResponse,
      string
    >(
      this.client.browserActiveURLStream(new Empty()),
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
      this.client.browserSelectedTextStream(new Empty()),
      transformSelectedTextResponse,
      listener,
    );
  }

  protected generateClient(): GRPCClientConstructor<BrowserGRPCClient> {
    return BrowserGRPCClient;
  }
}
