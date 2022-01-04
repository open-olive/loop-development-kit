import { ReactNode } from 'react';
import * as Reconciler from 'react-reconciler';
import { Instance } from './renderer-config';
import { Markdown } from '../types';
import { WhisperRenderingInterface } from './whisper-render-instance';

export interface WhisperInstance {
  update(node: ReactNode): Promise<void>;

  close(): void;
}

export type ReconcilerInstance = Reconciler.Reconciler<
  WhisperRenderingInterface,
  Instance,
  Markdown,
  unknown,
  Instance
>;

/**
 * @internal
 * The WhisperInstanceWrapper class manages changes to the Whisper lifecycle.
 */
export class WhisperInstanceWrapper implements WhisperInstance {
  private container: Reconciler.OpaqueRoot;

  private renderInstance: WhisperRenderingInterface;

  private reconciler: ReconcilerInstance;

  constructor(
    container: Reconciler.OpaqueRoot,
    renderInstance: WhisperRenderingInterface,
    reconciler: ReconcilerInstance,
  ) {
    this.container = container;
    this.renderInstance = renderInstance;
    this.reconciler = reconciler;
    this.renderInstance.setInternalOnClose(this.handleWhisperClose);
  }

  close(): void {
    this.renderInstance.closeWhisper();
  }

  update(node: React.ReactNode): Promise<void> {
    return new Promise((resolve) => {
      this.reconciler.updateContainer(node, this.container, null, resolve);
    });
  }

  handleWhisperClose = (): Promise<void> =>
    new Promise((resolve) => {
      this.reconciler.updateContainer(null, this.container, null, resolve);
    });
}
