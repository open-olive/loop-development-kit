import { Metadata } from '@grpc/grpc-js';
import BaseClient from './baseClient';
import {
  FakeGRPCClient,
  FakeHostServer,
  FakeResponseMessage,
  FakeRequestMessage,
  createCallbackHandler,
  defaultConnInfo,
  defaultSession,
  buildLogger,
} from '../test.helpers';

const logger = buildLogger();

describe('BaseClient', () => {
  let subject: BaseClient<FakeGRPCClient>;
  const exampleError = {
    name: 'bad',
    message: 'bad',
    code: 2, // Error code 1 is what stop is, which is an "expected" error
    details: '',
    metadata: new Metadata(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    subject = new FakeHostServer();
    await subject.connect(defaultConnInfo, defaultSession, logger);
  });

  describe('#buildStoppableMessage', () => {
    test('on success it resolves the data', async () => {
      const confirmation = 'good';

      const query = subject
        .buildStoppableMessage<FakeRequestMessage, FakeResponseMessage, string>(
          createCallbackHandler(new FakeResponseMessage(confirmation)),
          () => new FakeRequestMessage(),
          (response) => response.getMessage(),
        )
        .promise();

      await expect(query).resolves.toBe(confirmation);
    });

    test('on failure it rejects the data', async () => {
      const query = subject
        .buildStoppableMessage<FakeRequestMessage, FakeResponseMessage, string>(
          createCallbackHandler(new FakeResponseMessage('good'), exampleError),
          () => new FakeRequestMessage(),
          (response) => response.getMessage(),
        )
        .promise();

      await expect(query).rejects.toBe(exampleError);
    });
  });
  describe('#buildQuery', () => {
    test('on success it resolves the data', async () => {
      const confirmation = 'good';

      const query = subject.buildQuery<FakeRequestMessage, FakeResponseMessage, string>(
        createCallbackHandler(new FakeResponseMessage(confirmation)),
        () => new FakeRequestMessage(),
        (response) => response.getMessage(),
      );

      await expect(query).resolves.toBe(confirmation);
    });

    test('on failure it rejects the data', async () => {
      const query = subject.buildQuery<FakeRequestMessage, FakeResponseMessage, string>(
        createCallbackHandler(new FakeResponseMessage('good'), exampleError),
        () => new FakeRequestMessage(),
        (response) => response.getMessage(),
      );

      await expect(query).rejects.toBe(exampleError);
    });
  });
});
