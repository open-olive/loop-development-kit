import { system, whisper } from '@oliveai/ldk';
import { WhisperComponentType } from '@oliveai/ldk/dist/whisper/types';
import { resolveRejectButtons } from '../whisper/utils';

export const testOperatingSystem = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const os = await system.operatingSystem();

    try {
      const operatingSystemWhisper = await whisper.create({
        label: 'Are default values displayed correctly?',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: `OS: ${os}`,
          },
          resolveRejectButtons(resolve, reject),
        ],
      });
      setTimeout(() => {
        operatingSystemWhisper.close(() => {
          // Do nothing
        });
        reject(new Error('Did not resolve the test in 15 seconds'));
      }, 15000);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testGetEnvironment = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const environment = await system.getEnvironment();

    try {
      const environmentWhisper = await whisper.create({
        label: 'Are default values displayed correctly?',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: `OS Version: ${environment.osVersion}`,
          },
          {
            type: WhisperComponentType.Markdown,
            body: `Olive Helps Version: ${environment.oliveHelpsVersion}`,
          },
          {
            type: WhisperComponentType.Markdown,
            body: `Loop Version: ${environment.loopVersion}`,
          },
          resolveRejectButtons(resolve, reject),
        ],
      });
      setTimeout(() => {
        environmentWhisper.close(() => {
          // Do nothing
        });
        reject(new Error('Did not resolve the test in 15 seconds'));
      }, 15000);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
