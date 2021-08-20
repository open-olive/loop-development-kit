/* eslint-disable no-async-promise-executor */
import { excel } from '@oliveai/ldk';

export const testXLSXEncodeAndDecode = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const workbook: excel.Workbook = {
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
      reject(new Error('Excel encode did not finish in the appropriate time span.'));
    }, 5000);

    try {
      const uint8ArrayData = await excel.encode(workbook);
      const actual = await excel.decode(uint8ArrayData);
      const cellData = actual.worksheets[0].rows[0].cells[0].value;

      if (cellData === 'value') {
        resolve(true);
      } else {
        reject(new Error(`Excel function  ${excel.encode} and ${excel.decode} failed.`));
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
