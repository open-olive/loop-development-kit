import * as React from 'react';
import { whisper, keyboard } from '@oliveai/ldk';
import * as Renderer from '@oliveai/ldk/dist/whisper/react/renderer';
// eslint-disable-next-line import/no-named-as-default
import Patient from './Patient';

const hotkeys = {
  key: 'n',
  control: true,
};
const genderOptions = ['Prefer not to say', 'Male', 'Female', 'Other'];

const PatientFormWhisper = (props) => {
  const [error, setError] = React.useState(null);

  const patient = props.patient;
  const firstNameOnChange = (error, value) => {
    if (value != null) {
      props.patient.setFirstName(value);
    }
  };
  const lastNameOnChange = (error, value) => {
    if (value != null) {
      props.patient.setLastName(value);
    }
  };
  const dobOnChange = (error, value) => {
    if (value != null) {
      props.patient.setLastName(value);
    }
  };
  const genderOnChange = (error, selectedOption) => {
    patient.setGender(genderOptions[selectedOption]);
  };
  const telephoneOnChange = (error, value) => {
    if (value != null) {
      patient.setTelephone(value);
    }
  };
  const emailOnChange = (error, value) => {
    if (value != null) {
      patient.setEmail(value);
    }
  };
  const visitOnChange = (error, value) => {
    if (value != null) {
      patient.setVisitReason(value);
    }
  };
  const appointmentDateOnChange = (error, value) => {
    if (value != null) {
      patient.setAppointmentDate(value);
    }
  };
  const appointmentTimeOnChange = (error, value) => {
    if (value != null) {
      patient.setAppointmentTime(value);
    }
  };
  const onClick = async (error, whisper) => {
    const validationError = patient.validate();
    if (validationError) {
      return setError(validationError);
    }

    if (await patient.isAlreadyExist()) {
      return setError(new Error('Patient already exists'));
    }

    await patient.store();

    whisper.close();
  };
  return (
    <oh-whisper label="Universal Example Loop - Form Whisper" onClose={() => {}}>
      {error && <oh-markdown body={error.message} />}
      <oh-text-input label="First Name" onChange={firstNameOnChange} />
      <oh-text-input label="Last Name" onChange={lastNameOnChange} />
      <oh-text-input label="Date of Birth" onChange={dobOnChange} tooltip="MM/dd/yyyy" />
      <oh-select options={genderOptions} label="Gender" onSelect={genderOnChange} />
      <oh-telephone label="Telephone" onChange={telephoneOnChange} tooltip="XXX-XXX-XXXX" />
      <oh-text-input label="Email" onChange={emailOnChange} />
      <oh-text-input label="Visit Reason" onChange={visitOnChange} />
      <oh-text-input label="Appointment Date" onChange={appointmentDateOnChange} />
      <oh-text-input label="Appointment Time" onChange={appointmentTimeOnChange} />
      <oh-button label="Submit" onClick={onClick} />
    </oh-whisper>
  );
};

export const start = async () => {
  await keyboard.listenHotkey(hotkeys, async (pressed) => {
    if (pressed) {
      const patient = new Patient({});

      console.log('Creating form whisper');
      await Renderer.renderNewWhisper(<PatientFormWhisper patient={patient} />);
    }
  });
};
