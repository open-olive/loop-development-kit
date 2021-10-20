import { whisper } from '@oliveai/ldk';
import { NetworkWhisper } from '.';

jest.mock('@oliveai/ldk');

const mockWhisperClose = jest.fn();

const TEST_PARAM = [
  {
    recalling_firm: 'recalling_firm 1',
    recall_initiation_date: 'recall_initiation_date 1',
    recall_number: 'recall_number 1',
    product_description: 'product_description 1',
    reason_for_recall: 'reason_for_recall 1',
  },
  {
    recalling_firm: 'recalling_firm 2',
    recall_initiation_date: 'recall_initiation_date 2',
    recall_number: 'recall_number 2',
    product_description: 'product_description 2',
    reason_for_recall: 'reason_for_recall 2',
  },
];

describe('Network Whisper', () => {
  beforeEach(() => {
    whisper.create = jest.fn().mockResolvedValueOnce({ close: mockWhisperClose });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates components as expected with proper onClick logic', () => {
    const newWhisper = new NetworkWhisper(TEST_PARAM);
    const actualComponents = newWhisper.createComponents();

    const expectedComponents = [
      expect.objectContaining({
        type: whisper.WhisperComponentType.Link,
        text: 'recalling_firm 1 (recall_initiation_date 1)',
      }),
      expect.objectContaining({
        type: whisper.WhisperComponentType.Link,
        text: 'recalling_firm 2 (recall_initiation_date 2)',
      }),
    ];

    expect(actualComponents).toEqual(expectedComponents);

    actualComponents[0].onClick();

    const expectedSubWhisper = {
      label: 'Recall for recalling_firm 1',
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: '# Recalling Firm\nrecalling_firm 1\n# Recall Number\nrecall_number 1\n# Product Description\nproduct_description 1\n# Reason for Recall\nreason_for_recall 1',
        },
      ],
    };

    expect(whisper.create).toBeCalledWith(expectedSubWhisper);
  });

  it('creates a whisper and closes it gracefully', async () => {
    const newWhisper = new NetworkWhisper(TEST_PARAM);
    newWhisper.show();
    await Promise.resolve();
    newWhisper.close();

    expect(whisper.create).toBeCalledWith(
      expect.objectContaining({
        label: 'Example for Network Aptitude (FDA Recalls)',
        onClose: NetworkWhisper.onClose,
      })
    );
    expect(mockWhisperClose).toBeCalled();
  });

  it.each`
    scenario              | error
    ${'without an error'} | ${undefined}
    ${'with an error'}    | ${new Error('error')}
  `('should close properly $scenario', ({ error }) => {
    NetworkWhisper.onClose(error);

    if (error) {
      expect(console.error).toBeCalledWith('There was an error closing Network whisper', error);
    }
    expect(console.log).toBeCalledWith('Network whisper closed');
  });
});
