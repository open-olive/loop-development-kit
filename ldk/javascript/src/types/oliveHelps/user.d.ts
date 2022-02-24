declare namespace User {
  interface Aptitude {
    jwt: Common.ReadableWithParamAfterCallback<string, JWTConfig>;
    jwtWithUserDetails: Common.ReadableWithParam<unknown, JWTWithUserDetails>;
  }

  interface JWTConfig {
    includeEmail?: boolean;
  }

  interface JWTWithUserDetailsConfig {
    includeEmail?: boolean;
    includeFullName?: boolean;
    includeOrganizationId?: boolean;
    includeOrganizationName?: boolean;
  }

  interface JWTWithUserDetails {
    fullName?: string;
    jwt: string;
    organizationId?: string;
    organizationName?: string;
  }
}
