import { promisifyWithParam } from '../promisify';
import { Workbook } from './types';
/**
 *  Document aptitude allows Loops to enable basic parsing of files including XLSX.
 */
export interface Document {
  /**
   * Encodes a workbook object into XLSX data
   * @param  - Workbook object
   * @returns - A promise containing Uint8Array XLSX data.
   */
  xlsxEncode(workbook: Workbook): Promise<Uint8Array>;

  /**
   * Decodes XLSX data into a workbook object.
   * @param  - Uint8Array XLSX data
   * @returns - A promise containing Workbook.
   */
  xlsxDecode(data: Uint8Array): Promise<Workbook>;
}

export function xlsxEncode(workbook: Workbook): Promise<Uint8Array> {
  return promisifyWithParam(workbook, oliveHelps.document.xlsxEncode);
}

export function xlsxDecode(data: Uint8Array): Promise<Workbook> {
  return promisifyWithParam(data, oliveHelps.document.xlsxDecode);
}
