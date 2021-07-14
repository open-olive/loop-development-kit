import { Component, StateMap } from '@oliveai/ldk/dist/whisper/types';
import ComponentIds from './componentIds';
import { getSubmitButton, initialize } from './componentsInitializer';
import { validateFormComponent } from './validation';

export default class Form {
  components: Map<string, Component>;

  formValidity: Map<string, boolean>;

  componentIds: ComponentIds;

  constructor() {
    this.componentIds = new ComponentIds();
    this.formValidity = new Map([
      [this.componentIds.patientConcentId, true],
      [this.componentIds.patientPainLevelId, true],
      [this.componentIds.patientEmailId, true],
      [this.componentIds.patientAgeId, true],
      [this.componentIds.patientSsnId, true],
      [this.componentIds.patientEntryId, true],
      [this.componentIds.patientPhoneId, true],
      [this.componentIds.patientNameId, true],
      [this.componentIds.patientVisitDateId, true],
    ]);
    this.components = initialize(this);
  }

  getComponents(): Component[] {
    return [...Array.from(this.components.values()), getSubmitButton(this)];
  }

  validate(componentState: StateMap): void {
    this.components.forEach((component) => {
      if (component.id) {
        const componentValue = componentState.get(component.id);
        const componentValidationResponse = validateFormComponent(
          component,
          this.componentIds,
          componentValue,
        );

        this.components.set(component.id, componentValidationResponse.validatedComponent);
        this.formValidity.set(component.id, componentValidationResponse.valid);
      }
    });
  }

  validateComponent(value: string | boolean | number, componentId: string): void {
    const componentValidationResponse = validateFormComponent(
      this.components.get(componentId),
      this.componentIds,
      value,
    );

    console.log(
      `Validation for componentId: ${componentId}, valid: ${componentValidationResponse.valid}`,
    );

    this.components.set(componentId, componentValidationResponse.validatedComponent);
    this.formValidity.set(componentId, componentValidationResponse.valid);
  }

  isValid(): boolean {
    return Array.from(this.formValidity.values()).every((valid) => valid);
  }
}
