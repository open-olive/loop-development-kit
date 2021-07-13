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
} from '@oliveai/ldk/dist/whisper/types';
import ComponentIds from '../componentIds';
import ComponentValidationResponse from './componentValidationResponse';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

export const validateFormComponent = (
  component: Component,
  componentIds: ComponentIds,
  value: string | boolean | number,
): ComponentValidationResponse => {
  switch (component.id) {
    case componentIds.textInputId:
      if (value !== 'valid') {
        const validatedComponent = component as TextInput;
        validatedComponent.validationError = `Input should be 'valid'`;
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.passwordInputId:
      if (!value || (value as string).trim().length < 9) {
        const validatedComponent = component as Password;
        validatedComponent.validationError = 'Password should be more than 9 character long';
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.telephoneInputId:
      if (!value || !phoneRegex.test(value as string)) {
        const validatedComponent = component as Telephone;
        validatedComponent.validationError = 'Please enter a valid phone number';
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.numberInputId:
      if (!value || (value as number) !== 999) {
        const validatedComponent = component as NumberInput;
        validatedComponent.validationError = `Input should be '999'`;
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.emailInputId:
      if (!value || !emailRegex.test(value as string)) {
        const validatedComponent = component as Email;
        validatedComponent.validationError = `Please enter a valid email`;
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.radioInputId:
      if (value === undefined) {
        const validatedComponent = component as RadioGroup;
        validatedComponent.validationError = `Please choose an option`;
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.checkboxInputId:
      if (value === undefined || !(value as boolean)) {
        const validatedComponent = component as Checkbox;
        validatedComponent.validationError = `Please select the checkbox`;
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    case componentIds.dropdownInputId:
      if (value === undefined) {
        const validatedComponent = component as Select;
        validatedComponent.validationError = `Please select an option`;
        return new ComponentValidationResponse(validatedComponent, false);
      }
      return new ComponentValidationResponse(component, true);
    default:
      return new ComponentValidationResponse(component, true);
  }
};