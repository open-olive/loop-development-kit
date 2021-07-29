import {
  Component,
  DateTimeType,
  Whisper,
  WhisperComponentType,
} from '@oliveai/ldk/dist/whisper/types';
import Form from './form';

const componentActionHandler = (
  form: Form,
  value: string | boolean | number,
  componentId: string,
  updateWhisper: Whisper,
) => {
  form.validateComponent(value, componentId);
  updateWhisper.update({
    components: form.getComponents(),
  });
};

export const initialize = (form: Form): Map<string, Component> =>
  new Map([
    [
      form.componentIds.patientNameId,
      {
        type: WhisperComponentType.TextInput,
        label: `Name *`,
        id: form.componentIds.patientNameId,
        key: form.componentIds.patientNameId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientNameId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.patientVisitDateId,
      {
        type: WhisperComponentType.DateTimeInput,
        dateTimeType: DateTimeType.DateTime,
        label: `Date of Visit *`,
        id: form.componentIds.patientVisitDateId,
        key: form.componentIds.patientVisitDateId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(
            form,
            param,
            form.componentIds.patientVisitDateId,
            onChangeWhisper,
          );
        },
        min: new Date(2021, 0, 1),
        max: new Date(2022, 11, 31),
      },
    ],
    [
      form.componentIds.patientSsnId,
      {
        type: WhisperComponentType.Password,
        label: 'Last 4 SSN *',
        id: form.componentIds.patientSsnId,
        key: form.componentIds.patientSsnId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientSsnId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.patientPhoneId,
      {
        type: WhisperComponentType.Telephone,
        label: 'Phone *',
        id: form.componentIds.patientPhoneId,
        key: form.componentIds.patientPhoneId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientPhoneId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.patientAgeId,
      {
        type: WhisperComponentType.Number,
        label: `Age *`,
        id: form.componentIds.patientAgeId,
        key: form.componentIds.patientAgeId,
        onChange: (_error: Error, param: number, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientAgeId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.patientEmailId,
      {
        type: WhisperComponentType.Email,
        label: `Email *`,
        id: form.componentIds.patientEmailId,
        key: form.componentIds.patientEmailId,
        onChange: (_error: Error, param: string, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientEmailId, onChangeWhisper);
        },
      },
    ],
    [
      'patientEntryLabel',
      {
        type: WhisperComponentType.Markdown,
        body: '## Patient transportation *:',
      },
    ],
    [
      form.componentIds.patientEntryId,
      {
        type: WhisperComponentType.RadioGroup,
        id: form.componentIds.patientEntryId,
        key: form.componentIds.patientEntryId,
        options: ['Walk in', 'Assisted', 'On stretcher'],
        onSelect: (_error: Error, param: number, onSelectWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientEntryId, onSelectWhisper);
        },
      },
    ],
    [
      form.componentIds.patientConcentId,
      {
        type: WhisperComponentType.Checkbox,
        id: form.componentIds.patientConcentId,
        key: form.componentIds.patientConcentId,
        label: 'Concent for check-in',
        onChange: (_error: Error, param: boolean, onChangeWhisper: Whisper) => {
          componentActionHandler(form, param, form.componentIds.patientConcentId, onChangeWhisper);
        },
      },
    ],
    [
      form.componentIds.patientPainLevelId,
      {
        type: WhisperComponentType.Select,
        id: form.componentIds.patientPainLevelId,
        key: form.componentIds.patientPainLevelId,
        label: 'Patient pain level',
        onSelect: (_error: Error, param: number, onSelectWhisper: Whisper) => {
          componentActionHandler(
            form,
            param,
            form.componentIds.patientPainLevelId,
            onSelectWhisper,
          );
        },
        options: ['No pain', 'Low', 'Moderate', 'High'],
      },
    ],
  ]);

export const getSubmitButton = (form: Form): Component => ({
  type: WhisperComponentType.Button,
  label: 'Submit',
  onClick: (_error: Error, onClickWhisper: Whisper) => {
    form.validate(onClickWhisper.componentState);
    const updateWhisperComponents: Component[] = form.isValid()
      ? [{ type: WhisperComponentType.Markdown, body: `Form submitted successfully` }]
      : form.getComponents();
    onClickWhisper.update({
      components: updateWhisperComponents,
    });
  },
});
