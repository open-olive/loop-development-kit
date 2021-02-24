import BaseClient, { GRPCClientConstructor } from './baseClient';
import { UIClient as UIGRPCClient } from '../grpc/ui_grpc_pb';
import { Ui } from './ui';
import { StoppableStream, StreamListener } from './stoppables';
import Messages from '../grpc/ui_pb';
import { TransformingStream } from './transformingStream';

export class UIClient extends BaseClient<UIGRPCClient> implements Ui {
  protected generateClient(): GRPCClientConstructor<UIGRPCClient> {
    return UIGRPCClient;
  }

  listenSearchbar(listener: StreamListener<string>): StoppableStream<string> {
    return new TransformingStream<Messages.SearchbarStreamResponse, string>(
      this.client.searchbarStream(
        new Messages.SearchbarStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (message) => message.getText(),
      listener,
    );
  }

  listenGlobalSearch(
    listener: StreamListener<string>,
  ): StoppableStream<string> {
    return new TransformingStream<Messages.GlobalSearchStreamResponse, string>(
      this.client.globalSearchStream(
        new Messages.GlobalSearchStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (message) => message.getText(),
      listener,
    );
  }

  protected serviceName(): string {
    return 'ui';
  }
}
