/* eslint-disable no-async-promise-executor */
import { React, ReactWhisper, document, network, whisper } from '@oliveai/ldk';
import { Workbook, PDFContentType, PDFOutput } from '@oliveai/ldk/dist/document/types';

export const testDocumentEncodeAndDecode = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const workbook: Workbook = {
      worksheets: [
        {
          hidden: false,
          hiddenColumns: [],
          hiddenRows: [],
          name: 'name',
          rows: [
            {
              cells: [{ value: 'value' }],
            },
          ],
        },
      ],
    };
    setTimeout(() => {
      reject(new Error('XLSX encode did not finish in the appropriate time span.'));
    }, 5000);

    try {
      const uint8ArrayData = await document.xlsxEncode(workbook);
      const actual = await document.xlsxDecode(uint8ArrayData);
      const cellData = actual.worksheets[0].rows[0].cells[0].value;

      if (cellData === 'value') {
        resolve(true);
      } else {
        reject(
          new Error(`XLSX function  ${document.xlsxEncode} and ${document.xlsxDecode} failed.`),
        );
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testDocumentReadPDF = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      let request = await network.httpRequest({
        url:
          'https://github.com/open-olive/loop-development-kit/raw/develop/ldk/javascript/examples/self-test-loop/static/ldk-pdf-test.pdf',
        method: 'GET',
      });
      let branch = 'develop';

      // Above URL is used after this feature is finished and merged in
      // Before PR is merged and branch is deleted, use the feature branch
      // Can delete this block after merge
      if (request.statusCode === 404) {
        request = await network.httpRequest({
          url:
            'https://github.com/open-olive/loop-development-kit/raw/HELPS-3035-readpdf/ldk/javascript/examples/self-test-loop/static/ldk-pdf-test.pdf',
          method: 'GET',
        });
        branch = 'HELPS-3035-readpdf';
      }

      const decoded = await document.readPDF(request.body);

      // Sometimes the Core returns the pages out of order, so this is to sort it
      const decodedSorted: PDFOutput = {};
      for (let i = 1; i < Object.keys(decoded).length + 1; i += 1) {
        decodedSorted[i] = { ...decoded[i] };
      }

      let pdfParse = '';
      let pdfImage = '';
      Object.entries(decodedSorted).forEach(([page, { content }]) => {
        pdfParse += `# Page ${page}\n`;

        content.forEach(({ value, type }) => {
          if (type === PDFContentType.Text) {
            pdfParse += value;
          } else if (type === PDFContentType.NewLine) {
            pdfParse += '\n\n';
          } else if (type === PDFContentType.Photo) {
            pdfImage += `# Page ${page}\n`;
            const imageString = `![](data:image/png;base64,${value})`;
            pdfImage += imageString;
            pdfImage += '\n';
          }
        });

        pdfParse += '\n\n';
      });

      const DocumentWhisper = ({ parsedText }: { parsedText: string }) => (
        <oh-whisper label="PDF Aptitude - Read test" onClose={() => undefined}>
          <oh-markdown
            body={
              'This test should be automatically downloading this PDF and parsing only \
            the **text** from it to display it below'
            }
          />
          <oh-markdown
            body={`[Click here to open the PDF](https://github.com/open-olive/loop-development-kit/blob/${branch}/ldk/javascript/examples/self-test-loop/static/ldk-pdf-test.pdf)`}
          />
          <oh-markdown body={parsedText} />
          <oh-markdown body="# Image contents from PDF" />
          <oh-markdown body={`${pdfImage}`} />
          <oh-box
            direction={whisper.Direction.Horizontal}
            justifyContent={whisper.JustifyContent.SpaceEvenly}
          >
            <oh-button label="Pass" onClick={() => resolve(true)} />
            <oh-button label="Fail" onClick={() => reject()} />
          </oh-box>
        </oh-whisper>
      );

      ReactWhisper.renderNewWhisper(<DocumentWhisper parsedText={pdfParse} />);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const testDocumentReadPDFWithOcrImage = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      let request = await network.httpRequest({
        url:
          'https://github.com/open-olive/loop-development-kit/raw/develop/ldk/javascript/examples/self-test-loop/static/ldk-pdf-test.pdf',
        method: 'GET',
      });
      let branch = 'develop';

      // Above URL is used after this feature is finished and merged in
      // Before PR is merged and branch is deleted, use the feature branch
      // Can delete this block after merge
      if (request.statusCode === 404) {
        request = await network.httpRequest({
          url:
            'https://github.com/open-olive/loop-development-kit/raw/HELPS-3035-readpdf/ldk/javascript/examples/self-test-loop/static/ldk-pdf-test.pdf',
          method: 'GET',
        });
        branch = 'HELPS-3035-readpdf';
      }

      const decoded = await document.readPDFWithOcr(request.body);

      console.log('pdf output ==> ', decoded);

      // Sometimes the Core returns the pages out of order, so this is to sort it
      const pdfSort: PDFOutput = {};
      for (let i = 1; i < Object.keys(decoded).length + 1; i += 1) {
        pdfSort[i] = { ...decoded[i] };
      }

      let pdfParse = '';
      let pdfImage = '';
      let ocrImageText = '';
      Object.entries(pdfSort).forEach(([page, { content }]) => {
        pdfParse += `# Page ${page}\n`;

        content.forEach(({ value, type }) => {
          if (type === PDFContentType.Text) {
            pdfParse += value;
          } else if (type === PDFContentType.NewLine) {
            pdfParse += '\n\n';
          } else if (type === PDFContentType.Photo) {
            pdfImage += `# Page ${page}\n`;
            const imageString = `![](data:image/png;base64,${value})`;
            pdfImage += imageString;
            pdfImage += '\n';
          } else if (type === PDFContentType.PhotoText) {
            ocrImageText += `# Page ${page}\n`;
            console.log('image text');
            console.log(value);
            ocrImageText += value;
            ocrImageText += '\n\n';
          }
        });

        pdfParse += '\n\n';
      });

      const DocumentWhisper = ({ parsedText }: { parsedText: string }) => (
        <oh-whisper label="PDF Aptitude - Read test with OCR Image" onClose={() => undefined}>
          <oh-markdown
            body={
              'This test should be automatically downloading this PDF and parsing only \
            the **text** from it to display it below'
            }
          />
          <oh-markdown
            body={`[Click here to open the PDF](https://github.com/open-olive/loop-development-kit/blob/${branch}/ldk/javascript/examples/self-test-loop/static/ldk-pdf-test.pdf)`}
          />
          <oh-markdown body={parsedText} />
          <oh-markdown body="# Image contents from PDF" />
          <oh-markdown body={`${pdfImage}`} />
          <oh-markdown body="# OCR result for Image contents from PDF" />
          <oh-markdown body={'Below is the text result for Image contents from PDF'} />
          <oh-markdown body={ocrImageText} />
          <oh-box
            direction={whisper.Direction.Horizontal}
            justifyContent={whisper.JustifyContent.SpaceEvenly}
          >
            <oh-button label="Pass" onClick={() => resolve(true)} />
            <oh-button label="Fail" onClick={() => reject()} />
          </oh-box>
        </oh-whisper>
      );

      ReactWhisper.renderNewWhisper(<DocumentWhisper parsedText={pdfParse} />);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
