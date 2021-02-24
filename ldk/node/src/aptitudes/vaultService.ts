/**
 * The VaultService allows users to save/load data from vault. The Vault values can be modified by the user.
 */
export interface VaultService {
  /**
   * @param key - Key of the item to delete from vault.
   * @returns Promise that resolves when the deletion completes.
   */
  vaultDelete(key: string): Promise<void>;

  /**
   * @param key - Key to check for presence.
   * @returns Promise resolve with whether the vault has the key (true) or not (false).
   */
  vaultExists(key: string): Promise<boolean>;

  /**
   * Reads the value from vault and returns it in a promise.
   *
   * @param key - Key to read from vault.
   * @returns Resolves with the value of the key.
   */
  vaultRead(key: string): Promise<string>;

  /**
   * Writes a value to vault.
   *
   * @param key Key to write value to.
   * @param value The value being written.
   * @returns Resolves when write is complete.
   */
  vaultWrite(key: string, value: string): Promise<void>;
}
