import { newGuid } from '../utils';

export default class ComponentIds {
  textInputId: string;

  passwordInputId: string;

  telephoneInputId: string;

  numberInputId: string;

  emailInputId: string;

  radioInputId: string;

  checkboxInputId: string;

  dropdownInputId: string;

  constructor() {
    this.textInputId = newGuid();
    this.passwordInputId = newGuid();
    this.telephoneInputId = newGuid();
    this.numberInputId = newGuid();
    this.emailInputId = newGuid();
    this.radioInputId = newGuid();
    this.checkboxInputId = newGuid();
    this.dropdownInputId = newGuid();
  }
}
