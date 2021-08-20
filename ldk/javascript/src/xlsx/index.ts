import { promisifyWithParam } from '../promisify';

export interface XLSX {
  /**
   * Encodes a workbook object into XLSX data
   * @param  - Workbook object
   * @returns - A promise containing XLSX data.
   */
  encode(workbook: Workbook): Promise<Uint8Array>;

  /**
   * Decodes XLSX data into a workbook object.
   * @param  - ArrayBuffer data
   * @returns - A promise containing Workbook.
   */
  decode(data: Uint8Array): Promise<Workbook>;
}

export function encode(workbook: Workbook): Promise<Uint8Array> {
  return promisifyWithParam(workbook, oliveHelps.xlsx.encode);
}

export function decode(data: Uint8Array): Promise<Workbook> {
  return promisifyWithParam(data, oliveHelps.xlsx.decode);
}

export interface Workbook {
  worksheets: Worksheet[];
}

export interface Worksheet {
  hidden: boolean;
  hiddenColumns: number[];
  hiddenRows: number[];
  name: string;
  rows: Row[];
}

export interface Row {
  cells: Cell[];
}

export interface Cell {
  value: string;
}
