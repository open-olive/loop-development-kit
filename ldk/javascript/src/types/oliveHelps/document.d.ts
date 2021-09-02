declare namespace Document {
  interface Aptitude {
    xlsxDecode: Common.ReadableWithParam<Array<number>, Workbook>;
    xlsxEncode: Common.ReadableWithParam<Workbook, ArrayBuffer>;
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
