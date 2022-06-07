import { promisifyWithParam, promisifyMappedWithParam } from '../promisify';
import { Workbook, PDFOutput, PDFValue, PDFContentType } from './types';
import * as mapper from '../utils/mapper';
import * as screen from '../screen';
import { OCRResult } from '../screen';

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
  readPDFWithOcr(data: Uint8Array): Promise<PDFOutput>;
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

export function readPDFWithOcr(data: Uint8Array): Promise<PDFOutput> {
  return new Promise((resolve, reject) => {
    try {
      oliveHelps.document.readPDF(mapper.mapToBinaryData(data), async (error, pdfOutput) => {
        if (error) {
          console.error(`Received error on result: ${error.message}`);
          reject(error);
          return;
        }
        const pdfOutputResult: PDFOutput = {};
        if (pdfOutput != null) {
          // eslint-disable-next-line no-restricted-syntax
          for (const [page, { content }] of Object.entries(pdfOutput)) {
            const promises: Promise<OCRResult[]>[] = [];
            const photoContents = content.filter((item) => item.type === PDFContentType.Photo);
            photoContents.forEach((item) => {
              const ocr = screen.ocrFileEncoded(item.value);
              promises.push(ocr);
            });
            const testcontent: PDFValue[] = [];
            // eslint-disable-next-line no-await-in-loop
            const results = await Promise.all(promises);
            results.forEach((value) => {
              const concatResult = value.map((res) => res.text).join(' ');
              const imageText: PDFValue = {
                type: PDFContentType.PhotoText,
                value: concatResult,
              };
              testcontent.push(imageText);
            });
            pdfOutputResult[page] = { content };
            pdfOutputResult[page].content.push(...testcontent);
          }
          resolve(pdfOutputResult);
        } else {
          reject(new Error('ReadPDF returns empty output'));
        }
      });
    } catch (error) {
      console.error(`Received error calling service ${(error as Error).message}`);
      reject(error);
    }
  });
}
