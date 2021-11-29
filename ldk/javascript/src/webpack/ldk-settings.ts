/* eslint-disable-next-line */ // Keeping type for future expansion.
export interface LdkAptitude {}

export interface LdkValue {
  value: string;
}

export interface LdkFilesystem {
  pathGlobs: LdkValue[];
}

export interface LdkNetwork {
  urlDomains: LdkValue[];
}

export interface LdkUser {
  optionalClaims?: LdkValue[];
}
export interface LdkPermissions {
  browser: LdkNetwork;

  clipboard: LdkAptitude;

  cursor: LdkAptitude;

  document: LdkAptitude;

  filesystem: LdkFilesystem;

  keyboard: LdkAptitude;

  network: LdkNetwork;

  process: LdkAptitude;

  screen: LdkAptitude;

  search: LdkAptitude;

  system: LdkAptitude;

  ui: LdkAptitude;

  user: LdkUser;

  vault: LdkAptitude;

  whisper: LdkAptitude;

  window: LdkAptitude;
}

export interface Ldk {
  permissions: LdkPermissions;
}

export interface LdkSettings {
  ldk: Ldk;
}
