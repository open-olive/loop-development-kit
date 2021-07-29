/**
 * The User aptitude gives access to Olive Helps user related information
 */
import { promisifyWithParamAfterCallback } from '../promisify';

export interface JWTConfig {
  includeEmail?: boolean;
}
export interface User {
  /**
   * Returns a JWT identifying the current OliveHelps user.
   *
   * @param includeEmail if true, the user's email address will be included in an optional email claim.
   * @returns JWT with the current username in the subject field.
   */
  jwt(jwtConfig?: JWTConfig): Promise<string>;
}

export function jwt(jwtConfig: JWTConfig = {}): Promise<string> {
  return promisifyWithParamAfterCallback(jwtConfig, oliveHelps.user.jwt);
}
