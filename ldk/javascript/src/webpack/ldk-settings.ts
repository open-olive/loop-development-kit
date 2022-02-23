import { JSONSchemaType } from 'ajv';

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

  config: LdkAptitude;

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

type LdkConfigObject = {
  [key: string]: LdkConfigSchema;
};

type LdkConfigSchema = LdkConfigObject | string;

export interface Ldk {
  configSchema?: {
    [key: string]: JSONSchemaType<LdkConfigSchema>;
  };
  permissions: LdkPermissions;
}

export interface LdkSettings {
  ldk: Ldk;
}
