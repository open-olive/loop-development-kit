import {
  Component,
  StateMap,
} from '@oliveai/ldk/dist/whisper/types';
import ComponentIds from './componentIds';
import { getSubmitButton, init } from './componentsInitializer';
import { validateFormComponent } from './validation';

export default class Form {
  components: Map<string, Component>;

  formValidity: Map<string, boolean>;

  componentIds: ComponentIds;

  constructor() {
    this.componentIds = new ComponentIds();
    this.formValidity = new Map([
      [this.componentIds.checkboxInputId, true],
      [this.componentIds.dropdownInputId, true],
      [this.componentIds.emailInputId, true],
      [this.componentIds.numberInputId, true],
      [this.componentIds.passwordInputId, true],
      [this.componentIds.radioInputId, true],
      [this.componentIds.telephoneInputId, true],
      [this.componentIds.textInputId, true],
    ]);
    this.components = init(this);
  }

  getComponents(): Component[] {
    return [...Array.from(this.components.values()), getSubmitButton(this)];
  }

  validate(componentState: StateMap): void {
    this.components.forEach((component) => {
      const componentValue = componentState.get(component.id);
      const componentValidationResponse = validateFormComponent(
        component,
        this.componentIds,
        componentValue,
      );
      if (component.id) {
        this.components.set(component.id, componentValidationResponse.validatedComponent);
      }
      this.formValidity.set(component.id, componentValidationResponse.valid);
    });
  }

  validateComponent(value: string | boolean | number, componentId: string): void {
    const componentValidationResponse = validateFormComponent(
      this.components.get(componentId),
      this.componentIds,
      value,
    );

    this.components.set(componentId, componentValidationResponse.validatedComponent);
    this.formValidity.set(componentId, componentValidationResponse.valid);
  }

  isValid(): boolean {
    return Array.from(this.formValidity.values()).every((valid) => valid);
  }
}
