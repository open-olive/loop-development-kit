/* eslint-disable no-async-promise-executor */
import { document } from '@oliveai/ldk';
import { Workbook } from '@oliveai/ldk/dist/document/types';

export const testDocumentEncodeAndDecode = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const workbook: Workbook = {
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
      const uint8ArrayData = await document.xlsxEncode(workbook);
      const actual = await document.xlsxDecode(uint8ArrayData);
      const cellData = actual.worksheets[0].rows[0].cells[0].value;

      if (cellData === 'value') {
        resolve(true);
      } else {
        reject(
          new Error(`XLSX function  ${document.xlsxEncode} and ${document.xlsxDecode} failed.`),
        );
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
