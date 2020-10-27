import { mocked } from 'ts-jest/utils';
import * as Services from '../grpc/whisper_grpc_pb';
import * as Messages from '../grpc/whisper_pb';
import WhisperClient from './whisperClient';
import { ConnInfo } from '../grpc/broker_pb';
import { Session } from '../grpc/session_pb';
import * as Builders from './whisperMessageBuilder';

jest.mock('../grpc/whisper_pb');
jest.mock('../grpc/whisper_grpc_pb');
jest.mock('./whisperMessageBuilder');

const WHISPER_ID = '1234-abcd';
const hostClient = mocked(Services.WhisperClient);
const newMessage = mocked(Messages.WhisperMarkdownRequest);
const messageBuilders = mocked(Builders);

type CallbackHandlerFunc<TRequest = any, TResponse = any> = (
  request: TRequest,
  callback: (err: Error | null, response: TResponse) => void,
) => void;

describe('WhisperHostClient', () => {
  let subject: WhisperClient;
  let connInfo: ConnInfo.AsObject;
  let session: Session.AsObject;
  let waitForReadyMock: jest.Mock;
  let emitWhisperMock: jest.Mock;
  let updateWhisperMock: jest.Mock;
  let newMessageObj: any;

  function createCallbackHandler(response?: any): CallbackHandlerFunc {
    return (request, callback) => {
      callback(null, response);
    };
  }

  beforeEach(() => {
    jest.resetAllMocks();
    subject = new WhisperClient();
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
        whisperMarkdown: emitWhisperMock,
        whisperUpdate: updateWhisperMock,
        waitForReady: waitForReadyMock,
      } as any;
    });
    newMessageObj = {
      setSession() {
        return this;
      },
    } as any;
  });
  describe('#connect', () => {
    it('instantiates a new host client and waits for it to be ready', async () => {
      await expect(subject.connect(connInfo, session)).resolves.toBe(undefined);
    });
  });
  describe('#emitWhisper', () => {
    beforeEach(() => {
      // New Message implementation necessary to chain messages.
      messageBuilders.buildWhisperMarkdownRequest.mockReturnValue(
        newMessageObj as any,
      );
    });
    describe('when initialized', () => {
      beforeEach(async () => {
        emitWhisperMock = jest
          .fn()
          .mockImplementation(
            createCallbackHandler({ getId: () => WHISPER_ID }),
          );
        await subject.connect(connInfo, session);
        await subject.markdownWhisper({
          markdown: 'abc',
          icon: 'ok',
          label: 'Hey',
        });
      });
      it('should call the client with a whisper message', async () => {
        expect(emitWhisperMock).toHaveBeenCalledWith(
          newMessageObj,
          expect.anything(),
        );
      });
      it('should return the ID from the whisper', async () => {
        await expect(
          subject.markdownWhisper({ markdown: 'a', label: 'a', icon: 'a' }),
        ).resolves.toBe(undefined);
      });
    });
    describe('before connected', () => {
      it('should throw an error', async () => {
        await expect(
          subject.markdownWhisper({ markdown: 'a', label: 'a', icon: 'a' }),
        ).rejects.toThrow('Accessing session data before connection');
      });
    });
  });
});
