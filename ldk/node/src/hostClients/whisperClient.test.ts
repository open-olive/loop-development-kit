import { mocked } from 'ts-jest/utils';
import Services from '../grpc/whisper_grpc_pb';
import Messages from '../grpc/whisper_pb';
import WhisperClient from './whisperClient';
import { ConnInfo } from '../grpc/broker_pb';

jest.mock('../grpc/whisper_pb');
jest.mock('../grpc/whisper_grpc_pb');

const WHISPER_ID = '1234-abcd';
const hostClient = mocked(Services.WhisperClient);
const newMessage = mocked(Messages.WhisperNewRequest);

type CallbackHandlerFunc<TRequest = any, TResponse = any> = (
  request: TRequest,
  callback: (err: Error | null, response: TResponse) => void,
) => void;

describe('WhisperHostClient', () => {
  let subject: WhisperClient;
  let connInfo: ConnInfo.AsObject;
  let waitForReadyMock: jest.Mock;
  let emitWhisperMock: jest.Mock;
  let updateWhisperMock: jest.Mock;

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
    waitForReadyMock = jest.fn().mockImplementation(createCallbackHandler());
    hostClient.mockImplementation(() => {
      return {
        whisperNew: emitWhisperMock,
        whisperUpdate: updateWhisperMock,
        waitForReady: waitForReadyMock,
      } as any;
    });
  });
  describe('#connect', () => {
    it('instantiates a new host client and waits for it to be ready', async () => {
      await expect(subject.connect(connInfo)).resolves.toBe(undefined);
    });
  });
  describe('#emitWhisper', () => {
    let newMessageObj: any;
    describe('when initialized', () => {
      beforeEach(async () => {
        newMessageObj = {
          setWhisper() {
            return this;
          },
        } as any;
        // New Message implementation necessary to chain messages.
        newMessage.mockImplementation(() => {
          return newMessageObj;
        });
        emitWhisperMock = jest
          .fn()
          .mockImplementation(
            createCallbackHandler({ getId: () => WHISPER_ID }),
          );
        await subject.connect(connInfo);
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
      it('should set the style to default', () => {
        const style = mocked(Messages.WhisperStyle).mock.instances[0];
        expect(style.setBackgroundcolor).toHaveBeenCalledWith('#fff');
        expect(style.setPrimarycolor).toHaveBeenCalledWith('#666');
        expect(style.setHighlightcolor).toHaveBeenCalledWith('#651fff');
      });
      it('should create the whisper properly', () => {
        const whisper = mocked(Messages.WhisperMsg).mock.instances[0];
        expect(whisper.setMarkdown).toHaveBeenCalledWith('abc');
        expect(whisper.setLabel).toHaveBeenCalledWith('Hey');
        expect(whisper.setIcon).toHaveBeenCalledWith('ok');
      });
      it('should return the ID from the whisper', async () => {
        await expect(
          subject.markdownWhisper({ markdown: 'a', label: 'a', icon: 'a' }),
        ).resolves.toBe(WHISPER_ID);
      });
    });
    describe('before connected', () => {
      it('should throw an error', async () => {
        await expect(
          subject.markdownWhisper({ markdown: 'a', label: 'a', icon: 'a' }),
        ).rejects.toThrow('Accessing client before connected');
      });
    });
  });
  describe('#updatetWhisper', () => {
    describe('when initialized', () => {
      beforeEach(async () => {
        updateWhisperMock = jest
          .fn()
          .mockImplementation(createCallbackHandler());
        await subject.connect(connInfo);
        await subject.updateWhisper(WHISPER_ID, {
          markdown: 'abc',
          icon: 'ok',
          label: 'Hey',
        });
      });
      it('should call the client with a whisper message', async () => {
        const whisperRequest = mocked(Messages.WhisperUpdateRequest).mock
          .instances[0];
        expect(updateWhisperMock).toHaveBeenCalledWith(
          whisperRequest,
          expect.anything(),
        );
      });
      it('should set the style to default', () => {
        const style = mocked(Messages.WhisperStyle).mock.instances[0];
        expect(style.setBackgroundcolor).toHaveBeenCalledWith('#fff');
        expect(style.setPrimarycolor).toHaveBeenCalledWith('#666');
        expect(style.setHighlightcolor).toHaveBeenCalledWith('#651fff');
      });
      it('should create the whisper properly', () => {
        const whisper = mocked(Messages.WhisperMsg).mock.instances[0];
        expect(whisper.setMarkdown).toHaveBeenCalledWith('abc');
        expect(whisper.setLabel).toHaveBeenCalledWith('Hey');
        expect(whisper.setIcon).toHaveBeenCalledWith('ok');
      });
      it('should resolve successfully', async () => {
        await expect(
          subject.updateWhisper(WHISPER_ID, {
            markdown: 'a',
            label: 'a',
            icon: 'a',
          }),
        ).resolves;
      });
    });
    describe('before connected', () => {
      it('should throw an error', async () => {
        await expect(
          subject.updateWhisper(WHISPER_ID, {
            markdown: 'a',
            label: 'a',
            icon: 'a',
          }),
        ).rejects.toThrow('Accessing client before connected');
      });
    });
  });
});
