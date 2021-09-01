declare namespace XLSX {
  interface Aptitude {
    decode: Common.ReadableWithParam<Uint8Array, Workbook>;
    encode: Common.ReadableWithParam<Workbook, Uint8Array>;
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
