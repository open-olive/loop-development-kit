import * as React from 'react';
import { whisper } from '@oliveai/ldk';
import { renderNewWhisper, WhisperInstance } from '@oliveai/ldk/dist/whisper/react/renderer';

interface ConfirmOrDenyProps {
  onResolve: (value: boolean) => void;
  onReject: (reason?: Error) => void;
  prompt: string;
  rejectReason?: string;
}

export const ConfirmOrDeny: React.FunctionComponent<ConfirmOrDenyProps> = (props) => {
  const onResolve = () => {
    props.onResolve(true);
  };
  const onReject = () => {
    props.onReject();
  };
  return (
    <>
      <oh-message body={props.prompt} />
      <oh-box
        direction={whisper.Direction.Horizontal}
        justifyContent={whisper.JustifyContent.SpaceBetween}
      >
        <oh-button onClick={onResolve} label="Yes" />
        <oh-button onClick={onReject} label="No" />
      </oh-box>
    </>
  );
};

export interface TestComponentProps {
  onResolve: (value: boolean | PromiseLike<boolean>) => void;
  onReject: () => void;
}

interface TestWhisperProps {
  label: string;
}

interface TestWhisperState {
  error: Error | undefined;
}

function withWrapper(WrappedComponent: React.JSXElementConstructor<TestComponentProps>) {
  return class WithWrapper extends React.Component<
    TestComponentProps & TestWhisperProps,
    TestWhisperState
  > {
    constructor(props: TestComponentProps & TestWhisperProps) {
      super(props);
      this.state = { error: undefined };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      this.setState({
        error,
      });
      console.error('componentDidCatch', error.message);
      this.props.onReject();
    }

    render() {
      const { onResolve, onReject, label } = this.props;
      return (
        <oh-whisper label={label} onClose={() => {}}>
          <WrappedComponent onResolve={onResolve} onReject={onReject} />
        </oh-whisper>
      );
    }
  };
}

export class WhisperTestWrapper {
  onResolve: (value: boolean | PromiseLike<boolean>) => void;
  onReject: () => void;
  promise: Promise<boolean>;
  label: string;
  testComponent: React.FunctionComponent<TestComponentProps>;
  whisper: WhisperInstance | undefined;

  static async createPromise(
    testComponent: React.FunctionComponent<TestComponentProps>,
    label: string,
  ): Promise<boolean> {
    const wrapper = new WhisperTestWrapper(testComponent, label);
    await wrapper.create();
    return wrapper.promise;
  }

  constructor(testComponent: React.FunctionComponent<TestComponentProps>, label: string) {
    this.promise = new Promise((resolve, reject) => {
      this.onResolve = resolve;
      this.onReject = reject;
    });
    this.testComponent = testComponent;
    this.label = label;
  }

  async create(): Promise<void> {
    const TestComponent = withWrapper(this.testComponent);
    const promise = renderNewWhisper(
      <TestComponent
        onResolve={this.handleResolve}
        onReject={this.handleReject}
        label={this.label}
      />,
    );
    promise.catch(() => {
      console.error('Failed to render whisper');
      this.onReject();
    });
    this.whisper = await promise;
  }

  handleResolve = (value: boolean | PromiseLike<boolean>) => {
    this.onResolve(true);
    this.whisper.close();
  };

  handleReject = () => {
    this.onReject();
    this.whisper.close();
  };
}
