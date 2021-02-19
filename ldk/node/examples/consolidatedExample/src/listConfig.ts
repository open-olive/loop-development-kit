const listConfig = (patientData: any): any => {
  const value = {
    label: `Appointment for ${patientData.firstName} ${patientData.LastName} on ${patientData.appointmentDate}`,
    markdown: '',
    elements: {
      name: {
        value: `${patientData.firstName} ${patientData.lastName}`,
        label: 'Name',
        order: 1,
        type: 'pair',
      },
      dob: {
        value: patientData.dob,
        label: 'Dob',
        order: 2,
        type: 'pair',
      },
      gender: {
        value: patientData.gender,
        label: 'Gender',
        order: 3,
        type: 'pair',
      },
      phone: {
        value: patientData.phone,
        label: 'Phone Number',
        order: 4,
        type: 'pair',
      },
      email: {
        value: patientData.email,
        label: 'Email',
        order: 5,
        type: 'pair',
      },
      visitReason: {
        value: patientData.visitReason,
        label: 'Visit Reason',
        order: 6,
        type: 'pair',
      },
      appointmentDate: {
        value: patientData.appointmentDate,
        label: 'Appointment Date',
        order: 7,
        type: 'pair',
      },
      appointmentTime: {
        value: patientData.appointmentTime,
        label: 'Appiontment Time',
        order: 8,
        type: 'pair',
      },
    },
  };

  return value;
};

export default listConfig;
