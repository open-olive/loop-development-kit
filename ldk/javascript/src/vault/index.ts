/**
 * Allows Loops to retrieve and store strings in the system's secure storage (Keychain for MacOS, Credential Manager for Windows).
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

// TODO: Do we want to override js delete?
export function remove(key: string): Promise<void> { 
    return new Promise<void>((resolve, reject) => {
        try {
            oliveHelps.vault.remove(key, () => resolve());
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function exists(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            oliveHelps.vault.exists(key, (doesExist: boolean) => resolve(doesExist));
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export function read(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try {
            oliveHelps.vault.read(key, (readValue: string) => resolve(readValue));
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export function write(key: string, value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            oliveHelps.vault.write(key, value, () => resolve());
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}