/* eslint-disable prefer-const */
import { whisper, keyboard, filesystem, network } from '@oliveai/ldk';
import Patient from './Patient';

const { TextInput, Telephone, Email, Button } = whisper.WhisperComponentType;

const hotkeys = {
  key: 'n',
  control: true,
};

export default function listenHotKey() {
  keyboard.listenHotkey(hotkeys, async () => {
    let instance = null;

    // eslint-disable-next-line prefer-const
    let patient = new Patient();
    instance = await whisper.create({
      label: 'Consolidate Loop - Form Whisper',
      onClose: () => {
        console.log('closed Results');
      },
      components: [
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
          label: 'Gender',
          onChange: (error, value) => {
            patient.setGender(value);
          },
          type: TextInput,
          tooltip: 'Male, Female, Other or Prefer not to say',
        },
        {
          label: 'Telephone',
          onChange: (error, value) => {
            patient.setTelephone(value);
          },
          type: Telephone,
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
              patient.verify();
            } catch (e) {
              console.error(e);
              return;
            }

            let cred1 = `${patient.firstName}:${patient.lastName}:${patient.dob}`;
            let cred2 = patient.email;
            let patientRecord = `|${patient.serialize()}`;

            const found = await new Promise((resolve) => {
              filesystem
                .readFile('./PatientInfo.txt')
                .then((data) => {
                  network.decode(data).then((decodedRecord) => {
                    console.log('Decoded: ', decodedRecord);
                    resolve(!!`${decodedRecord}`.match(cred1) || !!`${decodedRecord}`.match(cred2));
                  });
                })
                .catch(console.error);
            });

            if (found) {
              throw new Error(`patient already exist: ${cred1}:${cred2}`);
            }
            network.encode(patientRecord).then((encodedValue) => {
              console.log('ENCODED: ', encodedValue);
              filesystem
                .writeFile({
                  path: './PatientInfo.txt',
                  data: encodedValue,
                  writeOperation: filesystem.WriteOperation.append,
                  writeMode: 0o744,
                })
                .then(() => {
                  console.log('Successfully saved patient record');
                })
                .catch(console.error);
            });
            instance.close();
          },
          type: Button,
        },
      ],
    });
  });
}
