/* eslint-disable no-async-promise-executor */
import { excel } from '@oliveai/ldk';

export const testExcelEncode = (): Promise<boolean> =>
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
      const stringData = new TextDecoder().decode(uint8ArrayData);

      if (stringData === 'value') {
        resolve(true);
      } else {
        reject(new Error(`Excel function  ${excel.encode} failed.`));
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testExcelDecode = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Excel decode did not finish in the appropriate time span.'));
    }, 5000);

    try {
      const expectedWorkbook: excel.Workbook = {
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

      const encodedValue = new TextEncoder().encode('value');
      const workbook = await excel.decode(encodedValue);

      if (expectedWorkbook === workbook) {
        resolve(true);
      } else {
        reject(new Error(`Excel function  ${excel.decode} failed.`));
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
