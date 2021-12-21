/* eslint-disable no-async-promise-executor */
import { screen, whisper, window, cursor } from '@oliveai/ldk';
import { Cancellable } from '../../../../../dist/cancellable';

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
      await sleep(5000);
      resolve(true);
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

console.log(`Starting app`);

async function testOCRUsingCursor() {
  let i = 0;
  let cursorPositionStream: Cancellable;
  let topParam: number;
  let leftParam: number;
  let topParam1: number;
  let leftParam1: number;
  await sleep(1000);
  cursor
    .listenPosition((response) => {
      if (typeof response !== 'undefined') {
        if (i === 0) {
          topParam = response.y;
          leftParam = response.x;
          console.debug(`leftParam - X - ${leftParam1}`);
          console.debug(` topParam - Y - ${topParam1}`);
        }
        if (i === 1) {
          topParam1 = response.y;
          leftParam1 = response.x;
          console.debug(`leftParam1 - X - ${leftParam1}`);
          console.debug(` topParam1 - Y - ${topParam1}`);
        }

        i += 1;

        if (i >= 2) {
          cursorPositionStream.cancel();
        }
      }
    })
    .then((cancellable: Cancellable) => {
      cursorPositionStream = cancellable;
    });
  await sleep(2000);
  const width = Math.abs(leftParam1 - leftParam).toString();
  const height = Math.abs(topParam1 - topParam).toString();

  const ocrCoordinates = {
    top: topParam,
    left: leftParam,
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  };
  console.log('got OCR coordinates:');
  console.log(ocrCoordinates.top, ocrCoordinates.left, ocrCoordinates.width, ocrCoordinates.height);
  console.log('performing ocr with coordinates...');

  screen
    .ocr(ocrCoordinates)
    .then((result) => {
      console.log('OCR Results: ');
      console.log(JSON.stringify(result));
      console.log('result: ', rebuildImage(result));
      writeWhisper(`result`, rebuildImage(result));
    })
    .catch((error) => {
      console.log('error: ');
      console.log(error);
    });
}

const writeWhisperCursorTest = (label: string, body: string) =>
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
          testOCRUsingCursor();
        },
      },
    ],
  });

export const testOCRUsingCursorAptitude = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await writeWhisperCursorTest(`OCR`, `Starting OCR app`);
      await sleep(5000);
      resolve(true);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
