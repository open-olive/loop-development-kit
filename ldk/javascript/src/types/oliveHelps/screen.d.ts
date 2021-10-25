declare namespace Screen {
  interface Aptitude {
    ocr: (
      callback: (error: Error | undefined, value: OCRResult[]) => void,
      ocrCoordinates: OCRCoordinates,
      monitor: number,
    ) => void;
  }

  interface OCRResult {
    confidence: number;
    text: string;
  }

  interface OCRCoordinates {
    top: number;
    left: number;
    width: number;
    height: number;
  }
}
