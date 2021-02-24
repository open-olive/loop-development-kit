import { StoppableStream, StreamListener } from './stoppables';

export interface Ui {
  listenSearchbar(listener: StreamListener<string>): StoppableStream<string>;
  listenGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
}
