import { ui } from '@oliveai/ldk';
import { UiWhisper } from '../../whispers';
import searchListener, { handler } from './searchListener';

jest.mock('@oliveai/ldk');

const mockUiShow = jest.fn();
jest.mock('../../whispers', () => {
  return {
    UiWhisper: jest.fn().mockImplementation(() => {
      return { show: mockUiShow };
    }),
  };
});

describe('UI Search Listener', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start the ui listener', () => {
    searchListener.listen();

    expect(ui.listenGlobalSearch).toBeCalledWith(handler);
    expect(ui.listenSearchbar).toBeCalledWith(handler);
  });

  it('should create the whisper when handler is triggered', () => {
    handler('test');

    expect(UiWhisper).toBeCalledWith('test');
    expect(mockUiShow).toBeCalled();
  });
});
