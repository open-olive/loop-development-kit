import { promisifyWithParam, promisifyMappedWithParam } from '../promisify';
import { Workbook, PDFOutput, PDFOutputWithOcrResult } from './types';
import * as mapper from '../utils/mapper';
// import * as screen from '../screen';
import { OCRResult } from '../screen/types';

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
   * @returns Promise
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

// TODO: Add new function for looper author to extract text from image
export function readPDFWithOcr(data: Uint8Array): Promise<PDFOutputWithOcrResult> {
  return new Promise(async (resolve, reject) => {
    try {
       oliveHelps.document.readPDF(mapper.mapToBinaryData(data), (error, pdfOUtput) => {
        if (error) {
          console.error(`Received error on result: ${error.message}`);
          reject(error);
          return;
        } 
        console.log(pdfOUtput);
        let result = {} as PDFOutputWithOcrResult;
        result.pdfOutput = pdfOUtput;
        if (pdfOUtput != null){
          Object.entries(pdfOUtput).forEach(([page, { content }]) => {
            content.forEach((item) => {
              if (item.type === 'photo') {
                console.log(item.value);
                oliveHelps.screen.ocrFileEncoded(item.value, (err, data) => {
                  if (err) {
                    console.error(`Received error on result: ${err.message}`);
                    reject(err);
                    return;
                  }
                  console.log('oliveHelps.screen.ocrFileEncoded result');
                  console.log(data);
                  result.ocrResults[page.toString()] = {
                    ocrResult: data,
                  };
                });
                // new screen functionality
                // oliveHelps.screen.ocrFileEncoded(item.value, (err, data) => {});
              }
            });
          });
        }
        resolve(result);
       });
    } catch (error) {
      console.error(`Received error calling service ${(error as Error).message}`);
      reject(error);
    }
  });
}
