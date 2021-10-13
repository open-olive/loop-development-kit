import { whisper } from '@oliveai/ldk';
import { KeyboardWhisper } from '.';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();

const TEST_PARAM = 'test';

describe('Keyboard Whisper', () => {
  beforeEach(() => {
    whisper.create = jest.fn().mockResolvedValueOnce({ close: mockWhisperClose });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates components as expected', () => {
    const newWhisper = new KeyboardWhisper(TEST_PARAM);
    const actual = newWhisper.createComponents();

    const expected = [
      expect.objectContaining({
        type: whisper.WhisperComponentType.Message,
        body: TEST_PARAM,
      }),
    ];

    expect(actual).toEqual(expected);
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = new KeyboardWhisper(TEST_PARAM);
    newWhisper.show();
    await Promise.resolve();
    newWhisper.close();

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        components: newWhisper.createComponents(),
        label: 'Keyboard Aptitude Fired',
        onClose: KeyboardWhisper.onClose,
      })
    );
    expect(mockWhisperClose).toBeCalled();
  });

  it.each`
    scenario              | error
    ${'without an error'} | ${undefined}
    ${'with an error'}    | ${new Error('error')}
  `('should close properly $scenario', ({ error }) => {
    KeyboardWhisper.onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith('There was an error closing Keyboard whisper', error);
    }
    expect(console.log).toBeCalledWith('Keyboard whisper closed');
  });
});
