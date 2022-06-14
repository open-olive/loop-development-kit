/* eslint-disable no-async-promise-executor */
import { search, whisper, network, document } from '@oliveai/ldk';
import { Worksheet, Row } from '@oliveai/ldk/dist/document/types';

function workSheet2Document(worksheet: Worksheet) {
  const { name, rows } = worksheet;
  const data = JSON.stringify(
    rows.map((row: Row) => ({
      errorCode: row.cells[0].value,
      name: row.cells[1].value,
      description: row.cells[2].value,
    })),
  );

  return {
    name,
    data,
  };
}

export const testSearchCreateIndex = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    let request = await network.httpRequest({
      url: 'https://github.com/open-olive/loop-development-kit/raw/develop/examples/self-test-loop/static/test.xlsx',
      method: 'GET',
    });
    let branch = 'develop';

    // Above URL is used after this feature is finished and merged in
    // Before PR is merged and branch is deleted, use the feature branch
    // Can delete this block after merge
    if (request.statusCode === 404) {
      request = await network.httpRequest({
        url: 'https://github.com/open-olive/loop-development-kit/raw/HELPS-4731-search-aptitude-selftest/examples/self-test-loop/static/test.xlsx',
        method: 'GET',
      });
      branch = 'HELPS-4731-search-aptitude-selftest';
    }
    const workbook = await document.xlsxDecode(request.body);
    const documents = workbook.worksheets.map(workSheet2Document);
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

    const index = await search.createIndex('testIndex', documents, {});
    if (index != null) {
      resolve(true);
    } else {
      reject('failed to create index');
    }
  });

/*export const testSearchCreateIndexSearch = (): Promise<boolean> =>
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

    console.log(JSON.stringify(document));
    try {
      search.createIndex('testIndex', document, getConfig()).then(async (index) => {
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

    const document = getDocuments();

    console.log(JSON.stringify(document));
    try {
      search.createIndex('testIndex', document, getConfig()).then(async (index) => {
        //console.log(JSON.stringify(index));
        if (index != null) {
          const searchResult = await index.queryStringSearch('test');

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
  });*/
