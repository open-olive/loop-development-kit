import { StoppableStream, StreamListener } from './stoppables';
export interface Ui {
    streamSearchbar(listener: StreamListener<string>): StoppableStream<string>;
    streamGlobalSearch(listener: StreamListener<string>): StoppableStream<string>;
}
