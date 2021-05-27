import { clipboard, whisper, keyboard, filesystem, network } from '@oliveai/ldk'
import Patient from './Patient'

const { TextInput, Telephone,Checkbox, ListPair, Email, Button} = whisper.WhisperComponentType; 

      const hotkeys = {
        key: 'n',
        control: true,
      };

    export default function listenHotKey(){
        keyboard.listenHotkey(hotkeys,async (pressed) => {
          let instance = null

          let patient = new Patient();
          instance = await whisper.create({
                label: 'Consolidate Loop - Form Whisper',
                onClose: () => {
                  console.log('closed Results');
                },
                components: [
                  {
                    label: 'First Name',
                    onChange: (error,value) =>
                    {
                        if (value != null )
                        {
                            patient.setFirstName(value);
                            
                        }
                        console.log(value, patient._firstName);
                    } ,
                    type: TextInput,
                  },
                  {
                  label: 'Last Name',
                  onChange: (error,value) => 
                //   onChange: (error, value) => {
                //     if (value === 'Stonks') {
                //       form.close((error) => console.error(error));
                //       resolve(true);
                //     }
                  {
                    if (value != null )
                    {
                        patient.setLastName(value);
                    }
                },
                  type: TextInput,
                  },
                  {
                    label: 'Date of Birth',
                    onChange: (error,value) => 
                    {
                      patient.setDob(value);
                    },
                    type: TextInput,
                    tooltip: "MM/dd/yyyy",
                  },
                  {
                    label: 'Gender',
                    onChange: (error,value) => 
                    {
                        patient.setGender(value);
                    },
                    type: TextInput,
                  },
                  {
                    label: 'Telephone',
                    onChange: (error,value) => 
                    {
                        patient.setTelephone(value);
                    },
                    type: Telephone,
                  },
                  {
                    label: 'Email',
                    onChange: (error,value) =>
                    {
                        patient.setEmail(value);
                    },
                    type: Email,
                  },
                  {
                    label: 'Visit Reason',
                    onChange: (error,value) => 
                    {
                        patient.setVisitReason(value);
                    },
                    type: TextInput,
                  },
                  {
                    label: 'Appointment Date',
                    onChange: (error,value) => 
                    {
                        patient.setAppointmentDate(value);
                    },
                    type: TextInput,
                  },
                  {
                    label: 'Appointment Time',
                    onChange: (error,value) => 
                    {
                        patient.setAppointmentTime();
                    },
                    type: TextInput,
                  },
                  {
                    //TODO: close&clear the loop after clicking submit 
                    label: 'Submit',
                    onClick: async () => 
                    {
                      try {
                        patient.verify()
                      } catch (e) {
                        console.error(e)
                        return
                      }
                        // varify if having duplicated patients
                        //TODO: 2 patients have same name and dob? Id, use email/ phone number to identify. 
                      let cred1 = `${patient._firstName}:${patient._lastName}:${patient._dob}` 
                      let cred2 = patient._email
                      let patientRecord = '|' + patient.seralize()
                      // this._firstName = firstName;
                      // this._lastName = lastName;
                      // this._dob = dob;
                      // this._gender = gender;
                      // this._telephone = telephone;
                      // this._email = email;
                      // this._visitReason = visitReason;
                      // this._appointmentDate = appointmentDate;
                      // this._appointmentTime = appointmentTime;

                      const found = await new Promise((resolve, reject) => {

                        filesystem.readFile("./PatientInfo.txt").then((data) => {
                            network.decode(data).then((decodedRecord) => {
                              console.log('Decoded: ' , decodedRecord)
                              resolve((!!(''+decodedRecord).match(cred1) || !!(''+decodedRecord).match(cred2)))
                            })
                        }).catch(console.error)
                    })

                    if (found) {
                      throw new Error(`patient already exist: ${cred1}:${cred2}`)
                    }

                      //const str = patientRecord;
                      network
                        .encode(patientRecord)
                        .then((encodedValue) => {
                          console.log('ENCODED: ', encodedValue)
                          setTimeout(() => {
                            filesystem.writeFile({
                              path: "./PatientInfo.txt",
                              data: encodedValue,
                              writeOperation: filesystem.WriteOperation.append,
                              writeMode: 0o744
                            }).then(() => {
                                console.log("filesystem.writeFile callback")
                            }).catch(console.error)
                          })
                        })
                      instance.close && instance.close()
                    },
                    
                    //console.log(patient._firstName, patient._lastName, patient._dob),
                    //onClick: () => validateForm(),
                    type: Button,
                  }
                ],
              })
            })
        }; 
        // function validateForm() {
        //     if (firstName) {
        //       alert("Name must be filled out");
        //       return false;
        //     }