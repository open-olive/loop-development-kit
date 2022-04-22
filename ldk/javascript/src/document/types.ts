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
  PhotoText = 'photoText',
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
