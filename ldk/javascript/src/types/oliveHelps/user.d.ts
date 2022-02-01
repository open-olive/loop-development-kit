declare namespace User {
  interface Aptitude {
    jwt: Common.ReadableWithParamAfterCallback<string, JWTConfig>;
    jwtWithUserDetails: Common.ReadableWithParam<unknown, JWTWithParams>;
  }

  interface JWTConfig {
    includeEmail?: boolean;
    includeFullName?: boolean;
    includeOrganizationId?: boolean;
    includeOrganizationName?: boolean;
  }

  interface JWTWithParams {
    email?: string;
    fullName?: string;
    jwt: string;
    organizationId?: string;
    organizationName?: string;
  }
}
