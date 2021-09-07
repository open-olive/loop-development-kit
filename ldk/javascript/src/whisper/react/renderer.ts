import * as Reconciler from 'react-reconciler';
import { ReactNode } from 'react';
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
  element: ReactNode,
  whisperInterface: WhisperRenderingInterface,
): Promise<WhisperInstance> {
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
export function renderNewWhisper(element: ReactNode): Promise<WhisperInstance> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return render(element, new WhisperRenderInstance());
}
