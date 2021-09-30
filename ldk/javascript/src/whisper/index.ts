import { mapToExternalWhisper, mapToInternalWhisper } from './mapper';
import { NewWhisper, Whisper } from './types';

export * from './types';

/**
 *  Whisper aptitude provides the ability to create a whisper.
 */
export interface WhisperAptitude {
  /**
   * Adds a new whisper to Olive Helps based on the configuration provided.
   * Returns a promise which provides a reference to the newly created whisper
   *
   * @param whisper The configuration for the whisper being created
   */
  create(whisper: NewWhisper): Promise<Whisper>;
}

export function create(whisper: NewWhisper): Promise<Whisper> {
  const stateMap = new Map();

  return new Promise((resolve, reject) => {
    try {
      oliveHelps.whisper.create(
        mapToInternalWhisper(whisper, stateMap),
        (error: Error | undefined, internalWhisper: WhisperService.Whisper) => {
          if (error) {
            reject(error);
          }
          resolve(mapToExternalWhisper(internalWhisper, stateMap));
        },
      );
    } catch (e) {
      reject(e);
    }
  });
}
