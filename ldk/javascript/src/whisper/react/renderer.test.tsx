/* eslint-disable @typescript-eslint/no-empty-function -- test file */
/* eslint-disable max-classes-per-file -- again, test file */

import * as React from 'react';
import { mocked } from 'ts-jest/utils';
import { render, renderNewWhisper } from './renderer';
import { Button, Direction, JustifyContent, NewWhisper, WhisperComponentType } from '../types';
import { WhisperRenderingInterface } from './whisper-render-instance';

interface ButtonProps {
  label: string;
  onMount: () => void;
  onUnmount?: () => void;
  onRender?: (n: number) => void;
}

describe('renderer', () => {
  class ButtonClass extends React.Component<ButtonProps> {
    componentDidMount() {
      this.props.onMount();
    }

    componentWillUnmount() {
      this.props.onUnmount?.();
    }

    render() {
      return <oh-button onClick={this.props.onMount} label={this.props.label} />;
    }
  }

  const ButtonFunctional: React.FunctionComponent<ButtonProps> = (props) => {
    const [state, useState] = React.useState(1);
    React.useEffect(() => {
      props.onMount();
    }, []);

    props.onRender?.(state);

    return (
      <oh-button
        onClick={() => {
          useState(state + 1);
        }}
        label={`${props.label} + ${state}`}
      />
    );
  };
  let whisperInterface: WhisperRenderingInterface;
  beforeEach(() => {
    whisperInterface = {
      createOrUpdateWhisper: jest.fn(),
      closeWhisper: jest.fn(),
      setOnClose: jest.fn(),
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
      await render(
        <oh-whisper label="whisper.label" onClose={() => {}}>
          <oh-button onClick={() => {}} label={'button.label'} />
          <oh-markdown body={'markdown.body'} />
          nakedmarkdown.body
        </oh-whisper>,
        whisperInterface,
      );

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
      } as NewWhisper);
    });
    it("generates a whisper with a box component's children correctly", async () => {
      await render(
        <oh-whisper label="whisper.label" onClose={() => {}}>
          <oh-box key="f" direction={Direction.Horizontal} justifyContent={JustifyContent.Left}>
            <oh-checkbox onChange={jest.fn()} label={'DID JA'} />
            Bob
          </oh-box>
          <oh-markdown body={'markdown.body'} />
          nakedmarkdown.body
        </oh-whisper>,
        whisperInterface,
      );

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Box,
            direction: Direction.Horizontal,
            justifyContent: JustifyContent.Left,
            key: 'f',
            children: [
              {
                type: WhisperComponentType.Checkbox,
                onChange: expect.any(Function),
                label: 'DID JA',
              },
              {
                type: WhisperComponentType.Markdown,
                body: 'Bob',
              },
            ],
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
      } as NewWhisper);
    });
    it('generates a whisper with a functional component correctly', async () => {
      const deferred = createDeferred();
      const onMount = jest.fn(() => {
        deferred.resolve(true);
      });
      await render(
        <oh-whisper label="whisper.label" onClose={() => {}}>
          <ButtonFunctional label="button.label" onMount={onMount} onRender={jest.fn()} key="f" />
          <oh-markdown body={'markdown.body'} />
          nakedmarkdown.body
        </oh-whisper>,
        whisperInterface,
      );
      await deferred.promise;

      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: 'button.label + 1',
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
      await render(
        <oh-whisper label="whisper.label" onClose={() => {}}>
          <ButtonClass label="button.label" onMount={onMount} onRender={jest.fn()} />
          <oh-markdown body={'markdown.body'} />
          nakedmarkdown.body
        </oh-whisper>,
        whisperInterface,
      );

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
      await render(
        <oh-whisper label="whisper.label" onClose={() => {}}>
          <ButtonFunctional label="button.label" onMount={onMount} onRender={onRender} key="f" />
          <oh-markdown key="markdown" body="markdown.body" />
          nakedmarkdown.body
        </oh-whisper>,
        whisperInterface,
      );
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
            label: 'button.label + 2',
            onClick: expect.any(Function),
          },
          {
            type: WhisperComponentType.Markdown,
            key: 'markdown',
            body: 'markdown.body',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'nakedmarkdown.body',
          },
        ],
      });
    });
    it("should throw an error if the top-level object isn't oh-whisper", () =>
      expect(async () =>
        render(<oh-markdown body="markdown.body" />, whisperInterface),
      ).rejects.toThrowError('oh-whisper must be top-level element'));
  });
  describe('context and default props works', () => {
    const TestContext = React.createContext('1');
    class ButtonWithContext extends React.Component<{ number: number }> {
      static contextType = TestContext;

      static defaultProps = {
        number: 5,
      };

      render() {
        return <oh-button label={`${this.context} ${this.props.number}`} onClick={() => {}} />;
      }
    }

    it('should pass data in context down and apply defaultProps as normal', async () => {
      await render(
        <oh-whisper label="whisper.label" onClose={() => {}}>
          <TestContext.Provider value={'2'}>
            <ButtonWithContext />
          </TestContext.Provider>
        </oh-whisper>,
        whisperInterface,
      );
      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        label: 'whisper.label',
        onClose: expect.any(Function),
        components: [
          {
            type: WhisperComponentType.Button,
            label: '2 5',
            onClick: expect.any(Function),
          },
        ],
      });
    });
  });
  describe('closing whispers', () => {
    it('returned object should call closeWhisper when programmatically closed', async () => {
      const onClose = jest.fn();
      const whisper = await render(
        <oh-whisper label="whisper.label" onClose={onClose}>
          markdown.body
        </oh-whisper>,
        whisperInterface,
      );
      await whisper.close();
      expect(whisperInterface.closeWhisper).toHaveBeenCalled();
    });
    it('when the whisper onClose prop is called it unmounts all the components', async () => {
      const onClose = jest.fn();
      const onMount = jest.fn();
      const onUnmount = jest.fn();
      await render(
        <oh-whisper label="whisper.label" onClose={onClose}>
          <ButtonClass label="button.label" onMount={onMount} onUnmount={onUnmount} />
        </oh-whisper>,
        whisperInterface,
      );
      const closeHandler = mocked(whisperInterface.setOnClose).mock.calls[0][0];
      await closeHandler();
      expect(whisperInterface.createOrUpdateWhisper).toHaveBeenCalledWith({
        components: [],
        label: '',
        onClose: expect.any(Function),
      });
      expect(onUnmount).toHaveBeenCalled();
    });
  });
});
