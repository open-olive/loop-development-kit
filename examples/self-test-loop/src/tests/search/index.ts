/* eslint-disable no-async-promise-executor */
import { search, whisper, network, document } from '@oliveai/ldk';
import { Worksheet, Row } from '@oliveai/ldk/dist/document/types';
import { resolveRejectButtons } from '../whisper/utils';

function workSheet2Document(worksheet: Worksheet) {
  const { name, rows } = worksheet;
  const data = JSON.stringify(
    rows.map((row: Row) => ({
      testName: row.cells[0].value,
      number: row.cells[1].value,
      name: row.cells[2].value,
    })),
  );

  return {
    name,
    data,
  };
}

export const testSearchCreateIndex = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const documents: search.Document[] = [
      {
        name: 'test',
        data: JSON.stringify([]),
        fields: [],
      },
    ];
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

export const testSearchCreateIndexSearch = (): Promise<boolean> =>
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
    const index = await search.createIndex('Test Index', documents, {});
    try {
      //console.log(JSON.stringify(index));
      if (index != null) {
        const searchResult = await index.search('Dev');
        //console.log(JSON.stringify(searchResult));
        const body =
          'search result for "Dev": data:' +
          JSON.stringify(searchResult.data) +
          ', total:' +
          searchResult.total;
        await whisper.create({
          label: 'Search Result for "Dev" ',
          onClose: () => undefined,
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: body,
            },
            resolveRejectButtons(resolve, reject),
          ],
        });
      } else {
        reject('failed to create index');
      }
    } catch (err) {
      reject(err);
    }
  });

export const testSearchCreateIndexQueryStringSearch = (): Promise<boolean> =>
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

    await whisper.create({
      label: 'Index query search test',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: 'testing index query string search',
        },
      ],
    });

    const index = await search.createIndex('Test Index', documents, {});
    try {
      //console.log(JSON.stringify(index));
      if (index != null) {
        const searchResult = await index.search('Olive');
        //console.log(JSON.stringify(searchResult));
        const body =
          'search result for "Olive": data:' +
          JSON.stringify(searchResult.data) +
          ', total:' +
          searchResult.total;
        await whisper.create({
          label: 'Query String Search Result for "Olive" ',
          onClose: () => undefined,
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: body,
            },
            resolveRejectButtons(resolve, reject),
          ],
        });
      } else {
        reject('failed to create index');
      }
    } catch (err) {
      reject(err);
    }
  });

export const testSearchIndexExsit = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const documents: search.Document[] = [
      {
        name: 'test',
        data: JSON.stringify([]),
        fields: [],
      },
    ];
    await whisper.create({
      label: 'Search exist index test',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: 'testing index exist',
        },
      ],
    });

    const index = await search.createIndex('testIndex', documents, {});

    const indexExists = await search.exists('testIndex');
    await whisper.create({
      label: 'Search Index Exists ',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: 'Search Index Exists: ' + indexExists.toString(),
        },
        resolveRejectButtons(resolve, reject),
      ],
    });
  });
