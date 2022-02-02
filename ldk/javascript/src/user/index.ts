import { promisifyWithParam, promisifyWithParamAfterCallback } from '../promisify';

/**
 * The User aptitude gives access to Olive Helps user related information
 */
export interface JWTConfig {
  includeEmail?: boolean;
}
/**
 * @property {boolean} includeEmail if true, the user's email address will be included in an optional email claim.
 * @property {boolean} includeFullName if true, the user's full name will be included in an optional fullName claim.
 * @property {boolean} includeOrganizationId if true, the user's Olive Helps internal organizaiton ID will be included in an optional organizationId claim.
 * @property {boolean} includeOrganizationName if true, the user's organization name will be included in an optional organizationName claim.
 */
export interface JWTWithUserDetailsConfig {
  includeEmail?: boolean;
  includeFullName?: boolean;
  includeOrganizationId?: boolean;
  includeOrganizationName?: boolean;
}

export interface JWTWithUserDetails {
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
   * @param jwtConfig a JWTConfig object that can be configured to include the user's email
   * @returns JWT with the current username in the subject field.
   */
  jwt(jwtConfig?: JWTConfig): Promise<string>;
  /**
   * Returns a an object with the JWT identifying the current OliveHelps user, as well as any optional params.
   *
   * @param jwtWithUserDetailsConfig a JWTWithUserDetailsConfig that can be configured to also include the user's email, full name, organization name, or organization ID
   * @returns Object with the JWT and any optional user details requested.
   */
  jwtWithUserDetails(
    jwtWithUserDetailsConfig?: JWTWithUserDetailsConfig,
  ): Promise<JWTWithUserDetails>;
}

export function jwt(jwtConfig: JWTConfig = {}): Promise<string> {
  return promisifyWithParamAfterCallback(jwtConfig, oliveHelps.user.jwt);
}

export function jwtWithUserDetails(
  jwtWithUserDetailsConfig: JWTWithUserDetailsConfig = {},
): Promise<JWTWithUserDetails> {
  return promisifyWithParam(jwtWithUserDetailsConfig, oliveHelps.user.jwtWithUserDetails);
}
