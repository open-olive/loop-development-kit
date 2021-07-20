import { Config, Index, Document, Field, FieldType, SearchResult } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCaughtError = (reject: (reason?: any) => void, error: Error, type: string): void => {
	console.error(`Received error calling ${type}: ${error.message}`);
	reject(error);
};

export const mapToField = (field: OliveHelps.Field): Field => ({
	name: field.name,
	displayName: field.displayName,
	type: field.type as FieldType
});

export const mapToFields = (fields: OliveHelps.Field[]): Field[] => fields.map((f) => mapToField(f));

export const mapToSearchResult = (searchResult: OliveHelps.SearchResult): SearchResult => ({
	data: searchResult.data,
	total: searchResult.total
});

export const mapToDocument = (document: Document): OliveHelps.Document => ({
	name: document.name,
	data: document.data,
	fields: document.fields ? mapToFields(document.fields) : undefined
});

export const mapToDocuments = (documents: Document[]): OliveHelps.Document[] => {
	const docs: OliveHelps.Document[] = [];
	documents.forEach((d) => docs.push(mapToDocument(d)));
	return docs;
};

export const mapToConfig = (config: Config): OliveHelps.Config => ({
	sortBy: config.sortBy,
	searchSize: config.searchSize,
	exactMatchThreshold: config.exactMatchThreshold,
	beginsWithSearch: config.beginsWithSearch
});

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
				index.queryStringSearch(queryString, (error: Error | undefined, searchResult: SearchResult) => {
					if (error) {
						console.error(`Received error on result: ${error.message}`);
						reject(error);
					}
					resolve(searchResult);
				});
			} catch (e) {
				handleCaughtError(reject, e, 'queryStringSearch');
			}
		}),
	update: (documents: OliveHelps.Document[], config: OliveHelps.Config): Promise<void> =>
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
		})
});
