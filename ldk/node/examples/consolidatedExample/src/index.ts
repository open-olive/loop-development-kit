import validator from 'validator';

import { HostServices, Logger, Loop, serveLoop } from '../../../dist';
import {
  WhisperFormSubmitEvent,
  WhisperFormUpdateEvent,
  WhisperDisambiguationElements,
} from '../../../dist/hostClients/whisperService';

import formConfig from './formConfig';
import listConfig from './listConfig';

const logger = new Logger('olive-helps-node-example');

interface DisambiguationElement {
  [key: string]: WhisperDisambiguationElements;
}

interface PatientData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  visitReason?: string;
  appointmentDate: string;
  appointmentTime: string;
}

class ConsolidatedExample implements Loop {
  private _host: HostServices | undefined;

  start(host: HostServices): void {
    this._host = host;
    logger.info('Requesting Stream');

    this.startHotkeySensor();
    this.startGlobalSearchSensor();
  }

  validateForm(submitEvent: WhisperFormSubmitEvent): string {
    let errorString = '';
    const dateRegex = new RegExp(
      '^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$',
    );
    const phoneRegex = new RegExp('^(1-)?\\d{3}-\\d{3}-\\d{4}$');
    const militaryTimeRegex = new RegExp('^([01]\\d|2[0-3]):?([0-5]\\d)$');
    const { outputs } = submitEvent;

    if (!outputs.firstName || outputs.firstName.toString().length === 0) {
      errorString = errorString.concat('- First Name was required\n');
    }
    if (!outputs.lastName || outputs.lastName.toString().length === 0) {
      errorString = errorString.concat('- Last Name was required\n');
    }
    if (!outputs.dob || !dateRegex.test(outputs.dob.toString())) {
      errorString = errorString.concat('- DOB was incorrect\n');
    }
    if (!outputs.gender) {
      errorString = errorString.concat('- Gender was required\n');
    }
    if (
      !outputs.phone ||
      !phoneRegex.test(submitEvent.outputs.phone.toString())
    ) {
      errorString = errorString.concat('- Phone was incorrect\n');
    }
    if (!outputs.email || !validator.isEmail(outputs.email.toString())) {
      errorString = errorString.concat('- Email was required\n');
    }
    if (
      !outputs.appointmentDate ||
      !dateRegex.test(outputs.appointmentDate.toString())
    ) {
      errorString = errorString.concat('- Appointment Date was incorrect\n');
    }
    if (
      !outputs.appointmentTime ||
      !militaryTimeRegex.test(outputs.appointmentTime.toString())
    ) {
      errorString = errorString.concat('- Appointment Time was incorrect\n');
    }

    return errorString.trimEnd();
  }

  startHotkeySensor(): void {
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
          logger.error(error);
        } else {
          this.host.whisper.formWhisper(formConfig, (e, formResponse) => {
            if (e !== null) {
              // Error occured
            }

            if (typeof formResponse === 'undefined') {
              logger.info('Form response error');
            }

            const updateEvent = formResponse as WhisperFormUpdateEvent;
            const submitEvent = formResponse as WhisperFormSubmitEvent;

            if (updateEvent.type === 'update') {
              // do nothing for now
              // logger.info('update Occurred');
              // logger.info(JSON.stringify(updateEvent));
            } else if (submitEvent.type === 'submit' && submitEvent.submitted) {
              const formErrors = this.validateForm(submitEvent);
              if (formErrors.length === 0) {
                const readHandle = this.host.fileSystem.openFile('./data.txt');

                readHandle
                  .read()
                  .then((fileContents) => {
                    const file = decoder.decode(fileContents);
                    logger.info(`${file === ''}`);
                    const fileObj = file === '' ? {} : JSON.parse(file);
                    fileObj[
                      submitEvent.outputs.email.toString()
                    ] = JSON.stringify(submitEvent.outputs);
                    logger.info(JSON.stringify(fileObj));

                    const writeHandle = this.host.fileSystem.openFile(
                      './data.txt',
                    );
                    return writeHandle.write(
                      encoder.encode(JSON.stringify(fileObj)),
                    );
                  })
                  .then(() => {
                    logger.info('success');
                  })
                  .catch((err) => {
                    logger.error(err);
                  });
              } else {
                logger.info('fail');
                this.host.whisper.markdownWhisper({
                  label: 'There was an issue with the form data',
                  markdown: formErrors,
                });
              }
            } else {
              logger.info('cancelled');
            }
          });
        }
      });
    } catch (e) {
      logger.error('Error With Keyboard Stream', 'error', e.toString());
    }
  }

  startGlobalSearchSensor(): void {
    const decoder = new TextDecoder();

    try {
      this.host.ui.streamSearchbar((error, searchTerm) => {
        if (error) {
          logger.error('Eek!');
        } else if (searchTerm) {
          // TODO: Right now, requires pressing enter twice, see SIDE-1597
          const readHandle = this.host.fileSystem.openFile('./data.txt');
          readHandle
            .read()
            .then((fileContents) => {
              const file = decoder.decode(fileContents);
              const fileObj = file === '' ? {} : JSON.parse(file);
              const patientKeys = Object.keys(fileObj);
              logger.info(patientKeys.toString());
              const searchHits: PatientData[] = [];

              for (let i = 0; i < patientKeys.length; i += 1) {
                const patientData = JSON.parse(fileObj[patientKeys[i]]);
                if (this.isPatientDataASearchHit(patientData, searchTerm)) {
                  searchHits.push(patientData);
                }
              }

              if (searchHits.length === 1) {
                this.openListWhisper(searchHits[0]);
              } else if (searchHits.length > 1) {
                this.openDisambiguationWhisper(searchHits);
              }
            })
            .catch((err) => {
              logger.error(err);
            });
        } else {
          logger.info('No output');
        }
      });
    } catch (e) {
      logger.error('Error With Search Bar', 'error', e.toString());
    }
  }

  openListWhisper(patientData: PatientData): void {
    try {
      this.host.whisper.listWhisper(listConfig(patientData));
    } catch (e) {
      logger.error('Error With List Whisper', 'error', e.toString());
    }
  }

  openDisambiguationWhisper(searchHits: PatientData[]): void {
    const maxLength = searchHits.length > 5 ? 5 : searchHits.length;
    const configObj = {} as DisambiguationElement;

    for (let i = 0; i < maxLength; i += 1) {
      const patientData = searchHits[i];
      logger.info(typeof patientData);
      const s = `${i}`;
      configObj[s] = {
        label: `Appointment for ${patientData.firstName} ${patientData.lastName} on ${patientData.appointmentDate}`,
        order: i,
        type: 'option',
      };
    }

    try {
      const whisper = this.host.whisper.disambiguationWhisper(
        {
          label: `Possible Search Hits`,
          markdown: '',
          elements: configObj,
        },
        (error, response) => {
          if (error) {
            logger.error(error);
          }

          if (response?.key) {
            const patientData = searchHits[parseInt(response.key, 10)];
            this.openListWhisper(patientData);
            whisper.stop();
          }
        },
      );
    } catch (e) {
      logger.error(
        'Error With Disambiguation whisper Whisper',
        'error',
        e.toString(),
      );
    }
  }

  isPatientDataASearchHit(patientData: any, searchTerm: string): boolean {
    let isHit = false;
    if (
      patientData.firstName === searchTerm ||
      patientData.lastName === searchTerm ||
      `${patientData.firstName} ${patientData.lastName}` === searchTerm ||
      patientData.dob === searchTerm ||
      patientData.phone === searchTerm ||
      patientData.appointmentDate === searchTerm
    ) {
      isHit = true;
    }

    return isHit;
  }

  stop(): void {
    logger.info('Stopping');
    this._host = undefined;
    process.exit(0);
  }

  private get host(): HostServices {
    if (this._host == null) {
      throw new Error('Cannot Retrieve Host Before Set');
    }
    return this._host;
  }
}

const loop = new ConsolidatedExample();
serveLoop(loop);
