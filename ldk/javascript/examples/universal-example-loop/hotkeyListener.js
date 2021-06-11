import { whisper, keyboard } from '@oliveai/ldk';
// eslint-disable-next-line import/no-named-as-default
import Patient from './Patient';

const { TextInput, Telephone, Email, Button, Select } = whisper.WhisperComponentType;
const hotkeys = {
  key: 'n',
  control: true,
};
const genderOptions = ['Prefer not to say', 'Male', 'Female', 'Other'];
let formWhisper = null;

const getPatientFormWhisperComponents = (patient) => [
  {
    label: 'First Name',
    onChange: (error, value) => {
      if (value != null) {
        patient.setFirstName(value);
      }
      console.log(value, patient.firstName);
    },
    type: TextInput,
  },
  {
    label: 'Last Name',
    onChange: (error, value) => {
      if (value != null) {
        patient.setLastName(value);
      }
    },
    type: TextInput,
  },
  {
    label: 'Date of Birth',
    onChange: (error, value) => {
      patient.setDob(value);
    },
    type: TextInput,
    tooltip: 'MM/dd/yyyy',
  },
  {
    type: Select,
    label: 'Gender',
    options: genderOptions,
    onSelect: (error, selectedOption) => {
      patient.setGender(genderOptions[selectedOption]);
    },
  },
  {
    label: 'Telephone',
    onChange: (error, value) => {
      patient.setTelephone(value);
    },
    type: Telephone,
    tooltip: 'XXX-XXX-XXXX',
  },
  {
    label: 'Email',
    onChange: (error, value) => {
      patient.setEmail(value);
    },
    type: Email,
  },
  {
    label: 'Visit Reason',
    onChange: (error, value) => {
      patient.setVisitReason(value);
    },
    type: TextInput,
  },
  {
    label: 'Appointment Date',
    onChange: (error, value) => {
      patient.setAppointmentDate(value);
    },
    tooltip: 'MM/dd/yyyy',
    type: TextInput,
  },
  {
    label: 'Appointment Time',
    onChange: () => {
      patient.setAppointmentTime();
    },
    type: TextInput,
  },
  {
    label: 'Submit',
    onClick: async () => {
      try {
        const error = patient.validate();
        if (error) {
          console.error(error);

          return;
        }

        if (await patient.isAlreadyExist()) {
          console.error(new Error(`Patient already exist`));

          return;
        }

        await patient.store();

        formWhisper.close();
      } catch (error) {
        console.error(error);
      }
    },
    type: Button,
  },
];

export const start = async () => {
  await keyboard.listenHotkey(hotkeys, async (pressed) => {
    if (pressed) {
      const patient = new Patient({});

      console.log('Creating form whisper');
      formWhisper = await whisper.create({
        label: 'Universal Example Loop - Form Whisper',
        onClose: () => {
          console.log('Closed Form whisper');
        },
        components: getPatientFormWhisperComponents(patient),
      });
    }
  });
};
