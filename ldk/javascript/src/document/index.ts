import { promisifyWithParam, promisifyMappedWithParam, promisify } from '../promisify';
import { Workbook, PDFOutput } from './types';
import * as mapper from '../utils/mapper';
import * as screen from '../screen';

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
/* export function readPDFWithOption(data:Uint8Array, ocrImages:boolean): Promise<PDFOutputWithOcrResult> {

  return new Promise((resolve, reject) => {
    try {
      readPDFReslut(data);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function readPDFReslut(data:Uint8Array): PDFOutputWithOcrResult{
  const pdfResult:PDFOutput = {};
  const ocr: OCRResults = {};
  const result: PDFOutputWithOcrResult = {
    pdfOutput: pdfResult,
    ocrResults: ocr,
  };
  new Promise(async (resolve, reject) => {
      try {
        const pdfData = await readPDF(data);
        Object.entries(pdfData).forEach(([page, { content }]) => {
        });
      }
      catch{
  
      }
    });
    return result;
} */
