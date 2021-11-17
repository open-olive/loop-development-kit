import { browser, ui, whisper } from '@oliveai/ldk';
import { Direction, JustifyContent, WhisperComponentType } from '../../dist/whisper';

const browserExample = async () => {
  await browser.listenNavigation(async (details) => {
    console.log('details ==> ', details.url);
    await whisper.create({
      components: [
        {
          type: WhisperComponentType.Box,
          alignment: JustifyContent.Left,
          direction: Direction.Vertical,
          children: [
            {
              type: WhisperComponentType.Markdown,
              body: `details.tabId ${details.tabId}`,
            },
            {
              type: WhisperComponentType.Markdown,
              body: `details.frameId ${details.frameId}`,
            },
            {
              type: WhisperComponentType.Markdown,
              body: `details.parentFrameId ${details.parentFrameId}`,
            },
            {
              type: WhisperComponentType.Markdown,
              body: `details.timestamp ${details.timestamp}`,
            },
            {
              type: WhisperComponentType.Markdown,
              body: `details.url ${details.url}`,
            },
          ],
        },
      ],
      label: 'Browser Navigation',
      onClose: () => console.log('closed navigation listener whisper'),
    });
  });

  await browser.listenTextSelection(async (value) => {
    await whisper.create({
      components: [
        {
          type: WhisperComponentType.Markdown,
          body: `selected text: ${value}`,
        },
      ],
      label: 'Text Selection',
      onClose: () => console.log('closed text selection whisper'),
    });
  });

  const window = await browser.openWindow('http://oliveai.com');
  await whisper.create({
    components: [
      {
        type: WhisperComponentType.Markdown,
        body: `window id ${window}`,
      },
    ],
    label: 'Browser Window Opened',
    onClose: () => console.log('closed browser window open whisper'),
  });

  const tab = await browser.openTab('http://oliveai.dev');
  await whisper.create({
    components: [
      {
        type: WhisperComponentType.Markdown,
        body: `tab id ${tab}`,
      },
    ],
    label: 'Browser Tab Opened',
    onClose: () => console.log('closed browser window open whisper'),
  });
};

const buildUrl = (val) => {
  let url;
  if (val.startsWith('s:')) {
    url = val.replace('s:', 'https://');
  } else {
    url = `http://${val}`;
  }
  return url;
};

const search = async () => {
  await ui.listenGlobalSearch(async (val) => {
    const wId = await browser.openWindow(buildUrl(val));
    await whisper.create({
      components: [
        {
          type: WhisperComponentType.Markdown,
          body: `window id ${wId}`,
        },
      ],
      label: 'Browser Window Opened',
      onClose: () => console.log('closed browser window open whisper'),
    });
  });
  await ui.listenSearchbar(async (val) => {
    const wId = await browser.openWindow(buildUrl(val));
    await whisper.create({
      components: [
        {
          type: WhisperComponentType.Markdown,
          body: `window id ${wId}`,
        },
      ],
      label: 'Browser Window Opened',
      onClose: () => console.log('closed browser window open whisper'),
    });
  });
};

browserExample();
search();
