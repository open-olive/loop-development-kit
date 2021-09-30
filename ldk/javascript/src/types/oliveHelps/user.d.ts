declare namespace User {
  interface Aptitude {
    jwt: Common.ReadableWithParamAfterCallback<string, JWTConfig>;
  }

  interface JWTConfig {
    includeEmail?: boolean;
  }
}
