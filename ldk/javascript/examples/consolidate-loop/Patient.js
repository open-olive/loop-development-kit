/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class Patient {
  constructor(
    firstName,
    lastName,
    dob,
    gender,
    telephone,
    email,
    visitReason,
    appointmentDate,
    appointmentTime,
  ) {
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

  verify() {
    if (!this.firstName) {
      throw new Error('firstName is required');
    }
    if (!this.lastName) {
      throw new Error('lastName is required');
    }
    if (!this.email) {
      throw new Error('email is required');
    }
    if (!this.appointmentDate) {
      throw new Error('appointmentDate is required');
    }
  }

  seralize() {
    let patientRecord = ``;
    this.patientInfo.forEach((k, i) => {
      if (i !== 0) {
        patientRecord += ':';
      }
      patientRecord += this[k] || '';
    });
    return patientRecord;
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
      throw new Error('date of birth must be as follow format: MM/DD/YYYY');
    }
    this.dob = val;
  }

  setGender(val) {
    const genderList = ['Male', 'Female', 'Any'];
    if (!genderList.includes(val)) {
      throw new Error('gender need to be “Male” or “Female”');
    }
    this.gender = val;
  }

  setTelephone(val) {
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
