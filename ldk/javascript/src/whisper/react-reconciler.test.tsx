/* eslint-disable @typescript-eslint/no-empty-function -- test file */

import * as React from 'react';
import { mocked } from 'ts-jest/utils';
import { render, WhisperInterface } from './react-reconciler';
import { Button, WhisperComponentType } from './types';

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
      return <oh-button onClick={this.props.onMount}>{this.props.label}</oh-button>;
    }
  }

  const ButtonFunctional: React.FunctionComponent<ButtonProps> = (props) => {
    const [state, useState] = React.useState(1);
    React.useEffect(() => {
      props.onMount();
    }, []);

    props.onRender(state);

    return (
      <oh-button
        onClick={() => {
          useState(state + 1);
        }}
      >
        {props.label} + {state}
      </oh-button>
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
          <oh-whisper label="whisper.label" onClose={() => {}}>
            <oh-button onClick={() => {}}>button.label</oh-button>
            <oh-markdown>markdown.body</oh-markdown>
            nakedmarkdown.body
          </oh-whisper>,
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
    });
    it('generates a whisper with a functional component correctly', async () => {
      const deferred = createDeferred();
      const onMount = jest.fn(() => {
        deferred.resolve(true);
      });
      await new Promise((resolve) => {
        render(
          <oh-whisper label="whisper.label" onClose={() => {}}>
            <ButtonFunctional label="button.label" onMount={onMount} onRender={jest.fn()} key="f" />
            <oh-markdown>markdown.body</oh-markdown>
            nakedmarkdown.body
          </oh-whisper>,
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
          <oh-whisper label="whisper.label" onClose={() => {}}>
            <ButtonClass label="button.label" onMount={onMount} onRender={jest.fn()} />
            <oh-markdown>markdown.body</oh-markdown>
            nakedmarkdown.body
          </oh-whisper>,
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
  });
  describe('calling events triggers state updates', () => {
    it('generates a whisper with a functional component correctly', async () => {
      const deferred = createDeferred();
      const onMount = jest.fn(() => {
        deferred.resolve(true);
      });
      const onRender = jest.fn(() => {});
      await new Promise((resolve) => {
        render(
          <oh-whisper label="whisper.label" onClose={() => {}}>
            <ButtonFunctional label="button.label" onMount={onMount} onRender={onRender} key="f" />
            <oh-markdown key="markdown">markdown.body</oh-markdown>
            nakedmarkdown.body
          </oh-whisper>,
          whisperInterface,
          () => resolve(null),
        );
      });
      await deferred.promise;

      const button = mocked(whisperInterface.createOrUpdateWhisper).mock.calls[0][0]
        .components[0] as Button;
      button.onClick(undefined, null as any);

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: 'button.label, + ,2',
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
    });
  });
});
