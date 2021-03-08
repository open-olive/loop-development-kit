import { ClientReadableStream } from '@grpc/grpc-js/build/src/call';
import { Metadata } from '@grpc/grpc-js';
import { createEmptyStream, FakeResponseMessage } from '../test.helpers';
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';

describe('TransformingStream', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('.constructor', () => {
    const stream: ClientReadableStream<FakeResponseMessage> = createEmptyStream();

    describe('with a listener', () => {
      let fakeListener: jest.Mock<StreamListener<FakeResponseMessage>>;
      beforeEach(() => {
        fakeListener = jest.fn();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const transformingStream: StoppableStream<FakeResponseMessage> = new TransformingStream<
          FakeResponseMessage,
          FakeResponseMessage
        >(stream, (response) => response, fakeListener);
      });

      test('on success it passes the data to the provided callback', () => {
        const dataMessage = new FakeResponseMessage('good stuff');

        stream.emit('data', dataMessage);

        expect(fakeListener).toHaveBeenCalledWith(null, dataMessage);
      });

      test('on sensor level error, it passes the error to the provided callback', () => {
        const errorMessage = 'but also bad stuff';
        const messageWithError = new FakeResponseMessage('good stuff', errorMessage);

        stream.emit('data', messageWithError);

        expect(fakeListener).toHaveBeenCalledWith(errorMessage);
      });

      test('on low level failure (grpc.ServiceError), it passes the error to the provided callback', () => {
        const exampleError = {
          name: 'bad',
          message: 'bad',
          code: 1,
          details: 'details to be passed along',
          metadata: new Metadata(),
        };

        stream.emit('error', exampleError);

        expect(fakeListener).toHaveBeenCalledWith(exampleError.details);
      });
    });
    describe('without a listener', () => {
      beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const transformingStream: StoppableStream<FakeResponseMessage> = new TransformingStream<
          FakeResponseMessage,
          FakeResponseMessage
        >(stream, (response) => response);
      });

      test('on success it does not throw an error', () => {
        const dataMessage = new FakeResponseMessage('good stuff');

        expect(stream.emit('data', dataMessage)).toBeTruthy();
      });

      test('on sensor level error, it does not throw an error', () => {
        const errorMessage = 'but also bad stuff';
        const messageWithError = new FakeResponseMessage('good stuff', errorMessage);

        expect(stream.emit('data', messageWithError)).toBeTruthy();
      });

      test('on low level failure (grpc.ServiceError), it does not throw an error', () => {
        const exampleError = {
          name: 'bad',
          message: 'bad',
          code: 1,
          details: '',
          metadata: new Metadata(),
        };

        expect(stream.emit('error', exampleError)).toBeTruthy();
      });
    });
  });
});
