import { mocked } from 'ts-jest/utils';
import * as GRPC from '@grpc/grpc-js';
import GrpcServer from './loopServer';
import Plugin from './plugin';
import { prepareLogging } from './logging';

const mockedGrpc = mocked(GrpcServer);
const mockedServices = mocked(GRPC.Server);

jest.mock('@grpc/grpc-js');
jest.mock('./loopServer');
jest.mock('./grpc/loop_grpc_pb');
jest.mock('./logging');

beforeEach(() => {
  mockedGrpc.mockClear();
  mockedServices.mockClear();
});

describe('Plugin', () => {
  let plugin: Plugin;
  describe('constructor', () => {
    it('consumes the mocked module', () => {
      plugin = new Plugin({} as any);
      expect(GrpcServer).toHaveBeenCalledTimes(1);
      expect(GRPC.Server).toHaveBeenCalledTimes(1);
      const mockServer = mockedServices.mock.instances[0];
      // Called with BrokerService
      expect(mockServer.addService).toHaveBeenCalledTimes(1);
    });
  });
  describe('#serve', () => {
    it('calls server#start', async () => {
      plugin = new Plugin({} as any);
      const mockServer = mockedServices.mock.instances[0];
      mocked(mockServer.bindAsync).mockImplementation((port, credentials, callback) => {
        callback(null, 123);
      });
      await plugin.serve();
      expect(mockServer.start).toHaveBeenCalledTimes(1);
      expect(prepareLogging).toHaveBeenCalled();
    });
  });
});
