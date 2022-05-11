declare namespace Vault {
  interface Aptitude {
    remove: Common.ReadableWithParam<string, void>;

    exists: Common.ReadableWithParam<string, boolean>;

    read: Common.ReadableWithParam<string, string>;

    write: Common.ReadableWithTwoParams<string, string, void>;
  }
}
