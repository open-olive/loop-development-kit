import * as Reconciler from 'react-reconciler';
import { ReactNode } from 'react';
import { config } from './renderer-config';
import { WhisperRenderingInterface, WhisperRenderInstance } from './whisper-render-instance';

const Renderer = Reconciler.default(config);

interface WhisperInstance {
  update(node: ReactNode, callback?: () => void): void;
  close(): void;
}

class WhisperInstanceWrapper implements WhisperInstance {
  private container: Reconciler.OpaqueRoot;

  private renderInstance: WhisperRenderingInterface;

  constructor(container: Reconciler.OpaqueRoot, renderInstance: WhisperRenderingInterface) {
    this.container = container;
    this.renderInstance = renderInstance;
  }

  close(): void {
    // TODO: Implement
  }

  update(node: React.ReactNode, callback?: () => void): void {
    Renderer.updateContainer(node, this.container, null, callback);
  }
}

export function render(
  element: ReactNode,
  whisperInterface: WhisperRenderingInterface,
  callback?: () => void,
): WhisperInstance {
  // Tag here drives what sort of "modes" its using. 0 = LegacyRoot.
  const container = Renderer.createContainer(whisperInterface, 0, false, null);
  const wrapper = new WhisperInstanceWrapper(container, whisperInterface);
  wrapper.update(element, callback);
  return wrapper;
}

export function renderNewWhisper(element: ReactNode, onClose: () => void): void {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(element, new WhisperRenderInstance(onClose));
}
