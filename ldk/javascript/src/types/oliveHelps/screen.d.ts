/* eslint-disable camelcase */
declare namespace Screen {
  interface Aptitude {
    ocr: Common.ReadableWithParam<OCRCoordinates, OCRResult[]>;
    averageHash: Common.ReadableWithTwoParams<Bounds, bigint, string>;
    differenceHash: Common.ReadableWithTwoParams<Bounds, bigint, string>;
    perceptionHash: Common.ReadableWithTwoParams<Bounds, bigint, string>;
    compareHashes: Common.ReadableWithTwoParams<string, string, bigint>;
    listenAverageHash: Common.ListenableWithFourParams<Bounds, bigint, bigint, bigint, bigint>;
    listenDifferenceHash: Common.ListenableWithFourParams<Bounds, bigint, bigint, bigint, bigint>;
    listenPerceptionHash: Common.ListenableWithFourParams<Bounds, bigint, bigint, bigint, bigint>;
    listenPixelDiff: Common.ListenableWithThreeParams<Bounds, number, bigint, number>;
    listenPixelDiffActiveWindow: Common.ListenableWithTwoParams<number, bigint, number>;
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

  type Bounds = {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}
