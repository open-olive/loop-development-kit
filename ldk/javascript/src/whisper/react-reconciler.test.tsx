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
      function createDeferred(): {
        promise: Promise<any>;
        resolve: (value: unknown) => void;
        reject: (value: unknown) => void;
      } {
        let resolve: (value: unknown) => void;
        let reject: (value: unknown) => void;
        const promise = new Promise((resolve1, reject1) => {
          resolve = resolve1;
          reject = reject1;
        });
        return {
          promise,
          resolve: resolve!,
          reject: reject!,
        };
      }
      const deferred = createDeferred();
      const onMount = jest.fn(() => {
        deferred.resolve(true);
      });
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
      await deferred.promise;

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
