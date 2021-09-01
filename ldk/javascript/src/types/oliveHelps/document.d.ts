declare namespace Document {
  interface Aptitude {
    xlsxDecode: Common.ReadableWithParam<Uint8Array, Workbook>;
    xlsxEncode: Common.ReadableWithParam<Workbook, Uint8Array>;
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
}
