import {
  Component,
  TextInput,
  Password,
  Telephone,
  NumberInput,
  Email,
  RadioGroup,
  Checkbox,
  Select,
  DateTimeInput,
} from '@oliveai/ldk/dist/whisper/types';
import ComponentIds from '../componentIds';
import ComponentValidationResponse from './componentValidationResponse';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const ssnRegex = /^[0-9]{4}$/;

export const validateFormComponent = (
  component: Component,
  componentIds: ComponentIds,
  value: string | boolean | number,
): ComponentValidationResponse => {
  const map: Map<string, () => ComponentValidationResponse> = new Map([
    [
      componentIds.patientNameId,
      () => {
        const patientNameInput = component as TextInput;
        patientNameInput.validationError = undefined;
        if (!value) {
          patientNameInput.validationError = `Please provide patient name`;
          return new ComponentValidationResponse(patientNameInput, false);
        }
        return new ComponentValidationResponse(patientNameInput, true);
      },
    ],
    [
      componentIds.patientVisitDateId,
      () => {
        const patientVisitDateInput = component as DateTimeInput;
        patientVisitDateInput.validationError = undefined;
        if (!value) {
          patientVisitDateInput.validationError = `Please select patient visit date`;
          return new ComponentValidationResponse(patientVisitDateInput, false);
        }
        return new ComponentValidationResponse(patientVisitDateInput, true);
      },
    ],
    [
      componentIds.patientSsnId,
      () => {
        const patientSsnInput = component as Password;
        patientSsnInput.validationError = undefined;
        if (!value || !ssnRegex.test(value as string)) {
          patientSsnInput.validationError = 'Please provide last 4 of SSN';
          return new ComponentValidationResponse(patientSsnInput, false);
        }
        return new ComponentValidationResponse(patientSsnInput, true);
      },
    ],
    [
      componentIds.patientPhoneId,
      () => {
        const telephoneInput = component as Telephone;
        telephoneInput.validationError = undefined;
        if (!value || !phoneRegex.test(value as string)) {
          telephoneInput.validationError = 'Please enter a valid phone number';
          return new ComponentValidationResponse(telephoneInput, false);
        }
        return new ComponentValidationResponse(telephoneInput, true);
      },
    ],
    [
      componentIds.patientAgeId,
      () => {
        const numberInput = component as NumberInput;
        numberInput.validationError = undefined;
        if (!value || (value as number) < 5 || (value as number) > 120) {
          numberInput.validationError = `Age should be between 5 and 120`;
          return new ComponentValidationResponse(numberInput, false);
        }
        return new ComponentValidationResponse(numberInput, true);
      },
    ],
    [
      componentIds.patientEmailId,
      () => {
        const emailInput = component as Email;
        emailInput.validationError = undefined;
        if (!value) {
          emailInput.validationError = `Email is required`;
          return new ComponentValidationResponse(emailInput, false);
        }
        if (!emailRegex.test(value as string)) {
          emailInput.validationError = `Please enter a valid email`;
          return new ComponentValidationResponse(emailInput, false);
        }
        return new ComponentValidationResponse(emailInput, true);
      },
    ],
    [
      componentIds.patientEntryId,
      () => {
        const radioInput = component as RadioGroup;
        radioInput.validationError = undefined;
        if (value === undefined) {
          radioInput.validationError = `Please choose an option`;
          return new ComponentValidationResponse(radioInput, false);
        }
        return new ComponentValidationResponse(radioInput, true);
      },
    ],
    [
      componentIds.patientConcentId,
      () => {
        const checkboxInput = component as Checkbox;
        checkboxInput.validationError = undefined;
        if (value === undefined || !(value as boolean)) {
          checkboxInput.validationError = `Patient must concent`;
          return new ComponentValidationResponse(checkboxInput, false);
        }
        return new ComponentValidationResponse(checkboxInput, true);
      },
    ],
    [
      componentIds.patientPainLevelId,
      () => {
        const dropdownInput = component as Select;
        dropdownInput.validationError = undefined;
        if (value === undefined) {
          dropdownInput.validationError = `Please select an observed pain level`;
          return new ComponentValidationResponse(dropdownInput, false);
        }
        return new ComponentValidationResponse(dropdownInput, true);
      },
    ],
  ]);

  if (map.has(component.id)) {
    return map.get(component.id)();
  }

  return new ComponentValidationResponse(component, true);
};
