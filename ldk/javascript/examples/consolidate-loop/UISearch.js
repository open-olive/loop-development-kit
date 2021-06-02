/* eslint-disable no-return-assign */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { ui, whisper, filesystem, network } from '@oliveai/ldk';
import Patient from './Patient';

const { Message, Link } = whisper.WhisperComponentType;

function SearchResultWhisper(rows) {
  let result = [];
  console.log(result);
  rows.forEach((row) => {
    result.push({
      text: `${row.firstName} ${row.lastName} ${row.email}`,
      onClick: () => {
        console.log(row.serialize());

        whisper.create({
          label: 'Consolidate Loop - Patient Search Result',
          onClose: () => {
            console.log('Patient Search Result');
          },
          components: [
            {
              header: `${row.firstName} ${row.lastName}`,
              body: row.patientInfo.reduce(
                (rst, k) => `
${rst}
${k}:   ${row[k]}
                            `,
                '',
              ),
              type: Message,
            },
          ],
        });
      },
      type: Link,
    });
  });
  return whisper.create({
    label: 'Consolidate Loop - Patient Search Result',
    onClose: () => {
      console.log('Patient Search Result');
    },
    components: result,
  });
}

export default () =>
  new Promise(async () => {
    var uiStream;

    const patients = await new Promise((resolve) => {
      filesystem
        .readFile('./PatientInfo.txt')
        .then((data) => {
          network.decode(data).then((decodedData) => {
            let pList = [];
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
                pList.push(newPatient);
              }
            });
            resolve(pList);
          });
        })
        .catch(console.error);
    });

    ui.listenSearchbar((value) => {
      let rows = [];
      patients.forEach((p) => {
        if (p.getSearchCred().includes(value)) {
          rows.push(p);
        }
      });

      SearchResultWhisper(rows);
    }).then((cancellable) => (uiStream = cancellable));
  });
