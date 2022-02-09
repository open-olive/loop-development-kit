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
}

export interface PDFValue {
  Value: string;
  Type: PDFContentType;
}

export interface PDFOutput {
  [key: string]: {
    Content: PDFValue[];
  };
}
