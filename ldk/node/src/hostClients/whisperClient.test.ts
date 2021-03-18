import { mocked } from 'ts-jest/utils';
import createMockInstance from 'jest-create-mock-instance';
import * as Services from '../grpc/whisper_grpc_pb';
import { WhisperClient } from './whisperClient';
import { ConnInfo } from '../grpc/broker_pb';
import { Session } from '../grpc/session_pb';
import * as Builders from './whisperMessageBuilder';
import {
  buildLogger,
  createCallbackHandler,
  createWaitHandler,
  defaultConnInfo,
  defaultSession,
} from '../test.helpers';

jest.mock('../grpc/whisper_grpc_pb');
jest.mock('./whisperMessageBuilder');

const WHISPER_ID = '1234-abcd';
const MockClientClass = mocked(Services.WhisperClient);
const messageBuilders = mocked(Builders);
const testLogger = buildLogger();

describe('WhisperHostClient', () => {
  let subject: WhisperClient;
  let mockGRPCClient: jest.Mocked<Services.WhisperClient>;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let newMessageObj: any;

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new WhisperClient();
    connInfo = defaultConnInfo;
    session = defaultSession;

    mockGRPCClient = createMockInstance(Services.WhisperClient);
    mockGRPCClient.waitForReady.mockImplementation(createWaitHandler());
    MockClientClass.mockImplementation(() => mockGRPCClient as any);

    newMessageObj = {
      setSession() {
        return this;
      },
    } as any;
  });
  describe('#markdownWhisper', () => {
    beforeEach(() => {
      // New Message implementation necessary to chain messages.
      messageBuilders.buildWhisperMarkdownRequest.mockReturnValue(
        newMessageObj as any,
      );
    });
    describe('when initialized', () => {
      beforeEach(async () => {
        await expect(
          subject.connect(connInfo, session, testLogger),
        ).resolves.toBeUndefined();

        mockGRPCClient.whisperMarkdown.mockImplementation(
          createCallbackHandler({ getId: () => WHISPER_ID }),
        );

        await subject.markdownWhisper({
          markdown: 'abc',
          label: 'Hey',
        });
      });
      it('should call the client with a whisper message', async () => {
        expect(mockGRPCClient.whisperMarkdown).toHaveBeenCalledWith(
          newMessageObj,
          expect.anything(),
        );
      });
      it('should return the ID from the whisper', async () => {
        await expect(
          subject.markdownWhisper({ markdown: 'a', label: 'a' }).promise(),
        ).resolves.toBe(undefined);
      });
    });
    describe('before connected', () => {
      it('should throw an error', async () => {
        expect(() => {
          subject.markdownWhisper({ markdown: 'a', label: 'a' });
        }).toThrow('Accessing session data before connection');
      });
    });
  });
});
