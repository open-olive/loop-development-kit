import { clipboard, whisper, keyboard } from '@oliveai/ldk'
const { TextInput, Telephone,Checkbox, ListPair, Email, Button} = whisper.WhisperComponentType; 

const hotkeys = {
    key: 'n',
    control: true,
  };

var patient ={ 
  firstName,
  lastName,
  dob,
  gender?,
  telephone,
  email?,
  visitReason?,
  appointmentDate,
  appointmentTime
};

function listenHotKey(){
    keyboard.listenHotkey(hotkeys,(pressed) => {
        whisper.create({
            label: 'Consolidate Loop - Form Whisper',
            onClose: () => {
              console.log('closed Results');
            },
            components: [
              {
                label: 'First Name',
                value: patient.firstName,
                onChange: () => console.log('onChange'),
                type: TextInput,
              },
              {
              label: 'Last Name',
              value: patient.lastName,
              onChange: () => console.log('onChange'),
              type: TextInput,
              },
              {
                label: 'Date of Birth',
                value: patient.dob,
                onChange: () => console.log('onChange'),
                type: TextInput,
              },
              {
                label: 'Gender',
                value?: patient.gender,
                onChange: () => console.log('onChange'),
                type: TextInput,
              },
              {
                label: 'Telephone',
                value: patient.telephone,
                onChange: () => console.log('onChange'),
                type: Telephone,
              },
              {
                label: 'Email',
                value?: patient.email,
                onChange: () => console.log('onChange'),
                type: Email,
              },
              {
                label: 'Visit Reason',
                value? : patient.visitReason,
                onChange: () => console.log('onChange'),
                type: TextInput,
              },
              {
                label: 'Appointment Date',
                value: patient.appointmentDate,
                onChange: () => console.log('onChange'),
                type: TextInput,
              },
              {
                label: 'Appointment Time',
                value: appointmentTime,
                onChange: () => console.log('onChange'),
                type: TextInput,
              },
              {
                label: 'Submit',
                onClick: () => console.log('onClick'),
                type: Button,
              }
            ],
          })
        })
    };
    
    listenHotKey();

    // function validateForm()
    // {
      
    //   Date.parse(patient.dob);
    //   Date.parse(patient.appointmentDate);
    // }

