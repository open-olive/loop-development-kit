/* eslint-disable no-async-promise-executor */
import * as React from 'react';
import { DateTimeType, StateMap } from '@oliveai/ldk/dist/whisper/types';
import ComponentIds from './component-ids';
import { ConfirmOrDeny, TestComponentProps, WhisperTestWrapper } from './react-whisper-utils';

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

type ValidationErrors = {
  [Property in keyof ComponentIds]?: string;
};

const ComponentValidationTest: React.FunctionComponent<TestComponentProps> = (props) => {
  const [ids] = React.useState(new ComponentIds());
  const [validateButtonClicked, updateButtonClicked] = React.useState(false);
  const [errors, updateValidationErrors] = React.useState({} as ValidationErrors);
  const onChange = () => {
    /* do nothing */
  };
  const onValidate = (state: StateMap) => {
    const errors: ValidationErrors = {};
    errors.textInputId =
      state.get(ids.textInputId) !== 'valid' ? "Input should be 'valid'" : undefined;
    errors.dateInputId =
      state.get(ids.dateInputId) !== '2020-08-20' ? 'Value should be 2020-08-20' : undefined;
    errors.passwordInputId =
      ((state.get(ids.passwordInputId) as string) || '').trim().length < 9
        ? 'Password should be at least 9 char long'
        : undefined;
    errors.telephoneInputId = !phoneRegex.test(state.get(ids.telephoneInputId)?.toString() || '')
      ? 'Please enter a valid telephone number'
      : undefined;
    errors.numberInputId =
      state.get(ids.numberInputId) !== 999 ? "Input should be '999'" : undefined;
    errors.emailInputId = !emailRegex.test((state.get(ids.emailInputId) as string) || '')
      ? 'Please enter a valid email address'
      : undefined;
    errors.radioInputId =
      state.get(ids.radioInputId) === undefined ? 'Please choose an option' : undefined;
    errors.checkboxInputId =
      state.get(ids.checkboxInputId) !== true ? 'Please select the checkbox' : undefined;
    errors.dropdownInputId =
      state.get(ids.dropdownInputId) === undefined ? 'Please choose an option' : undefined;
    errors.dateInputId =
      state.get(ids.dateInputId) !== '2020-08-20' ? 'Please select 2020-08-20' : undefined;
    updateValidationErrors(errors);
    errors.autocompleteInputId =
      ((state.get(ids.autocompleteInputId) as string[]) || []).length === 0
        ? 'Please choose an option'
        : undefined;
  };
  return (
    <>
      <oh-autocomplete
        label="Select an option"
        onSelect={onChange}
        key={ids.autocompleteInputId}
        id={ids.autocompleteInputId}
        validationError={errors.autocompleteInputId}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <oh-text-input
        label="Input 'valid'"
        id={ids.textInputId}
        key={ids.textInputId}
        onChange={onChange}
        validationError={errors.textInputId}
      />
      <oh-password
        label="Password (9 char)"
        id={ids.passwordInputId}
        key={ids.passwordInputId}
        onChange={onChange}
        validationError={errors.passwordInputId}
      />
      <oh-telephone
        label="Valid Phone"
        id={ids.telephoneInputId}
        key={ids.telephoneInputId}
        onChange={onChange}
        validationError={errors.telephoneInputId}
      />
      <oh-number
        label="Input 999"
        id={ids.numberInputId}
        key={ids.numberInputId}
        onChange={onChange}
        validationError={errors.numberInputId}
      />
      <oh-email
        label="Valid Email"
        id={ids.emailInputId}
        key={ids.emailInputId}
        onChange={onChange}
        validationError={errors.emailInputId}
      />
      <oh-radio-group
        id={ids.radioInputId}
        key={ids.radioInputId}
        options={['Option 1', 'Option 2']}
        onSelect={onChange}
        validationError={errors.radioInputId}
      />
      <oh-checkbox
        label="Check required"
        id={ids.checkboxInputId}
        key={ids.checkboxInputId}
        onChange={onChange}
        validationError={errors.checkboxInputId}
      />
      <oh-select
        id={ids.dropdownInputId}
        key={ids.dropdownInputId}
        options={['Option 1', 'Option 2']}
        onSelect={onChange}
        validationError={errors.dropdownInputId}
      />
      <oh-datetime
        label="Enter 2020-08-20"
        id={ids.dateInputId}
        key={ids.dateInputId}
        dateTimeType={DateTimeType.Date}
        onChange={onChange}
        validationError={errors.dateInputId}
      />
      <oh-button
        label={validateButtonClicked ? 'Validate Again' : 'Validate'}
        onClick={(error, whisper) => {
          updateButtonClicked(true);
          onValidate(whisper.componentState);
        }}
      />
      {validateButtonClicked && (
        <ConfirmOrDeny
          onResolve={props.onResolve}
          onReject={props.onReject}
          prompt="Validation works"
        />
      )}
    </>
  );
};

export const testComponentsValidation = (): Promise<boolean> =>
  WhisperTestWrapper.createPromise(ComponentValidationTest, 'Simple Form');
