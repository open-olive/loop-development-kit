import { promisify, promisifyMappedWithTwoParams, promisifyMappedWithThreeParams } from '../promisify';
import * as mapper from './mapper';
import { Document, Config } from './types';

export * from './types';

export interface Index {
	/**
   * Executes a search with the search term over the data.
   * @param term - The term that will be used to search over the index.
   * @returns A Promise resolving with the search results as a string
   */
	search(term: string): Promise<string>;
	/**
   * Executes a search with the using a query string to search over the data.
   *
   * @param queryString - The query string that will be used to search over the index.
   * @returns A Promise resolving with the search results as a string  
   */
	queryStringSearch(queryString: string): Promise<string>;
	/**
   * Executes a search with the using a query string to search over the data.
	 * 
   * @param documents - The date that will be indexed and searchable
   * @param config - The configuration object defines how the index will preform certain searches 
   */
	update(documents: Document[], config: Config): Promise<void>;
	/**
   * Deletes the current search index
 	 */
	delete(): Promise<void>;
}

export interface Search {
	/**
   * Creates a Search index with the provided configuration and data.
   *
   * @param name- The unique name of the Search Index.
   * @param config - The configuration object defines how the index will preform certain searches 
   * @returns A Promise resolving with the an Index object.
   */
	createIndex(name: string, documents: Array<Document>, config: Config): Promise<Index>;
	/**
   * Opens an existing search index with the provided configuration.
   *
   * @param name- The unique name of the Search Index.
   * @param config - The configuration object defines how the index will preform certain searches 
   * @returns A Promise resolving with the an Index object.
   */
	openIndex(name: string, config: Config): Promise<Index>;
	/**
   * Verifies an search index exists with the provided name.
   *
   * @param name- The unique name of the Search Index.
   * @returns returns true if the index existes with the specified name
   */
	exists(name: string, config: Config): Promise<boolean>;
}

export function createIndex(name: string, documents: Array<Document>, config: Config): Promise<Index> {
	return promisifyMappedWithThreeParams(
		name,
		documents,
		mapper.mapToDocuments,
		config,
		mapper.mapToConfig,
		mapper.mapToIndex,
		oliveHelps.search.createIndex
	);
}
export function openIndex(name: string, config: Config): Promise<Index> {
	return promisifyMappedWithTwoParams(
		name,
		config,
		mapper.mapToConfig,
		mapper.mapToIndex,
		oliveHelps.search.openIndex
	);
}
export function exists(): Promise<boolean> {
	return promisify(oliveHelps.search.exists);
}
