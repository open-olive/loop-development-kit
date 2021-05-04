import { promisifyWithParam } from "../promisify";

export interface EnvironmentVariable {
    value: string,
    exists: boolean,
}

/**
 * Allows Loops to read environment variables from the system
 */
export interface Environment {
    /**
     * Returns the value for the specified environment variable.
     *
     * @param name - The name of the variable to read.
     * @returns Value for the specified environment variable and whether it exists.
     */
    read(name: string): Promise<EnvironmentVariable>;
}

export function read(name: string): Promise<EnvironmentVariable> {
    return promisifyWithParam<string, EnvironmentVariable>(name, oliveHelps.environment.read)
}
