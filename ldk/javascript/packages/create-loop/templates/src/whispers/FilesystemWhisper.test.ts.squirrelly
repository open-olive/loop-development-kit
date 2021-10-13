import { whisper } from '@oliveai/ldk';
import { FilesystemWhisper } from '.';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();

const TEST_PARAM = 'test';

describe('Filesystem Whisper', () => {
  beforeEach(() => {
    whisper.create = jest.fn().mockResolvedValueOnce({ close: mockWhisperClose });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates components as expected', () => {
    const newWhisper = new FilesystemWhisper(TEST_PARAM);
    const actual = newWhisper.createComponents();

    const expected = [
      expect.objectContaining({
        type: whisper.WhisperComponentType.Markdown,
        body: `# Example File Contents\n${TEST_PARAM}`,
      }),
    ];

    expect(actual).toEqual(expected);
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = new FilesystemWhisper(TEST_PARAM);
    newWhisper.show();
    await Promise.resolve();
    newWhisper.close();

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        label: 'Example Filesystem Aptitude Whisper',
        onClose: FilesystemWhisper.onClose,
      })
    );
    expect(mockWhisperClose).toBeCalled();
  });

  it.each`
    scenario              | error
    ${'without an error'} | ${undefined}
    ${'with an error'}    | ${new Error('error')}
  `('should close properly $scenario', ({ error }) => {
    FilesystemWhisper.onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith('There was an error closing Filesystem whisper', error);
    }
    expect(console.log).toBeCalledWith('Filesystem whisper closed');
  });
});
