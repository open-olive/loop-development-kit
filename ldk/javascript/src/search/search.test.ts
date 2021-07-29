import * as search from '.';
import { FieldType } from './types';

describe('Search', () => {
  beforeEach(() => {
    oliveHelps.search = {
      createIndex: jest.fn(),
      openIndex: jest.fn(),
      exists: jest.fn(),
    };
  });

  describe('Search Interface', () => {
    it('createIndex returns a promise result with expected index', () => {
      const indexName = 'testIndex';
      const fields: search.Field[] = [
        {
          name: 'test',
          displayName: 'Test',
          type: FieldType.simple,
        },
      ];
      const docs: search.Document[] = [
        {
          name: 'test',
          data: 'data',
          fields,
        },
      ];
      const config: search.Config = { searchSize: 10 };
      search.createIndex(indexName, docs, config);
      return expect(oliveHelps.search.createIndex).toBeCalledWith(
        'testIndex',
        docs,
        config,
        expect.any(Function),
      );
    });

    it('openIndex returns a promise result with expected index', () => {
      const indexName = 'testIndex';
      const config: search.Config = { searchSize: 10 };
      search.openIndex(indexName, config);
      return expect(oliveHelps.search.openIndex).toBeCalledWith(
        indexName,
        config,
        expect.any(Function),
      );
    });

    it('exists returns a promise result with expected index', () => {
      const indexName = 'testIndex';
      search.exists(indexName);
      return expect(oliveHelps.search.exists).toBeCalledWith(indexName, expect.any(Function));
    });
  });
});
