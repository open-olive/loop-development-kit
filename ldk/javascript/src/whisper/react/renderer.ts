import * as Reconciler from 'react-reconciler';
import { ReactElement } from 'react';
import { config } from './renderer-config';
import { WhisperRenderingInterface, WhisperRenderInstance } from './whisper-render-instance';
// This side effect import makes the JSX namespace addition available without
// needing the consumer to import the file separately.
import './component-types';
import { WhisperInstance, WhisperInstanceWrapper } from './whisper-instance-wrapper';

/**
 * @internal
 */
const renderer = Reconciler.default(config);

export async function render(
  element: ReactElement,
  whisperInterface: WhisperRenderingInterface,
): Promise<WhisperInstance> {
  if (typeof element.props.onClose === 'function') {
    whisperInterface.setOnClose(element.props.onClose)
  }

  // Tag here drives what sort of "modes" its using. 0 = LegacyRoot.
  const container = renderer.createContainer(whisperInterface, 0, false, null);
  const wrapper = new WhisperInstanceWrapper(container, whisperInterface, renderer);
  await wrapper.update(element);
  return wrapper;
}

/**
 *
 * @param element
 */
export function renderNewWhisper(element: ReactElement): Promise<WhisperInstance> {
  return render(element, new WhisperRenderInstance());
}

export { WhisperInstance };
