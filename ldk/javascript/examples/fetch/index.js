import { whisper } from '@oliveai/ldk';
import './fetch-polyfill';

function fetchResultWhisper(text, success) {
  whisper.create({
    label: 'Result',
    onClose: () => {},
    components: [
      {
        body: `Result: ${success ? '**Successful**' : '**Failure**'}`,
        type: whisper.WhisperComponentType.Markdown,
      },
      {
        body: `${text}`,
        type: whisper.WhisperComponentType.Markdown,
      },
    ],
  });
}

function click() {
  try {
    // Note: Fetch will not throw an error even on a 404, 500, etc..
    // Only on actual network errors (security failures, permissions, timeouts, etc..)
    // will the catch be called
    fetch('https://httpstat.us/200', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => fetchResultWhisper(JSON.stringify(data), true))
      .catch((err) => {
        fetchResultWhisper(err, false);
      });
  } catch (e) {
    console.log('Click error:');
    console.log(e);
    fetchResultWhisper(JSON.stringify(e), false);
  }
}

function main() {
  whisper.create({
    label: 'Fetch',
    onClose: () => {},
    components: [
      {
        body: `Click the **button** to call fetch.`,
        type: whisper.WhisperComponentType.Markdown,
      },
      {
        type: whisper.WhisperComponentType.Button,
        label: 'Click Me!',
        onClick: (e, w) => {
          click();
        },
      },
    ],
  });
}

main();
