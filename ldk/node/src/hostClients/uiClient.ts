import BaseClient, { GRPCClientConstructor } from './baseClient';
import { UIClient as UIGRPCClient } from '../grpc/ui_grpc_pb';
import { UISensor } from './uiSensor';
import { StoppableStream, StreamListener } from './stoppables';
import Messages from '../grpc/ui_pb';
import { TransformingStream } from './transformingStream';

export class UIClient extends BaseClient<UIGRPCClient> implements UISensor {
  protected generateClient(): GRPCClientConstructor<UIGRPCClient> {
    return UIGRPCClient;
  }

  streamSearchbar(listener: StreamListener<string>): StoppableStream<string> {
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

  streamGlobalSearch(
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

  protected sensorName(): string {
    return 'ui';
  }
}
