enum PDFContentType {
  Text = 'text',
  NewLine = 'newLine',
}

declare namespace Document {
  interface Aptitude {
    xlsxDecode: Common.ReadableWithParam<Array<number>, Workbook>;
    xlsxEncode: Common.ReadableWithParam<Workbook, ArrayBuffer>;
    readPDF: Common.ReadableWithParam<Array<number>, PDFOutput>;
  }

  interface Workbook {
    worksheets: Worksheet[];
  }

  interface Worksheet {
    hidden: boolean;
    hiddenColumns: number[];
    hiddenRows: number[];
    name: string;
    rows: Row[];
  }

  interface Row {
    cells: Cell[];
  }

  interface Cell {
    value: string;
  }

  interface PDFValue {
    value: string;
    type: PDFContentType;
  }

  interface PDFOutput {
    [key: string]: {
      content: PDFValue[];
    };
  }
}
