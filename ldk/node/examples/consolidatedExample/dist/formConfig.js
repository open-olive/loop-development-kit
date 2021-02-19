"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formConfig = {
    submitButton: 'Submit',
    cancelButton: 'Cancel',
    label: 'Form Whisper Test',
    markdown: 'Scheduling',
    inputs: {
        firstName: {
            type: 'text',
            value: '',
            label: 'First Name',
            tooltip: '',
            order: 1,
        },
        lastName: {
            type: 'text',
            value: '',
            label: 'Last Name',
            tooltip: '',
            order: 2,
        },
        dob: {
            type: 'text',
            value: '',
            label: 'DOB',
            tooltip: 'MM/DD/YYYY',
            order: 3,
        },
        gender: {
            type: 'select',
            value: '',
            label: 'Gender',
            tooltip: '',
            order: 4,
            options: ['Male', 'Female', 'Other'],
        },
        phone: {
            type: 'text',
            value: '',
            label: 'Phone Number',
            tooltip: 'XXX-XXX-XXXX',
            order: 5,
        },
        email: {
            type: 'text',
            value: '',
            label: 'Email',
            tooltip: '',
            order: 6,
        },
        visitReason: {
            type: 'text',
            value: '',
            label: 'Visit Reason',
            tooltip: '',
            order: 7,
        },
        appointmentDate: {
            type: 'text',
            value: '',
            label: 'Appointment Date',
            tooltip: 'MM/DD/YYYY',
            order: 7,
        },
        appointmentTime: {
            type: 'text',
            value: '',
            label: 'Appointment Time',
            tooltip: 'HH:MM',
            order: 8,
        },
    },
};
exports.default = formConfig;
