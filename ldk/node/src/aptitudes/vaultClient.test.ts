import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/vault_grpc_pb';
import * as Messages from '../grpc/vault_pb';
import { ConnInfo } from '../grpc/broker_pb';
import VaultClient from './vaultClient';
import { Session } from '../grpc/session_pb';
import {
  buildLogger,
  captureMockArgument,
  createCallbackHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
} from '../test.helpers';

jest.mock('../grpc/vault_grpc_pb');

const MockClientClass = mocked(Services.VaultClient);

const logger = buildLogger();

describe('VaultClient', () => {
  let subject: VaultClient;
  let mockGRPCClient: jest.Mocked<Services.VaultClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;

  beforeEach(async () => {
    jest.resetAllMocks();
    subject = new VaultClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.VaultClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    await expect(
      subject.connect(connInfo, session, logger),
    ).resolves.toBeUndefined();
  });
  describe('#delete', () => {
    const vaultKey = 'key';
    beforeEach(async () => {
      mockGRPCClient.vaultDelete.mockImplementation(createCallbackHandler());

      await expect(subject.delete(vaultKey)).resolves.toBe(undefined);
    });
    it('should call grpc client function', async () => {
      expect(mockGRPCClient.vaultDelete).toHaveBeenCalledWith(
        expect.any(Messages.VaultDeleteRequest),
        expect.any(Function),
      );
    });
    it('should have configured the request with the right key', () => {
      const deleteRequest = captureMockArgument<Messages.VaultDeleteRequest>(
        mockGRPCClient.vaultDelete,
      );
      expect(deleteRequest.getKey()).toBe(vaultKey);
    });
  });
  describe('#exists', () => {
    const vaultKey = 'key';
    let mockResponse: Messages.VaultExistsResponse;

    beforeEach(async () => {
      mockResponse = new Messages.VaultExistsResponse().setExists(true);

      mockGRPCClient.vaultExists.mockImplementation(
        createCallbackHandler(mockResponse),
      );
    });
    it('should call grpc client function', async () => {
      await expect(subject.exists(vaultKey)).resolves.toBe(true);
      expect(mockGRPCClient.vaultExists).toHaveBeenCalledWith(
        expect.any(Messages.VaultExistsRequest),
        expect.any(Function),
      );
      const existsRequest = captureMockArgument<Messages.VaultExistsRequest>(
        mockGRPCClient.vaultExists,
      );
      expect(existsRequest.getKey()).toBe(vaultKey);
    });
  });
  describe('#read', () => {
    let mockResponse: Messages.VaultReadResponse;
    const keyValue = 'value';
    const key = 'key';
    beforeEach(async () => {
      mockResponse = new Messages.VaultReadResponse().setValue(keyValue);

      mockGRPCClient.vaultRead.mockImplementation(
        createCallbackHandler(mockResponse),
      );
    });
    it('should call grpc client function', async () => {
      await expect(subject.read(key)).resolves.toEqual(keyValue);
      expect(mockGRPCClient.vaultRead).toHaveBeenCalledWith(
        expect.any(Messages.VaultReadRequest),
        expect.any(Function),
      );
      const readRequest = captureMockArgument<Messages.VaultReadRequest>(
        mockGRPCClient.vaultRead,
      );
      expect(readRequest.getKey()).toBe(key);
    });
  });
  describe('#write', () => {
    const keyValue = 'value';
    const key = 'key';
    beforeEach(async () => {
      mockGRPCClient.vaultWrite.mockImplementation(createCallbackHandler());
      await subject.connect(connInfo, session, logger);
    });
    it('should call grpc client function', async () => {
      await expect(subject.write(key, keyValue)).resolves.toEqual(
        undefined,
      );
      expect(mockGRPCClient.vaultWrite).toHaveBeenCalledWith(
        expect.any(Messages.VaultWriteRequest),
        expect.any(Function),
      );
      const writeRequest = captureMockArgument<Messages.VaultWriteRequest>(
        mockGRPCClient.vaultWrite,
      );
      expect(writeRequest.getKey()).toBe(key);
      expect(writeRequest.getValue()).toBe(keyValue);
    });
  });
});
