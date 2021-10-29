import { Config, Index, Document, SearchResult } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCaughtError = (reject: (reason?: any) => void, error: Error, type: string): void => {
  console.error(`Received error calling ${type}: ${error.message}`);
  reject(error);
};

export const mapToIndex = (index: Search.Index): Index => ({
  search: (term: string): Promise<SearchResult> =>
    new Promise<SearchResult>((resolve, reject) => {
      try {
        index.search(term, (error: Error | undefined, searchResult: SearchResult) => {
          if (error) {
            handleCaughtError(reject, error, 'search');
          }
          resolve(searchResult);
        });
      } catch (e) {
        handleCaughtError(reject, e as Error, 'search');
      }
    }),
  queryStringSearch: (queryString: string): Promise<SearchResult> =>
    new Promise<SearchResult>((resolve, reject) => {
      try {
        index.queryStringSearch(
          queryString,
          (error: Error | undefined, searchResult: SearchResult) => {
            if (error) {
              handleCaughtError(reject, error, 'queryStringSearch');
            }
            resolve(searchResult);
          },
        );
      } catch (e) {
        handleCaughtError(reject, e as Error, 'queryStringSearch');
      }
    }),
  update: (documents: Document[], config: Config): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      try {
        index.update(documents, config, (error: Error | undefined) => {
          if (error) {
            handleCaughtError(reject, error, 'update');
          }
          resolve();
        });
      } catch (e) {
        handleCaughtError(reject, e as Error, 'update');
      }
    }),
  delete: (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      try {
        index.delete((error: Error | undefined) => {
          if (error) {
            handleCaughtError(reject, error, 'delete');
          }
          resolve();
        });
      } catch (e) {
        handleCaughtError(reject, e as Error, 'delete');
      }
    }),
});
