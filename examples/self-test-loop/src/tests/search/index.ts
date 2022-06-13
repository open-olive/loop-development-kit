/* eslint-disable no-async-promise-executor */
import { search, whisper, clipboard } from '@oliveai/ldk';

export const testSearchCreateIndex = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    // Whisper to instruct the user to get a test websocket URL from piesocket
    await whisper.create({
      label: 'Create index test',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: 'testing create index',
        },
      ],
    });

    const document: search.Document[] = [
      {
        name: 'test',
        data: JSON.stringify([]),
        fields: [],
      },
    ];

    const index = await search.createIndex('testIndex', document, {});
    if (index != null) {
      resolve(true);
    } else {
      reject('failed to create index');
    }
  });

export const testSearchCreateIndexSearch = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    // Whisper to instruct the user to get a test websocket URL from piesocket
    await whisper.create({
      label: 'Create index search test',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: 'testing create index search',
        },
      ],
    });

    const document: search.Document[] = [
      {
        name: 'test',
        data: JSON.stringify([]),
      },
      {
        name: 'test1',
        data: JSON.stringify([]),
      },
    ];
    console.log(JSON.stringify(document));
    try {
      search.createIndex('testIndex', document, {}).then(async (index) => {
        //console.log(JSON.stringify(index));
        if (index != null) {
          const searchResult = await index.search('');
          //console.log(JSON.stringify(searchResult));
          const body = 'search result: data:' + searchResult.data + ', total:' + searchResult.total;
          await whisper.create({
            label: 'Search Result',
            onClose: () => undefined,
            components: [
              {
                type: whisper.WhisperComponentType.Markdown,
                body: body,
              },
            ],
          });
          resolve(true);
        } else {
          reject('failed to create index');
        }
      });
    } catch (err) {
      reject(err);
    }
  });

export const testSearchCreateIndexQueryStringSearch = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    // Whisper to instruct the user to get a test websocket URL from piesocket
    await whisper.create({
      label: 'Create index search test',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: 'testing create index search',
        },
      ],
    });

    const document: search.Document[] = [
      {
        name: 'test',
        data: JSON.stringify([]),
      },
      {
        name: 'test1',
        data: JSON.stringify([]),
      },
    ];
    console.log(JSON.stringify(document));
    try {
      search.createIndex('testIndex', document, {}).then(async (index) => {
        //console.log(JSON.stringify(index));
        if (index != null) {
          const searchResult = await index.queryStringSearch('test');
          //console.log(JSON.stringify(searchResult));
          const body = 'search result: data:' + searchResult.data + ', total:' + searchResult.total;
          await whisper.create({
            label: 'Search Result',
            onClose: () => undefined,
            components: [
              {
                type: whisper.WhisperComponentType.Markdown,
                body: body,
              },
            ],
          });
          resolve(true);
        } else {
          reject('failed to create index');
        }
      });
    } catch (err) {
      reject(err);
    }
  });
