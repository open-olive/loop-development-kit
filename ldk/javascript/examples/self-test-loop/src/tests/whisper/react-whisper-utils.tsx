import * as React from 'react';
import { whisper } from "@oliveai/ldk";
import { renderNewWhisper, WhisperInstance } from "@oliveai/ldk/dist/whisper/react/renderer";

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
      <oh-box direction={whisper.Direction.Horizontal} justifyContent={whisper.JustifyContent.SpaceBetween}>
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

export class WhisperTestWrapper {
  onResolve: (value: boolean | PromiseLike<boolean>) => void;
  onReject: () => void;
  promise: Promise<boolean>;
  testComponent: React.FunctionComponent<TestComponentProps>;
  whisper: WhisperInstance | undefined;

  constructor(testComponent: React.FunctionComponent<TestComponentProps>) {
    this.promise = new Promise((resolve, reject) => {
      this.onResolve = resolve;
      this.onReject = reject;
    });
    this.testComponent = testComponent;
  }

  async create(): Promise<void> {
    const TestComponent = this.testComponent;
    const promise = renderNewWhisper(
      <TestComponent onResolve={this.handleResolve} onReject={this.handleReject} />,
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