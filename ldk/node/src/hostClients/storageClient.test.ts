import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/storage_grpc_pb';
import * as Messages from '../grpc/storage_pb';
import { ConnInfo } from '../grpc/broker_pb';
import StorageClient from './storageClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';

jest.mock('../grpc/storage_pb');
jest.mock('../grpc/storage_grpc_pb');

const hostClient = mocked(Services.StorageClient);

const logger = new Logger('test-logger');

type CallbackHandlerFunc<TRequest = any, TResponse = any> = (
  request: TRequest,
  callback: (err: Error | null, response: TResponse) => void,
) => void;

describe('StorageHostClient', () => {
  let subject: StorageClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let storageDeleteMock: jest.Mock;
  let storageDeleteAllMock: jest.Mock;
  let storageExistsMock: jest.Mock;
  let storageKeysMock: jest.Mock;
  let storageReadMock: jest.Mock;
  let storageReadAllMock: jest.Mock;
  let storageWriteMock: jest.Mock;

  function createCallbackHandler(response?: any): CallbackHandlerFunc {
    return (request, callback) => {
      callback(null, response);
    };
  }
  beforeEach(() => {
    jest.resetAllMocks();
    subject = new StorageClient();
    connInfo = {
      address: 'a',
      serviceId: 1,
      network: 'n',
    };
    session = {
      loopid: 'LOOP_ID',
      token: 'TOKEN',
    };
    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    hostClient.mockImplementation(() => {
      return {
        waitForReady: waitForReadyMock,
        storageDelete: storageDeleteMock,
        storageDeleteAll: storageDeleteAllMock,
        storageExists: storageExistsMock,
        storageKeys: storageKeysMock,
        storageRead: storageReadMock,
        storageReadAll: storageReadAllMock,
        storageWrite: storageWriteMock,
      } as any;
    });
  });
  describe('#connect', () => {
    it('instantiates a new host client and waits for it to be ready', async () => {
      await expect(subject.connect(connInfo, session, logger)).resolves.toBe(
        undefined,
      );
    });
  });
  describe('#storageDelete', () => {
    const storageKey = 'key';
    beforeEach(async () => {
      storageDeleteMock = jest.fn().mockImplementation(createCallbackHandler());
      await subject.connect(connInfo, session, logger);
      await expect(subject.storageDelete(storageKey)).resolves.toBe(undefined);
    });
    it('should call client.storageDelete and resolve successfully', async () => {
      expect(storageDeleteMock).toHaveBeenCalledWith(
        expect.any(Messages.StorageDeleteRequest),
        expect.any(Function),
      );
    });
    it('should have configured the request with the right key', () => {
      expect(
        mocked(Messages.StorageDeleteRequest).mock.instances[0].setKey,
      ).toHaveBeenCalledWith(storageKey);
    });
  });
  describe('#storageExists', () => {
    const storageKey = 'key';
    let mockResponse: Messages.StorageExistsResponse;
    beforeEach(async () => {
      mockResponse = new Messages.StorageExistsResponse();
      mocked(mockResponse.getExists).mockReturnValue(true);
      storageExistsMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(mockResponse));
      await subject.connect(connInfo, session, logger);
    });
    it('should call client.storageDelete and resolve successfully', async () => {
      await expect(subject.storageExists(storageKey)).resolves.toBe(true);
      expect(storageExistsMock).toHaveBeenCalledWith(
        expect.any(Messages.StorageExistsRequest),
        expect.any(Function),
      );
      expect(
        mocked(Messages.StorageExistsRequest).mock.instances[0].setKey,
      ).toHaveBeenCalledWith(storageKey);
    });
  });
  describe('#storageRead', () => {
    let mockResponse: Messages.StorageReadResponse;
    const keyValue = 'value';
    const key = 'key';
    beforeEach(async () => {
      mockResponse = new Messages.StorageReadResponse();
      mocked(mockResponse.getValue).mockReturnValue(keyValue);
      storageReadMock = jest
        .fn()
        .mockImplementation(createCallbackHandler(mockResponse));
      await subject.connect(connInfo, session, logger);
    });
    it('should call client.storageRead and resolve successfully', async () => {
      await expect(subject.storageRead(key)).resolves.toEqual(keyValue);
      expect(storageReadMock).toHaveBeenCalledWith(
        expect.any(Messages.StorageReadRequest),
        expect.any(Function),
      );
      expect(
        mocked(Messages.StorageReadRequest).mock.instances[0].setKey,
      ).toHaveBeenCalledWith(key);
    });
  });
  describe('#storageWrite', () => {
    const keyValue = 'value';
    const key = 'key';
    beforeEach(async () => {
      storageWriteMock = jest.fn().mockImplementation(createCallbackHandler());
      await subject.connect(connInfo, session, logger);
    });
    it('should call client.storageWrite and resolve successfully', async () => {
      await expect(subject.storageWrite(key, keyValue)).resolves.toEqual(
        undefined,
      );
      expect(storageWriteMock).toHaveBeenCalledWith(
        expect.any(Messages.StorageWriteRequest),
        expect.any(Function),
      );
      const writeRequest = mocked(Messages.StorageWriteRequest).mock
        .instances[0];
      expect(writeRequest.setKey).toHaveBeenCalledWith(key);
      expect(writeRequest.setValue).toHaveBeenCalledWith(keyValue);
    });
  });
});
