import * as React from 'react';
import { ui, filesystem, network } from '@oliveai/ldk';
import * as Renderer from '@oliveai/ldk/dist/whisper/react/renderer';
import * as PropTypes from 'prop-types';
import { Patient, patientInfoFileName } from './Patient';

const PatientDisplayWhisper = (props) => {
  const patient = props.patient;
  const messageBody = patient.patientInfo.reduce(
    (rst, currentValue) => `
${rst}
${currentValue[1]}:   ${patient[currentValue[0]]}
                            `,
    '',
  );
  const messageHeader = `${props.firstName} ${props.lastName}`;
  return (
    <oh-whisper
      label="Universal Example Loop - Patient Search Result"
      onClose={() => {
        console.log('Patient Search Result is closed');
      }}
    >
      <oh-message header={messageHeader} body={messageBody} />
    </oh-whisper>
  );
};

PatientDisplayWhisper.propTypes = {
  patient: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    patientInfo: PropTypes.array.isRequired,
  }).isRequired,
};

const SearchResultWhisper = (props) => {
  const patientRows = props.patients.map((patient) => {
    const onClick = () => {
      props.onShowPatient(patient);
    };
    const text = `${patient.firstName} ${patient.lastName} ${patient.email}`;
    return <oh-link onClick={onClick} text={text} />;
  });
  return (
    <oh-whisper label="Universal Example Loop - Patient Search Result" onClose={() => {}}>
      {patientRows.length > 0 ? (
        patientRows
      ) : (
        <oh-markdown body="No results were found matching criteria" />
      )}
    </oh-whisper>
  );
};

SearchResultWhisper.propTypes = {
  patients: PropTypes.arrayOf({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onShowPatient: PropTypes.func.isRequired,
};

const emitResultWhisper = async (patients) => {
  const onShowPatient = (patient) =>
    Renderer.renderNewWhisper(<PatientDisplayWhisper patient={patient} />);
  await Renderer.renderNewWhisper(
    <SearchResultWhisper patients={patients} onShowPatient={onShowPatient} />,
  );
};

const getPatients = async () => {
  const patients = [];
  try {
    if (!filesystem.exists(patientInfoFileName)) {
      console.warn('No patients file exists');
      return patients;
    }

    const data = await filesystem.readFile(patientInfoFileName);
    const decodedData = await network.decode(data);
    decodedData.split('|').forEach((row) => {
      if (row) {
        const splitRow = row.split(':');
        const newPatient = new Patient({
          firstName: splitRow[0],
          lastName: splitRow[1],
          dob: splitRow[2],
          gender: splitRow[3],
          telephone: splitRow[4],
          email: splitRow[5],
          visitReason: splitRow[6],
          appointmentDate: splitRow[7],
          appointmentTime: splitRow[8],
        });
        patients.push(newPatient);
      }
    });

    return patients;
  } catch (error) {
    console.error(error);
  }

  return patients;
};

export const start = async () => {
  await ui.listenSearchbar(async (value) => {
    const rows = [];
    const patients = await getPatients();
    patients.forEach((p) => {
      if (p.getSearchCred().includes(value)) {
        rows.push(p);
      }
    });

    await emitResultWhisper(rows);
  });
};
