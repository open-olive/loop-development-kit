import * as Reconciler from 'react-reconciler';
import { ReactNode } from 'react';
import { config } from './renderer-config';
import { WhisperRenderingInterface, WhisperRenderInstance } from './whisper-render-instance';

const Renderer = Reconciler.default(config);

interface WhisperInstance {
  update(node: ReactNode): Promise<void>;
  close(): void;
}

/**
 * @internal
 * The WhisperInstanceWrapper class manages changes to the Whisper lifecycle.
 */
class WhisperInstanceWrapper implements WhisperInstance {
  private container: Reconciler.OpaqueRoot;

  private renderInstance: WhisperRenderingInterface;

  constructor(container: Reconciler.OpaqueRoot, renderInstance: WhisperRenderingInterface) {
    this.container = container;
    this.renderInstance = renderInstance;
    this.renderInstance.setOnClose(this.handleWhisperClose);
  }

  close(): void {
    this.renderInstance.closeWhisper();
  }

  update(node: React.ReactNode): Promise<void> {
    return new Promise((resolve) => {
      Renderer.updateContainer(node, this.container, null, resolve);
    });
  }

  handleWhisperClose = (): Promise<void> =>
    new Promise((resolve) => {
      Renderer.updateContainer(null, this.container, null, resolve);
    });
}

export async function render(
  element: ReactNode,
  whisperInterface: WhisperRenderingInterface,
): Promise<WhisperInstance> {
  // Tag here drives what sort of "modes" its using. 0 = LegacyRoot.
  const container = Renderer.createContainer(whisperInterface, 0, false, null);
  const wrapper = new WhisperInstanceWrapper(container, whisperInterface);
  await wrapper.update(element);
  return wrapper;
}

/**
 *
 * @param element
 */
export function renderNewWhisper(element: ReactNode): Promise<WhisperInstance> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return render(element, new WhisperRenderInstance());
}
