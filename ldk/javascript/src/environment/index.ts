/**
 * Allows Loops to read environment variables from the system
 */
export interface Environment {
    /**
     * Returns the value for the specified environment variable.
     *
     * @param key - The name of the variable to read.
     * @returns Value for the specified environment variable.
     */
    read(key: string): Promise<string>;
}

export function read(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try {
            oliveHelps.environment.read(key, (readValue: string) => resolve(readValue));
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}
