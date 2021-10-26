/* eslint-disable camelcase */
declare namespace Screen {
  interface Aptitude {
    ocr: (
      callback: (error: Error | undefined, value: OCRResult[]) => void,
      ocrCoordinates: OCRCoordinates,
      monitor: number,
    ) => void;
  }

  interface OCRResult {
    level: number;
    page_num: number;
    block_num: number;
    par_num: number;
    line_num: number;
    word_num: number;
    left: number;
    top: number;
    width: number;
    height: number;
    conf: number;
    text: string;
  }

  interface OCRCoordinates {
    top: number;
    left: number;
    width: number;
    height: number;
  }
}
