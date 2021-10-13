import { clipboard } from '@oliveai/ldk';
import { ClipboardWhisper } from '../../whispers';
import clipboardListener, { handler } from './clipboardListener';

jest.mock('@oliveai/ldk');

const mockClipboardShow = jest.fn();
jest.mock('../../whispers', () => {
  return {
    ClipboardWhisper: jest.fn().mockImplementation(() => {
      return { show: mockClipboardShow };
    }),
  };
});

describe('Clipboard Listener', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start the clipboard listener', () => {
    clipboardListener.listen();

    expect(clipboard.listen).toBeCalledWith(false, handler);
  });

  it('should create the whisper when handler is triggered', () => {
    handler('test');

    expect(ClipboardWhisper).toBeCalledWith('test');
    expect(mockClipboardShow).toBeCalled();
  });
});
