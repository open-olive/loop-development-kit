import { promisifyWithParam, promisifyWithParamAfterCallback } from '../promisify';

/**
 * The User aptitude gives access to Olive Helps user related information
 */
export interface JWTConfig {
  includeEmail?: boolean;
  includeFullName?: boolean;
  includeOrganizationId?: boolean;
  includeOrganizationName?: boolean;
}

export interface JWTWithParams {
  email?: string;
  fullName?: string;
  jwt: string;
  organizationId?: string;
  organizationName?: string;
}

export interface User {
  /**
   * Returns a JWT identifying the current OliveHelps user.
   *
   * @param includeEmail if true, the user's email address will be included in an optional email claim.
   * @returns JWT with the current username in the subject field.
   */
  jwt(jwtConfig?: JWTConfig): Promise<string>;
  /**
   * Returns a JWT identifying the current OliveHelps user.
   *
   * @param includeEmail if true, the user's email address will be included in an optional email claim.
   * @param includeFullName if true, the user's full name will be included in an optional fullName claim.
   * @param includeOrganizationId if true, the user's Olive Helps internal organizaiton ID will be included in an optional organizationId claim.
   * @param includeOrganizationName if true, the user's organization name will be included in an optional organizationName claim.
   * @returns JWT with the current username in the subject field.
   */
  jwtWithUserDetails(jwtConfig?: JWTConfig): Promise<JWTWithParams>;
}

export function jwt(jwtConfig: JWTConfig = {}): Promise<string> {
  return promisifyWithParamAfterCallback(jwtConfig, oliveHelps.user.jwt);
}

export function jwtWithUserDetails(jwtConfig: JWTConfig = {}): Promise<JWTWithParams> {
  return promisifyWithParam(jwtConfig, oliveHelps.user.jwtWithUserDetails);
}
