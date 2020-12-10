import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/storage_grpc_pb';
import * as Messages from '../grpc/storage_pb';
import { ConnInfo } from '../grpc/broker_pb';
import StorageClient from './storageClient';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
import {
  captureMockArgument,
  createCallbackHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
} from '../jest.helpers';

jest.mock('../grpc/storage_grpc_pb');

const MockClientClass = mocked(Services.StorageClient);

const logger = new Logger('test-logger');

describe('StorageHostClient', () => {
  let subject: StorageClient;
  let mockGRPCClient: jest.Mocked<Services.StorageClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new StorageClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.StorageClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });
  describe('#storageDelete', () => {
    const storageKey = 'key';
    beforeEach(async () => {
      mockGRPCClient.storageDelete.mockImplementation(createCallbackHandler());

      await expect(subject.storageDelete(storageKey)).resolves.toBe(undefined);
    });
    it('should call grpc client function', async () => {
      expect(mockGRPCClient.storageDelete).toHaveBeenCalledWith(
        expect.any(Messages.StorageDeleteRequest),
        expect.any(Function),
      );
    });
    it('should have configured the request with the right key', () => {
      const deleteRequest = captureMockArgument<Messages.StorageDeleteRequest>(
        mockGRPCClient.storageDelete,
      );
      expect(deleteRequest.getKey()).toBe(storageKey);
    });
  });
  describe('#storageExists', () => {
    const storageKey = 'key';
    let mockResponse: Messages.StorageExistsResponse;

    beforeEach(async () => {
      mockResponse = new Messages.StorageExistsResponse().setExists(true);

      mockGRPCClient.storageExists.mockImplementation(
        createCallbackHandler(mockResponse),
      );
    });
    it('should call grpc client function', async () => {
      await expect(subject.storageExists(storageKey)).resolves.toBe(true);
      expect(mockGRPCClient.storageExists).toHaveBeenCalledWith(
        expect.any(Messages.StorageExistsRequest),
        expect.any(Function),
      );
      const existsRequest = captureMockArgument<Messages.StorageExistsRequest>(
        mockGRPCClient.storageExists,
      );
      expect(existsRequest.getKey()).toBe(storageKey);
    });
  });
  describe('#storageRead', () => {
    let mockResponse: Messages.StorageReadResponse;
    const keyValue = 'value';
    const key = 'key';
    beforeEach(async () => {
      mockResponse = new Messages.StorageReadResponse().setValue(keyValue);

      mockGRPCClient.storageRead.mockImplementation(
        createCallbackHandler(mockResponse),
      );
    });
    it('should call grpc client function', async () => {
      await expect(subject.storageRead(key)).resolves.toEqual(keyValue);
      expect(mockGRPCClient.storageRead).toHaveBeenCalledWith(
        expect.any(Messages.StorageReadRequest),
        expect.any(Function),
      );
      const readRequest = captureMockArgument<Messages.StorageReadRequest>(
        mockGRPCClient.storageRead,
      );
      expect(readRequest.getKey()).toBe(key);
    });
  });
  describe('#storageWrite', () => {
    const keyValue = 'value';
    const key = 'key';
    beforeEach(async () => {
      mockGRPCClient.storageWrite.mockImplementation(createCallbackHandler());
      await subject.connect(connInfo, session, logger);
    });
    it('should call grpc client function', async () => {
      await expect(subject.storageWrite(key, keyValue)).resolves.toEqual(
        undefined,
      );
      expect(mockGRPCClient.storageWrite).toHaveBeenCalledWith(
        expect.any(Messages.StorageWriteRequest),
        expect.any(Function),
      );
      const writeRequest = captureMockArgument<Messages.StorageWriteRequest>(
        mockGRPCClient.storageWrite,
      );
      expect(writeRequest.getKey()).toBe(key);
      expect(writeRequest.getValue()).toBe(keyValue);
    });
  });
});
