/* eslint-disable no-async-promise-executor */
import { xlsx } from '@oliveai/ldk';

export const testXLSXEncodeAndDecode = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const workbook: xlsx.Workbook = {
      worksheets: [
        {
          hidden: false,
          hiddenColumns: [],
          hiddenRows: [],
          name: 'name',
          rows: [{ cells: [{ value: 'value' }] }],
        },
      ],
    };
    setTimeout(() => {
      reject(new Error('XLSX encode did not finish in the appropriate time span.'));
    }, 5000);

    try {
      const uint8ArrayData = await xlsx.encode(workbook);
      const actual = await xlsx.decode(uint8ArrayData);
      const cellData = actual.worksheets[0].rows[0].cells[0].value;

      if (cellData === 'value') {
        resolve(true);
      } else {
        reject(new Error(`XLSX function  ${xlsx.encode} and ${xlsx.decode} failed.`));
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
