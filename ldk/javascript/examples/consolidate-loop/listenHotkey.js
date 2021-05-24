import { clipboard, whisper, keyboard, filesystem } from '@oliveai/ldk'
    const { TextInput, Telephone,Checkbox, ListPair, Email, Button} = whisper.WhisperComponentType; 
    
    const hotkeys = {
        key: 'n',
        control: true,
      };

      class Patient{
        constructor(firstName, lastName,dob, gender, telephone, email, visitReason, appointmentDate, appointmentTime){
        this._firstName = firstName;
        this._lastName = lastName;
        this._dob = dob;
        this._gender = gender;
        this._telephone = telephone;
        this._email = email;
        this._visitReason = visitReason;
        this._appointmentDate = appointmentDate;
        this._appointmentTime = appointmentTime;
        }

        //TODO: 
        setFirstName(val) {
          this._firstName = val
        }
        setLastName(val) {
          this._lastName = val
        }
        setDob(val) {
          var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  
          //Check whether valid MM/dd/yyyy Date Format.
          if (!regex.test(val)) {
              this._dob = null;
              throw new Error('date of birth must be as follow format: MM/DD/YYYY')
          }
          this._dob = val
      }
  
        setGender(val) {
          const genderList = ["Male", "Female"]
          if (!genderList.includes(val)) {
            throw new Error("gender need to be “Male” or “Female”") 
          }
          this._gender = val
        }
        setTelephone(val) {
          this._telephone = val
        }
        setEmail(val){
          this._email = val
        }
        setVisitReason(val) {
          this._visitReason = val
        }
        setAppointmentDate(val) {
          this._appointmentDate = val
        }
        setAppointmentTime(val) {
          this._appointmentTime = val
        }
      }


    export default function listenHotKey(){
        let patient = new Patient();
        keyboard.listenHotkey(hotkeys,(pressed) => {
            whisper.create({
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
                    label: 'Submit',
                    onClick: async () => 
                    {
                        // varify if having duplicated patients
                        //TODO: 2 patients have same name and dob?
                      let cred1 = `${patient._firstName}:${patient._lastName}:${patient._dob}` 
                      let cred2 = patient._email
                      let patientRecord = `${cred1}:${cred2}`
                      
                      const found = await new Promise((resolve, reject) => {

                        filesystem.readFile("./PatientInfo.txt").then((data) => {
                            const l =  data ? Object.keys(data).length : 0
                            const codeList = []
                            for (let i=0; i < l; i++) {
                                codeList.push(data[i])
                            }

                            const str = String.fromCharCode(...codeList)

                            console.log(str);
                            resolve((!!(''+data).match(cred1) || !!(''+data).match(cred2)))
                        }).catch(console.error)
                    })

                    if (found) {
                      throw new Error(`patient already exist: ${cred1}:${cred2}`)
                    }

                      const str = patientRecord;
                      let data = []; // char codes
                      for (let i = 0; i < str.length; ++i) {
                        let code = str.charCodeAt(i);
                        data = data.concat([code]);
                      }
                      filesystem.writeFile({
                              path: "./PatientInfo.txt",
                              data,
                              writeOperation: filesystem.WriteOperation.append,
                              writeMode: 0o744
                        }).then(() => {
                          console.log("filesystem.writeFile callback")
                      }).catch(console.error)

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