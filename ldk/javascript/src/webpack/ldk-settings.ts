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

export interface LdkPermissions {
  clipboard: LdkAptitude;

  cursor: LdkAptitude;

  filesystem: LdkFilesystem;

  keyboard: LdkAptitude;

  network: LdkNetwork;

  process: LdkAptitude;

  system: LdkAptitude;

  ui: LdkAptitude;

  user: LdkAptitude;

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
