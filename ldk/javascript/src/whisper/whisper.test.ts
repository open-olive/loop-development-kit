import * as whisper from '.';

describe('Whisper', () => {
  beforeEach(() => {
    oliveHelps.whisper = {
      create: jest.fn(),
    };
  });

  describe('create', () => {
    it('creates a whisper', async () => {
      const newWhisper: whisper.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
        ],
        label: 'Test',
        onClose: jest.fn(),
      };

      whisper.create(newWhisper);
      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(newWhisper, expect.any(Function));
    });

    it('creates a form component with submit button', () => {
      const expectedLabel = 'Test';
      const expectedCloseFunction = jest.fn();

      const formWhisper: whisper.NewWhisper = {
        components: [
          {
            children: [
              {
                body: 'Test',
                id: '1',
                type: whisper.WhisperComponentType.Markdown,
              },
            ],
            onSubmit: jest.fn(),
            type: whisper.WhisperComponentType.Form
          },
        ],
        label: expectedLabel,
        onClose: expectedCloseFunction,
      };

      const expectedWhisper: whisper.NewWhisper = {
        components: [
          {
            body: 'Test',
            id: '1',
            type: whisper.WhisperComponentType.Markdown,
          },
          {
            label: 'Submit',
            onClick: expect.any(Function),
            type: whisper.WhisperComponentType.Button
          }
        ],
        label: expectedLabel,
        onClose: expectedCloseFunction,
      }

      whisper.create(formWhisper);

      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(expectedWhisper, expect.any(Function));
    });

    it('creates multiple form components with submit buttons', () => {
      const expectedOnChange = jest.fn();
      const expectedLabel = 'Test';
      const expectedCloseFunction = jest.fn();

      const expectedOnChangeTwo = jest.fn();

      const twoFormWhisper: whisper.NewWhisper = {
        components: [
          {
            children: [
              {
                label: 'TestEmailInput',
                onChange: expectedOnChange,
                type: whisper.WhisperComponentType.Email,
              },
            ],
            onSubmit: jest.fn(),
            type: whisper.WhisperComponentType.Form
          },
          {
            children: [
              {
                label: 'TestTelephoneInput',
                onChange: expectedOnChangeTwo,
                type: whisper.WhisperComponentType.Telephone,
              },
            ],
            onSubmit: jest.fn(),
            type: whisper.WhisperComponentType.Form
          },
        ],
        label: expectedLabel,
        onClose: expectedCloseFunction,
      };

      const expectedWhisper: whisper.NewWhisper = {
        components: [
          {
            label: 'TestEmailInput',
            onChange: expectedOnChange,
            type: whisper.WhisperComponentType.Email,
          },
          {
            label: 'Submit',
            onClick: expect.any(Function),
            type: whisper.WhisperComponentType.Button
          },
          {
            label: 'TestTelephoneInput',
            onChange: expectedOnChangeTwo,
            type: whisper.WhisperComponentType.Telephone,
          },
          {
            label: 'Submit',
            onClick: expect.any(Function),
            type: whisper.WhisperComponentType.Button
          },
        ],
        label: expectedLabel,
        onClose: expectedCloseFunction,
      }

      whisper.create(twoFormWhisper);

      expect(oliveHelps.whisper.create).toHaveBeenCalledWith(expectedWhisper, expect.any(Function));
    });
  });
});
