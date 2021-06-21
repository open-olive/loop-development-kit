import { promisifyMappedBothWithParams } from '../promisify';
import { mapToExternalWhisper, mapToInternalWhisper } from './mapper';
import { NewWhisper, Whisper } from './types';

export * from "./types"

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
  return promisifyMappedBothWithParams(
    whisper,
    mapToInternalWhisper,
    mapToExternalWhisper,
    oliveHelps.whisper.create,
  );
}
