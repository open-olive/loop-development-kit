/**
 * The Vault Aptitude allows users to save/load sensitive data.
 */
export interface Vault {
    /**
     * @param key - Key of the item to delete from vault.
     * @returns Promise that resolves when the deletion completes.
     */
    delete(key: string): Promise<void>;
    /**
     * @param key - Key to check for presence.
     * @returns Promise resolve with whether the vault has the key (true) or not (false).
     */
    exists(key: string): Promise<boolean>;
    /**
     * Reads the value from vault and returns it in a promise.
     *
     * @param key - Key to text from vault.
     * @returns Resolves with the value of the key.
     */
    read(key: string): Promise<string>;
    /**
     * Writes a value to vault.
     *
     * @param key Key to write value to.
     * @param value The value being written.
     * @returns Resolves when write is complete.
     */
    write(key: string, value: string): Promise<void>;
}
