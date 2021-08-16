import * as React from 'react';
import { render, WhisperInterface } from './react-reconciler';
import { WhisperComponentType } from './types';

interface ButtonProps {
  label: string;
  onMount: () => void;
}

describe('whisper-renderer', () => {
  class ButtonClass extends React.Component<ButtonProps> {
    componentDidMount() {
      this.props.onMount();
    }

    render() {
      return <button>{this.props.label}</button>;
    }
  }

  const ButtonFunctional: React.FunctionComponent<ButtonProps> = (props) => {
    React.useEffect(() => {
      console.log("MOUNTING");
      props.onMount();
    }, []);

    return <button>{props.label}</button>;
  };

  describe('writing new whisper', () => {
    let whisperInterface: WhisperInterface;
    beforeEach(() => {
      whisperInterface = {
        createOrUpdateWhisper: jest.fn(),
      };
    });
    it('generates a basic new whisper correctly', async () => {
      await new Promise((resolve) => {
        render(
          <whisper label="whisper.label">
            <button>button.label</button>
            <markdown>markdown.body</markdown>
            nakedmarkdown.body
          </whisper>,
          whisperInterface,
          () => resolve(null),
        );
      });

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: 'button.label',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'markdown.body',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'nakedmarkdown.body',
          },
        ],
      });
    });
    it('generates a whisper with a functional component correctly', async () => {
      const onMount = jest.fn();
      await new Promise((resolve) => {
        render(
          <whisper label="whisper.label">
            <ButtonFunctional label="button.label" onMount={onMount} />
            <markdown>markdown.body</markdown>
            nakedmarkdown.body
          </whisper>,
          whisperInterface,
          () => resolve(null),
        );
      });

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: 'button.label',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'markdown.body',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'nakedmarkdown.body',
          },
        ],
      });
      expect(onMount).toHaveBeenCalled();
    });
    it('generates a whisper with a class component correctly', async () => {
      const onMount = jest.fn();
      await new Promise((resolve) => {
        render(
          <whisper label="whisper.label">
            <ButtonClass label="button.label" onMount={onMount} />
            <markdown>markdown.body</markdown>
            nakedmarkdown.body
          </whisper>,
          whisperInterface,
          () => resolve(null),
        );
      });

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: 'button.label',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'markdown.body',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'nakedmarkdown.body',
          },
        ],
      });
      expect(onMount).toHaveBeenCalled();
    });
  });
});
