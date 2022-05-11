/* eslint-disable camelcase */
declare namespace Screen {
  interface Aptitude {
    ocr: Common.ReadableWithParam<OCRCoordinates, OCRResult[]>;
    averageHash: Common.ReadableWithTwoParams<Bounds, number, string>;
    differenceHash: Common.ReadableWithTwoParams<Bounds, number, string>;
    perceptionHash: Common.ReadableWithTwoParams<Bounds, number, string>;
    compareHashes: Common.ReadableWithTwoParams<string, string, number>;
    listenAverageHash: Common.ListenableWithFourParams<Bounds, number, number, number, number>;
    listenDifferenceHash: Common.ListenableWithFourParams<Bounds, number, number, number, number>;
    listenPerceptionHash: Common.ListenableWithFourParams<Bounds, number, number, number, number>;
    listenPixelDiff: Common.ListenableWithThreeParams<Bounds, number, number, number>;
    listenPixelDiffActiveWindow: Common.ListenableWithTwoParams<number, number, number>;
    listenOcrMonitor: Common.Listenable<OcrEvent[]>;
    ocrFileEncoded: Common.ReadableWithParam<string, OCRResult[]>;
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
  interface OcrEvent {
    old: TextAndBounds;
    new: TextAndBounds;
  }

  interface TextAndBounds {
    bounds: Rectangle;
    text: string;
  }

  type Bounds = {
    top: number;
    left: number;
    width: number;
    height: number;
  };

  type Rectangle = {
    Max: Point;
    Min: Point;
  };

  type Point = {
    X: number;
    Y: number;
  };
}
