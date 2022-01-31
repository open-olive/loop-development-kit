declare namespace User {
  interface Aptitude {
    jwt: Common.ReadableWithParamAfterCallback<string, JWTConfig>;
    jwtWithUserDetails: Common.ReadableWithParamAfterCallback<any, JWTConfig>;
  }

  interface JWTConfig {
    includeEmail?: boolean;
    includeFullName?: boolean;
    includeOrganizationId?: boolean;
    includeOrganizationName?: boolean;
  }
}
