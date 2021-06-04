import { filesystem, network } from '@oliveai/ldk';

class Patient {
  constructor({
    firstName,
    lastName,
    dob,
    gender,
    telephone,
    email,
    visitReason,
    appointmentDate,
    appointmentTime,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.gender = gender;
    this.telephone = telephone;
    this.email = email;
    this.visitReason = visitReason;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
  }

  patientInfo = [
    'firstName',
    'lastName',
    'dob',
    'gender',
    'telephone',
    'email',
    'visitReason',
    'appointmentDate',
    'appointmentTime',
  ];

  validate() {
    if (!this.firstName) {
      return new Error('firstName is required');
    }
    if (!this.lastName) {
      return new Error('lastName is required');
    }
    if (!this.telephone) {
      return new Error('telephone number is required');
    }
    if (!this.email) {
      return new Error('email is required');
    }
    if (!this.appointmentDate) {
      return new Error('appointmentDate is required');
    }

    return undefined;
  }

  async store() {
    const patientInfoFileName = 'PatientInfo.txt';
    const patientRecord = `|${this.serialize()}`;
    const encodedValue = await network.encode(patientRecord);
    await filesystem.writeFile({
      path: patientInfoFileName,
      data: encodedValue,
      writeOperation: filesystem.WriteOperation.append,
      writeMode: 0o744,
    });

    console.log('Successfully saved patient record');
  }

  async isAlreadyExist() {
    let cred1 = `${this.firstName}:${this.lastName}:${this.dob}`;
    let cred2 = this.email;

    const patientInfo = await this.getPatientInfo();

    return !!`${patientInfo}`.match(cred1) || !!`${patientInfo}`.match(cred2);
  }

  async getPatientInfo() {
    const patientInfoFileName = 'PatientInfo.txt';
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
  }

  serialize() {
    return [
      this.firstName,
      this.lastName,
      this.dob,
      this.gender,
      this.telephone,
      this.email,
      this.visitReason,
      this.appointmentDate,
      this.appointmentTime,
    ]
      .map((x) => x || '')
      .join(':');
  }

  getSearchCred() {
    return `${this.firstName} ${this.lastName}:${this.email}:${this.appointmentDate}:${this.appointmentTime}`;
  }

  setFirstName(val) {
    this.firstName = val;
  }

  setLastName(val) {
    this.lastName = val;
  }

  setDob(val) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (!regex.test(val)) {
      this.dob = null;
      console.error(new Error('date of birth must be as follow format: MM/DD/YYYY'));
    }
    this.dob = val;
  }

  setGender(val) {
    const genderList = ['Male', 'Female', 'Other', 'Prefer not to say'];
    if (!genderList.includes(val)) {
      console.error(
        new Error('gender need to be “Male”, “Female”, "Other" or "Prefer not to say"'),
      );
    }
    this.gender = val;
  }

  setTelephone(val) {
    const regexPhoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!regexPhoneNumber.test(val)) {
      this.telephone = null;
      console.error(
        new Error('Please enter validated number in the following format: XXX-XXX-XXXX '),
      );
    }
    this.telephone = val;
  }

  setEmail(val) {
    this.email = val;
  }

  setVisitReason(val) {
    this.visitReason = val;
  }

  setAppointmentDate(val) {
    this.appointmentDate = val;
  }

  setAppointmentTime(val) {
    this.appointmentTime = val;
  }
}

export default Patient;
