import { promisifyWithParam, promisifyMappedWithParam } from '../promisify';
import { Workbook, PDFOutput, PDFOutputWithOcrResult, OCRResults } from './types';
import * as mapper from '../utils/mapper';

export * from './types';

/**
 *  The Document aptitude allows Loops to enable basic parsing of files including XLSX.
 */
export interface Document {
  /**
   * Encodes a workbook object into XLSX data
   * @param  - Workbook object
   * @returns - A promise containing Uint8Array XLSX data.
   */
  xlsxEncode(workbook: Workbook): Promise<Uint8Array>;

  /**
   * Decodes XLSX data into a workbook object.
   * @param  - Uint8Array XLSX data
   * @returns - A promise containing Workbook.
   */
  xlsxDecode(data: Uint8Array): Promise<Workbook>;

  /**
   * Takes a PDF and outputs the text content inside
   * @param - Uint8Array PDF data
   * @returns - A promise containing PDFOutput
   */
  readPDF(data: Uint8Array): Promise<PDFOutput>;

  /**
   * Take a PDF and return output with ocr result for images
   * @param  {Uint8Array} data
   * @returns - A Promise containing PDFOutputWithOcrResult
   */
  readPDFWithOcr(data: Uint8Array): Promise<PDFOutputWithOcrResult>;
}

export function xlsxEncode(workbook: Workbook): Promise<Uint8Array> {
  return promisifyMappedWithParam(workbook, mapper.mapToUint8Array, oliveHelps.document.xlsxEncode);
}

export function xlsxDecode(data: Uint8Array): Promise<Workbook> {
  return promisifyWithParam(mapper.mapToBinaryData(data), oliveHelps.document.xlsxDecode);
}

export function readPDF(data: Uint8Array): Promise<PDFOutput> {
  return promisifyWithParam(mapper.mapToBinaryData(data), oliveHelps.document.readPDF);
}

export function readPDFWithOcr(data: Uint8Array): Promise<PDFOutputWithOcrResult> {
  return new Promise((resolve, reject) => {
    try {
      let pdfOutputResult = {};
      const ocrResults: OCRResults = {};
      oliveHelps.document.readPDF(mapper.mapToBinaryData(data), (error, pdfOutput) => {
        if (error) {
          console.error(`Received error on result: ${error.message}`);
          reject(error);
          return;
        }
        console.log(pdfOutput);
        pdfOutputResult = pdfOutput;
        if (pdfOutput != null) {
          Object.entries(pdfOutput).forEach(([page, { content }]) => {
            content.forEach((item) => {
              if (item.type === 'photo') {
                oliveHelps.screen.ocrFileEncoded(item.value, (err, ocr) => {
                  if (err) {
                    console.error(`Received error on result: ${err.message}`);
                    reject(err);
                    return;
                  }
                  ocrResults[page.toString()] = {
                    ocrResult: ocr,
                  };
                  const result: PDFOutputWithOcrResult = {
                    ocrResults,
                    pdfOutput: pdfOutputResult,
                  };
                  resolve(result);
                });
              }
            });
          });
        }
      });
    } catch (error) {
      console.error(`Received error calling service ${(error as Error).message}`);
      reject(error);
    }
  });
}
