import { whisper, keyboard, filesystem, network } from '@oliveai/ldk';
import Patient from './Patient';

const { TextInput, Telephone, Email, Button, Select } = whisper.WhisperComponentType;
const hotkeys = {
  key: 'n',
  control: true,
};
const genderOptions = ['Prefer not to say', 'Male', 'Female', 'Other'];
const patientInfoFileName = 'PatientInfo.txt';
let formWhisper = null;

export const start = async () => {
  await keyboard.listenHotkey(hotkeys, async (pressed) => {
    if (pressed) {
      let patient = new Patient({});

      console.log('creating form whisper');
      formWhisper = await whisper.create({
        label: 'Consolidate Loop - Form Whisper',
        onClose: () => {
          console.log('Closed Form whisper');
        },
        components: getPatientFormWhisperComponents(patient),
      });
    }
  });
};

const isPatientAlreadyExist = async (patient) => {
  let cred1 = `${patient.firstName}:${patient.lastName}:${patient.dob}`;
  let cred2 = patient.email;

  const patientInfo = await getPatientInfo();

  return !!`${patientInfo}`.match(cred1) || !!`${patientInfo}`.match(cred2);
};

const getPatientInfo = async () => {
  if (await filesystem.exists(patientInfoFileName)) {
    const data = await filesystem.readFile(patientInfoFileName);
    return await network.decode(data);
  } else {
    await filesystem.writeFile({
      path: patientInfoFileName,
      data: '',
      writeOperation: filesystem.WriteOperation.overwrite,
      writeMode: 0o744,
    });
    return '';
  }
};

const getPatientFormWhisperComponents = (patient) => {
  return [
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

          const exists = await isPatientAlreadyExist(patient);
          if (exists) {
            console.error(new Error(`patient already exist`));

            return;
          }

          storePatient(patient);

          formWhisper.close();
        } catch (error) {
          console.error(error);
        }
      },
      type: Button,
    },
  ];
};

const storePatient = async (patient) => {
  const patientRecord = `|${patient.serialize()}`;
  const encodedValue = await network.encode(patientRecord);
  await filesystem.writeFile({
    path: patientInfoFileName,
    data: encodedValue,
    writeOperation: filesystem.WriteOperation.append,
    writeMode: 0o744,
  });

  console.log('Successfully saved patient record');
}
