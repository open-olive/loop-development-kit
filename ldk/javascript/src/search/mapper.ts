import { Config, Index, Document, Field, FieldType, SearchResult } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCaughtError = (reject: (reason?: any) => void, error: Error, type: string): void => {
  console.error(`Received error calling ${type}: ${error.message}`);
  reject(error);
};

export const mapToIndex = (index: OliveHelps.Index): Index => ({
  search: (term: string): Promise<SearchResult> =>
    new Promise<SearchResult>((resolve, reject) => {
      try {
        index.search(term, (error: Error | undefined, searchResult: SearchResult) => {
          if (error) {
            console.error(`Received error on result: ${error.message}`);
            reject(error);
          }
          resolve(searchResult);
        });
      } catch (e) {
        handleCaughtError(reject, e, 'search');
      }
    }),
  queryStringSearch: (queryString: string): Promise<SearchResult> =>
    new Promise<SearchResult>((resolve, reject) => {
      try {
        index.queryStringSearch(
          queryString,
          (error: Error | undefined, searchResult: SearchResult) => {
            if (error) {
              console.error(`Received error on result: ${error.message}`);
              reject(error);
            }
            resolve(searchResult);
          },
        );
      } catch (e) {
        handleCaughtError(reject, e, 'queryStringSearch');
      }
    }),
  update: (documents: Document[], config: Config): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      try {
        index.update(documents, config, (error: Error | undefined) => {
          if (error) {
            console.error(`Received error on result: ${error.message}`);
            reject(error);
          }
        });
        resolve();
      } catch (e) {
        handleCaughtError(reject, e, 'update');
      }
    }),
  delete: (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      try {
        index.delete((error: Error | undefined) => {
          if (error) {
            console.error(`Received error on result: ${error.message}`);
            reject(error);
          }
        });
        resolve();
      } catch (e) {
        handleCaughtError(reject, e, 'delete');
      }
    }),
});
