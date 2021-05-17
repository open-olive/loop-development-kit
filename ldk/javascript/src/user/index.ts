/**
 * The User aptitude gives access to Olive Helps user related information
 */
import { promisify } from "../promisify";

export interface User {
    /**
     * Returns a JWT with the current username in the subject field
     */
    jwt(): Promise<string>;
}

export function jwt(): Promise<string> {
    return promisify(oliveHelps.user.jwt)
}
