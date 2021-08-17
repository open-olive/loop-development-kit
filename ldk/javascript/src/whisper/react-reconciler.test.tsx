import * as React from 'react';
import { mocked } from "ts-jest";
import { render, WhisperInterface } from './react-reconciler';
import { Button, WhisperComponentType } from "./types";
import mock = jest.mock;

interface ButtonProps {
  label: string;
  onMount: () => void;
  onRender: (n: number) => void;
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
    const [state, useState] = React.useState(1);
    React.useEffect(() => {
      props.onMount();
    }, []);

    props.onRender(state);

    return (
      <button
        onClick={() => {
          useState(state + 1);
        }}
      >
        {props.label} + {state}
      </button>
    );
  };
  let whisperInterface: WhisperInterface;
  beforeEach(() => {
    whisperInterface = {
      createOrUpdateWhisper: jest.fn(),
    };
  });

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

  describe('writing new whisper', () => {
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
      const deferred = createDeferred();
      const onMount = jest.fn(() => {
        deferred.resolve(true);
      });
      await new Promise((resolve) => {
        render(
          <whisper label="whisper.label">
            <ButtonFunctional label="button.label" onMount={onMount} onRender={jest.fn()}/>
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
            // TODO: Improve button rendering
            label: 'button.label, + ,1',
            onClick: expect.any(Function),
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
            <ButtonClass label="button.label" onMount={onMount} onRender={jest.fn()}/>
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
  describe('calling events triggers state updates', () => {
    it('generates a whisper with a functional component correctly', async () => {
      const deferred = createDeferred();
      const onMount = jest.fn(() => {
        deferred.resolve(true);
      });
      const onRender = jest.fn((arg) => {
        console.log("RENDERING WITH", arg);
      });
      await new Promise((resolve) => {
        render(
          <whisper label="whisper.label">
            <ButtonFunctional label="button.label" onMount={onMount} onRender={onRender}/>
            <markdown>markdown.body</markdown>
            nakedmarkdown.body
          </whisper>,
          whisperInterface,
          () => resolve(null),
        );
      });
      await deferred.promise;

      const button = mocked(whisperInterface.createOrUpdateWhisper).mock.calls[0][0].components[0] as Button;
      button.onClick(undefined, null as any);

    });
  });
});
