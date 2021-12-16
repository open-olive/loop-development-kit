/* eslint-disable no-async-promise-executor */
import { screen, whisper, window } from '@oliveai/ldk';

export * from './hashTests';

const writeWhisper = (label: string, body: string) =>
  whisper.create({
    label,
    onClose: () => {
      console.log(`Closed Whisper`);
    },
    components: [
      {
        body,
        type: whisper.WhisperComponentType.Markdown,
      },
      {
        type: whisper.WhisperComponentType.Button,
        label: 'Perform OCR',
        onClick: (error, incomingWhisper) => {
          incomingWhisper.close((e) => console.error(e));
          performOcr();
        },
      },
    ],
  });

export const testOCR = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await writeWhisper(`OCR`, `Starting OCR app`);
      await sleep(10000);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

const rebuildImage = (results: screen.OCRResult[]) => {
  const lines: any[][][] = [];
  results.forEach((box) => {
    if (box.level !== undefined) {
      const boxText = box.text;
      const curLine = box.line_num;
      const curWord = box.word_num;
      const parNum = box.par_num;

      while (lines.length <= parNum) {
        lines.push([]);
      }
      while (lines[parNum].length <= curLine) {
        lines[parNum].push([]);
      }
      while (lines[parNum][curLine].length <= curWord) {
        lines[parNum][curLine].push('');
      }
      lines[parNum][curLine][curWord] = boxText;
    }
  });

  const fullText: any[] = [];
  lines.forEach((para) => {
    const paraTemp: any[] = [];
    para.forEach((listOfWords) => {
      paraTemp.push(listOfWords.join(' '));
    });
    fullText.push(paraTemp.join('\n'));
  });

  return fullText.join('\n\n');
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function performOcr() {
  await sleep(3000); // sleeping for 3s to switch tabs
  window.activeWindow().then((windowInfo) => {
    const ocrCoordinates = {
      top: windowInfo.y,
      left: windowInfo.x,
      width: windowInfo.width,
      height: windowInfo.height,
    };
    console.log('got active window coordinates:');
    console.log(
      ocrCoordinates.top,
      ocrCoordinates.left,
      ocrCoordinates.width,
      ocrCoordinates.height,
    );
    console.log('performing ocr with coordinates...');

    screen
      .ocr(ocrCoordinates)
      .then((result) => {
        console.log('OCR Results: ');
        console.log(JSON.stringify(result));
        const concatResult = result.map((res) => res.text).join(' ');
        console.log('concatResult', concatResult);
        console.log('result: ', rebuildImage(result));
        writeWhisper(`result`, rebuildImage(result));
      })
      .catch((error) => {
        console.log('error: ');
        console.log(error);
      });
  });
}


