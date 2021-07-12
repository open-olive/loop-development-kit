import {
  Component,
  StateMap,
  TextInput,
  Password,
  Telephone,
  NumberInput,
  Email,
  RadioGroup,
  Checkbox,
  Select,
} from '@oliveai/ldk/dist/whisper/types';
import ComponentIds from './componentIds';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const validateForm = (
  componentState: StateMap,
  components: Component[],
  componentIds: ComponentIds,
): Component[] => {
  const validatedComponents: Component[] = [];

  components.forEach((component) => {
    const componentStateValue = componentState.get(component.id);
    switch (component.id) {
      case componentIds.textInputId:
        if (componentStateValue !== 'valid') {
          const validatedComponent = component as TextInput;
          validatedComponent.validationError = `Input should be 'valid'`;
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.passwordInputId:
        if (!componentStateValue || (componentStateValue as string).trim().length < 9) {
          const validatedComponent = component as Password;
          validatedComponent.validationError = 'Password should be more than 9 character long';
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.telephoneInputId:
        if (!componentStateValue || !phoneRegex.test(componentStateValue as string)) {
          const validatedComponent = component as Telephone;
          validatedComponent.validationError = 'Please enter a valid phone number';
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.numberInputId:
        if (!componentStateValue || (componentStateValue as number) !== 999) {
          const validatedComponent = component as NumberInput;
          validatedComponent.validationError = `Input should be '999'`;
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.emailInputId:
        if (!componentStateValue || !emailRegex.test(componentStateValue as string)) {
          const validatedComponent = component as Email;
          validatedComponent.validationError = `Please enter a valid email`;
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.radioInputId:
        console.log(`radioInput: ${componentStateValue}`);
        if (componentStateValue === undefined) {
          const validatedComponent = component as RadioGroup;
          validatedComponent.validationError = `Please choose an option`;
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.checkboxInputId:
        console.log(`checkboxInput: ${componentStateValue}`);
        if (componentStateValue === undefined || !(componentStateValue as boolean)) {
          const validatedComponent = component as Checkbox;
          validatedComponent.validationError = `Please select the checkbox`;
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      case componentIds.dropdownInputId:
        console.log(`selectInput: ${componentStateValue}`);
        if (componentStateValue === undefined) {
          const validatedComponent = component as Select;
          validatedComponent.validationError = `Please select an option`;
          validatedComponents.push(validatedComponent);
        } else {
          validatedComponents.push(component);
        }
        break;
      default:
        validatedComponents.push(component);
        break;
    }
  });

  return validatedComponents;
};
