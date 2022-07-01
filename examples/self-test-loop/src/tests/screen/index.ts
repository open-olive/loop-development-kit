/* eslint-disable no-async-promise-executor */
import { network, screen, whisper, window } from '@oliveai/ldk';
import { Buffer } from 'buffer';

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
let branch = 'develop';

const writeWhisperFileEncoded = (label: string, body: string) => {
  whisper.create({
    label,
    onClose: () => {
      console.log('Closed Whisper');
    },
    components: [
      { body, type: whisper.WhisperComponentType.Markdown },
      {
        type: whisper.WhisperComponentType.Button,
        label: 'Perform testOcrFileEncoded',
        onClick: (error, incomingWhisper) => {
          incomingWhisper.close((e) => console.error(e));
          performOcrFileEncoded();
        },
      },
    ],
  });
};

const writeWhisperFileEncodedResult = (label: string, body: string) => {
  whisper.create({
    label,
    onClose: () => {
      console.log('Closed Whisper');
    },
    components: [
      { body, type: whisper.WhisperComponentType.Markdown },
      {
        body: `![image](https://raw.githubusercontent.com/open-olive/loop-development-kit/${branch}/examples/self-test-loop/static/testocr.png)`,
        type: whisper.WhisperComponentType.Markdown,
      },
      {
        type: whisper.WhisperComponentType.Button,
        label: 'Perform testOcrFileEncoded',
        onClick: (error, incomingWhisper) => {
          incomingWhisper.close((e) => console.error(e));
          performOcrFileEncoded();
        },
      },
    ],
  });
};

export const testOcrFileEncoded = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      await writeWhisperFileEncoded('OcrFileEncoded', 'Starting testOcrFileEncoded');
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

export async function performOcrFileEncoded() {
  let request = await network.httpRequest({
    url: `https://github.com/open-olive/loop-development-kit/raw/develop/examples/self-test-loop/static/testocr.png`,
    method: 'GET',
  });
  // Above URL is used after this feature is finished and merged in
  // Before PR is merged and branch is deleted, use the feature branch
  // Can delete this block after merge
  if (request.statusCode === 404) {
    request = await network.httpRequest({
      url: `https://github.com/open-olive/loop-development-kit/raw/HELPS-3796-ocrFileEncoded/examples/self-test-loop/static/testocr.png`,
      method: 'GET',
    });
    branch = 'HELPS-3796-ocrFileEncoded';
  }

  const encodedImage = Buffer.from(request.body).toString('base64');

  screen
    .ocrFileEncoded(encodedImage)
    .then((result) => {
      console.log('OCR Results: ');
      console.log(JSON.stringify(result));
      const filteredResult = result.filter((e) => e.confidence > 75);
      const concatResult = filteredResult.map((res) => res.text).join(' ');
      console.log('concatResult', concatResult);
      writeWhisperFileEncodedResult('result', concatResult);
    })
    .catch((error) => {
      console.log('error: ');
      console.log(error);
    });
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
        writeWhisper('result', concatResult);
      })
      .catch((error) => {
        console.log('error: ');
        console.log(error);
      });
  });
}

export const testScreenMonitor = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Running listenOcrMonitor function...');
      sleep(1000);

      const listener = await screen.listenOcrMonitor((ocrEvent) => {
        sleep(1000);
        const resultNew: string[] = [];
        const resultOld: string[] = [];

        ocrEvent.forEach((element) => {
          resultNew.push(element.new.text);
          resultOld.push(element.old.text);
        });

        const resultNewString = resultNew.join(' ');
        const resultOldString = resultOld.join(' ');
        whisper.create({
          label: 'test Screen Monitor',
          onClose: () => {
            console.log(`Closed Whisper`);
          },
          components: [
            {
              body: `New Text: ${resultNewString}`,
              type: whisper.WhisperComponentType.Markdown,
            },
            {
              body: `Old Text: ${resultOldString}`,
              type: whisper.WhisperComponentType.Markdown,
            },
          ],
        });
        console.log('result of changed text are', resultNewString);
        listener.cancel();
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
