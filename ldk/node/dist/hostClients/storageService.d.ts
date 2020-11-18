/**
 * The StorageService allows users to save/load data from storage. The Storage values can be modified by the user.
 */
export interface StorageService {
    /**
     * @param key - Key of the item to delete from storage.
     * @returns Promise that resolves when the deletion completes.
     */
    storageDelete(key: string): Promise<void>;
    /**
     * @param key - Key to check for presence.
     * @returns Promise resolve with whether the storage has the key (true) or not (false).
     */
    storageExists(key: string): Promise<boolean>;
    /**
     * Reads the value from storage and returns it in a promise.
     *
     * @param key - Key to read from storage.
     * @returns Resolves with the value of the key.
     */
    storageRead(key: string): Promise<string>;
    /**
     * Writes a value to storage.
     *
     * @param key Key to write value to.
     * @param value The value being written.
     * @returns Resolves when write is complete.
     */
    storageWrite(key: string, value: string): Promise<void>;
}
