import { Component } from '@oliveai/ldk/dist/whisper/types';

export default class ComponentValidationResponse {
  validatedComponent: Component;

  valid: boolean;

  constructor(component: Component, valid: boolean) {
    this.validatedComponent = component;
    this.valid = valid;
  }
}
