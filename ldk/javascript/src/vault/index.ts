
import { promisifyWithParam, promisifyWithTwoParams } from '../promisify';

/**
 * The Vault aptitude allows Loops to retrieve and store strings in the system's secure storage (Keychain for MacOS, Credential Manager for Windows).
 */
export interface Vault {
  /**
   * Removes an entry from the vault.
   *
   * @param key - The key for item to remove.
   * @returns Status of the remove operation.
   */
  remove(key: string): Promise<void>;

  /**
   * Returns true if the specified vault entry exists.
   *
   * @param key - The key for the item to check existence.
   * @returns True if the specified vault entry exists.
   */
  exists(key: string): Promise<boolean>;

  /**
   * Returns the stored value for the specified vault entry.
   *
   * @param key - The key for the item to read.
   * @returns Stored value for the specified vault entry.
   */
  read(key: string): Promise<string>;

  /**
   * Writes the provided value to the specified vault entry.
   *
   * @param key - The key for the item to write.
   * @param value - The value to write.
   * @returns The status of the write operation.
   */
  write(key: string, value: string): Promise<void>;
}

export function remove(key: string): Promise<void> {
  return promisifyWithParam(key, oliveHelps.vault.remove);
}

export function exists(key: string): Promise<boolean> {
  return promisifyWithParam(key, oliveHelps.vault.exists);
}

export function read(key: string): Promise<string> {
  return promisifyWithParam(key, oliveHelps.vault.read);
}

export function write(key: string, value: string): Promise<void> {
  return promisifyWithTwoParams(key, value, oliveHelps.vault.write);
}
