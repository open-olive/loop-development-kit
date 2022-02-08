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

export interface PDFValue {
  value: string;
  type: 'text' | 'newLine';
}

export interface PDFOutput {
  [key: string]: {
    content: PDFValue[];
  };
}
