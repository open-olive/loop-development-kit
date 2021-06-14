import { promisifyMappedBothWithParams } from '../promisify';
import { convertToExternalWhisper, convertToInternalWhisper } from './convert';
import { NewWhisper, Whisper } from './types';

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
    convertToInternalWhisper,
    convertToExternalWhisper,
    oliveHelps.whisper.create,
  );
}
