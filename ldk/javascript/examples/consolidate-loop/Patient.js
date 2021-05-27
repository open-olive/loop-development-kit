class Patient {
    constructor(firstName, lastName, dob, gender, telephone, email, visitReason, appointmentDate, appointmentTime){
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

    patientInfo = [
        '_firstName',
        '_lastName',
        '_dob',
        '_gender',
        '_telephone',
        '_email',
        '_visitReason',
        '_appointmentDate',
        '_appointmentTime'
    ]

    verify() {
        if (!this._firstName) {
            throw new Error('firstName is required')
        }
        if (!this._lastName) {
            throw new Error('lastName is required')
        }
        if (!this._email) {
            throw new Error('email is required')
        }
        if (!this._appointmentDate) {
            throw new Error('appointmentDate is required')
        }
    }

    seralize() {
        let patientRecord = ``
        this.patientInfo.forEach((k, i) => {
    
          if (i !== 0) {
            patientRecord += ':'
          }
          patientRecord += this[k] || ''
        })
        return patientRecord
    }

    getSearchCred () {
        return `${this._firstName} ${this._lastName}:${this._email}:${this._appointmentDate}:${this._appointmentTime}`
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

export default Patient