/* eslint-disable no-case-declarations */
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
  // TODO: perhaps change to map
  switch (component.id) {
    case componentIds.textInputId:
      const textInput = component as TextInput;
      textInput.validationError = undefined;
      if (value !== 'valid') {
        textInput.validationError = `Input should be 'valid'`;
        return new ComponentValidationResponse(textInput, false);
      }
      return new ComponentValidationResponse(textInput, true);
    case componentIds.passwordInputId:
      const passwordInput = component as Password;
      passwordInput.validationError = undefined;
      if (!value || (value as string).trim().length < 9) {
        passwordInput.validationError = 'Password should be more than 9 character long';
        return new ComponentValidationResponse(passwordInput, false);
      }
      return new ComponentValidationResponse(passwordInput, true);
    case componentIds.telephoneInputId:
      const telephoneInput = component as Telephone;
      telephoneInput.validationError = undefined;
      if (!value || !phoneRegex.test(value as string)) {
        telephoneInput.validationError = 'Please enter a valid phone number';
        return new ComponentValidationResponse(telephoneInput, false);
      }
      return new ComponentValidationResponse(telephoneInput, true);
    case componentIds.numberInputId:
      const numberInput = component as NumberInput;
      numberInput.validationError = undefined;
      if (!value || (value as number) !== 999) {
        numberInput.validationError = `Input should be '999'`;
        return new ComponentValidationResponse(numberInput, false);
      }
      return new ComponentValidationResponse(numberInput, true);
    case componentIds.emailInputId:
      const emailInput = component as Email;
      emailInput.validationError = undefined;
      if (!value || !emailRegex.test(value as string)) {
        emailInput.validationError = `Please enter a valid email`;
        return new ComponentValidationResponse(emailInput, false);
      }
      return new ComponentValidationResponse(emailInput, true);
    case componentIds.radioInputId:
      const radioInput = component as RadioGroup;
      radioInput.validationError = undefined;
      if (value === undefined) {
        radioInput.validationError = `Please choose an option`;
        return new ComponentValidationResponse(radioInput, false);
      }
      return new ComponentValidationResponse(radioInput, true);
    case componentIds.checkboxInputId:
      const checkboxInput = component as Checkbox;
      checkboxInput.validationError = undefined;
      if (value === undefined || !(value as boolean)) {
        checkboxInput.validationError = `Please select the checkbox`;
        return new ComponentValidationResponse(checkboxInput, false);
      }
      return new ComponentValidationResponse(checkboxInput, true);
    case componentIds.dropdownInputId:
      const dropdownInput = component as Select;
      dropdownInput.validationError = undefined;
      if (value === undefined) {
        dropdownInput.validationError = `Please select an option`;
        return new ComponentValidationResponse(dropdownInput, false);
      }
      return new ComponentValidationResponse(dropdownInput, true);
    default:
      return new ComponentValidationResponse(component, true);
  }
};
