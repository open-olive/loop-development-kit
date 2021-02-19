"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../../../dist");
const formConfig_1 = __importDefault(require("./formConfig"));
const logger = new dist_1.Logger('olive-helps-node-example');
class ClipboardLoop {
    start(host) {
        this._host = host;
        logger.info('Requesting Stream');
        this.startHotkeySensor();
        this.startGlobalSearchSensor();
    }
    validateForm(submitEvent) {
        // TODO: Probably want to regex the email too.
        let errorString = '';
        const dateRegex = new RegExp('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$');
        const phoneRegex = new RegExp('^(1-)?\\d{3}-\\d{3}-\\d{4}$');
        const { outputs } = submitEvent;
        if (!outputs.firstName || outputs.firstName.toString().length === 0) {
            errorString.concat('- First Name is required\n');
        }
        if (!outputs.lasNamt || outputs.lastName.toString().length === 0) {
            errorString.concat('- Last Name is required\n');
        }
        if (!outputs.dob || !dateRegex.test(submitEvent.outputs.dob.toString())) {
            errorString.concat('- DOB was incorrect\n');
        }
        if (!outputs.gender) {
            errorString.concat('- Gender is required\n');
        }
        if (!outputs.phone || !phoneRegex.test(submitEvent.outputs.phone.toString())) {
            errorString.concat('- Phone was incorrect\n');
        }
        return dateRegex.test(submitEvent.outputs.dob.toString());
    }
    startHotkeySensor() {
        const hotkeys = {
            key: 'n',
            modifiers: {
                ctrl: true,
            },
        };
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        try {
            this.host.fileSystem.createFile('./data.txt');
            this.host.keyboard.streamHotKey(hotkeys, (error, keyboardResponse) => {
                if (error) {
                    // Error found
                }
                const form = this.host.whisper.formWhisper(formConfig_1.default, (e, formResponse) => {
                    if (e !== null) {
                        // Error occured
                    }
                    if (typeof formResponse === 'undefined') {
                        logger.info('Form response error');
                    }
                    const updateEvent = formResponse;
                    const submitEvent = formResponse;
                    if (updateEvent.type === 'update') {
                        // do nothing for now
                        // logger.info('update Occurred');
                        // logger.info(JSON.stringify(updateEvent));
                    }
                    else if (submitEvent.type === 'submit' && submitEvent.submitted) {
                        if (this.validateForm(submitEvent) && submitEvent.outputs.email) {
                            const readHandle = this.host.fileSystem.openFile('./data.txt');
                            readHandle
                                .read()
                                .then((fileContents) => {
                                const file = decoder.decode(fileContents);
                                logger.info(`${file === ''}`);
                                const fileObj = file === '' ? {} : JSON.parse(file);
                                fileObj[submitEvent.outputs.email.toString()] = JSON.stringify(submitEvent.outputs);
                                logger.info(JSON.stringify(fileObj));
                                const writeHandle = this.host.fileSystem.openFile('./data.txt');
                                return writeHandle.write(encoder.encode(JSON.stringify(fileObj)));
                            })
                                .then(() => {
                                logger.info('success');
                            })
                                .catch((err) => {
                                logger.error(err);
                            });
                        }
                        else {
                            logger.info('fail');
                            this.host.whisper.markdownWhisper({
                                label: 'There was an issue with the form data',
                                markdown: 'Please make sure that DOB is in the format MM/DD/YYYY. Please retry data entry.',
                            });
                        }
                    }
                    else {
                        logger.info('cancelled');
                    }
                });
            });
        }
        catch (e) {
            logger.error('Error With Keyboard Stream', 'error', e.toString());
        }
    }
    startGlobalSearchSensor() {
        const decoder = new TextDecoder();
        try {
            this.host.ui.streamSearchbar((error, output) => {
                if (error) {
                    logger.error('Eek!');
                }
                else if (output) {
                    logger.info(output);
                    const readHandle = this.host.fileSystem.openFile('./data.txt');
                    readHandle
                        .read()
                        .then((fileContents) => {
                        const file = decoder.decode(fileContents);
                        const fileObj = file === '' ? {} : JSON.parse(file);
                        const patientKeys = Object.keys(fileObj);
                        logger.info('Read File contents');
                        for (let i = 0; i < patientKeys.length; i += 1) {
                            const patientData = JSON.parse(fileObj[patientKeys[i]]);
                            if (patientData.firstName && patientData.firstName === output) {
                                logger.info('Golly gee');
                                this.openListWhisper(patientData);
                            }
                        }
                    })
                        .catch((err) => {
                        logger.error(err);
                    });
                }
                else {
                    logger.info('No output');
                }
            });
        }
        catch (e) {
            logger.error('Error With Search Bar', 'error', e.toString());
        }
    }
    openListWhisper(patientData) {
        try {
            this.host.whisper.listWhisper({
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
            });
        }
        catch (e) {
            logger.error('Error With List Whisper', 'error', e.toString());
        }
    }
    stop() {
        var _a;
        logger.info('Stopping');
        (_a = this.clipboardStream) === null || _a === void 0 ? void 0 : _a.stop();
        this.clipboardStream = undefined;
        this._host = undefined;
        process.exit(0);
    }
    get host() {
        if (this._host == null) {
            throw new Error('Cannot Retrieve Host Before Set');
        }
        return this._host;
    }
}
const loop = new ClipboardLoop();
dist_1.serveLoop(loop);
