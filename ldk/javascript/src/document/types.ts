import { OCRResult } from '../screen';

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

export enum PDFContentType {
  Text = 'text',
  NewLine = 'newLine',
  Photo = 'photo',
}

export interface PDFValue {
  value: string;
  type: PDFContentType;
}

export interface PDFOutput {
  [key: string]: {
    content: PDFValue[];
  };
}

export interface OCRResults {
  [key: string]: {
    ocrResult: OCRResult;
  };
}

export interface PDFOutputWithOcrResult {
  pdfOutput: PDFOutput;
  ocrResults: OCRResults;
}
