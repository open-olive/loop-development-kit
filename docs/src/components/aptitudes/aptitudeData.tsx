import React from 'react';

export interface LDKLinks {
  js: string;
}

export type LDKLinkActive = Partial<LDKLinks>;

export interface IAptitudeData {
  name: string;
  internalName: string;
  shortDescription: string;
  description: string;
  capabilities: ICapabilityData[];
  links?: LDKLinkActive;
}

export interface ICapabilityData {
  name: string;
  description: string;
  links?: LDKLinkActive;
}
