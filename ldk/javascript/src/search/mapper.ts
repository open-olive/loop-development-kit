import { Config, Index, Document, Field, FieldType } from './index';

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

export const mapToFields = (fields: OliveHelps.Field[]): Field[] => {
	return fields.map((f) => mapToField(f));
};

export const mapToDocument = (document: OliveHelps.Document): Document => ({
	name: document.name,
	data: document.data,
	fields: document.fields ? mapToFields(document.fields) : undefined
});

export const mapToDocuments = (documents: OliveHelps.Document[]): Document[] => {
	return documents.map((d) => mapToDocument(d));
};

export const mapToConfig = (config: OliveHelps.Config): Config => ({
	sortBy: config.sortBy,
	searchSize: config.searchSize,
	exactMatchThreshold: config.exactMatchThreshold,
	beginsWithSearch: config.beginsWithSearch
});

export const mapToIndex = (index: OliveHelps.Index): Index => ({
	search: (term: string) =>
		new Promise<string>((resolve, reject) => {
			try {
				const results = index.search(term, (error: Error | undefined) => {
					if (error) {
						console.error(`Received error on result: ${error.message}`);
						reject(error);
						return;
					}
				});
				resolve(results);
			} catch (e) {
				handleCaughtError(reject, e, 'search');
			}
		}),
	queryStringSearch: (queryString: string) =>
		new Promise<string>((resolve, reject) => {
			try {
				const results = index.queryStringSearch(queryString, (error: Error | undefined) => {
					if (error) {
						console.error(`Received error on result: ${error.message}`);
						reject(error);
						return;
					}
				});
				resolve(results);
			} catch (e) {
				handleCaughtError(reject, e, 'queryStringSearch');
			}
		}),
	update: (documents: OliveHelps.Document[], config: OliveHelps.Config) =>
		new Promise<void>((resolve, reject) => {
			try {
				index.update(documents, config, (error: Error | undefined) => {
					if (error) {
						console.error(`Received error on result: ${error.message}`);
						reject(error);
						return;
					}
				});
				resolve();
			} catch (e) {
				handleCaughtError(reject, e, 'update');
			}
		}),
	delete: () =>
		new Promise<void>((resolve, reject) => {
			try {
				index.delete((error: Error | undefined) => {
					if (error) {
						console.error(`Received error on result: ${error.message}`);
						reject(error);
						return;
					}
				});
				resolve();
			} catch (e) {
				handleCaughtError(reject, e, 'delete');
			}
		})
});
