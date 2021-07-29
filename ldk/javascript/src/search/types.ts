export enum FieldType {
	/**
   * Standard Filter is not case sensitive filters out english stop words
   */
	standard = 'standard',
	/**
   * Stemmer Filter ignores case but implements the porter stemmer and snowball stemmer filter
   */
	stemmer = 'stemmer',
	/**
   * Simple Filter only ignores case
   */
	simple = 'simple',
	/**
   * Numeric Filter is used to map numeric only fields
   */
	numeric = 'numeric',
	/**
   * Boolean Filter is used to map boolean or (1,0) only fields
   */
	boolean = 'boolean',
	/**
   * Datatime Filter is used to map datetime fields and support most major time standards
   */
	datetime = 'datetime'
}

export type Field = {
	/**
   * The name of the field
   */
	name: string;
	/**
   * The name of the field that will be used instead of the default name of the field (if provided)
   */
	displayName?: string;
	/**
   * The type of mapping for the field
   */
	type?: FieldType;
};

export type Document = {
	/**
   * The name of the document
   */
	name: string;
	/**
   * The data for the document that will be indexed and searched over
   */
	data: string;
	/**
   * The list of fields with the field specific configurations
   */
	fields?: Array<Field>;
};

export interface Config {
	/**
   * The list of fields to sort the results by
   */
	sortBy?: string[];
	/**
   * Limit the size of the search results. Default is 100, max is 300
   */
	searchSize?: number;
	/**
   * number of characters per word to that will always trigger an exact match search versus a fuzzy search
   */
	exactMatchThreshold?: number;
	/**
   * add the ability to do a prefix search along with the fuzzy search. Default is true.
   */
	beginsWithSearch?: boolean;
}

export interface SearchResult {
	/**
   * Search result data comes in as an array of objects
   */
	data: Array<{ [key: string]: string }>;
	/*
   * Total number of results found
   */
	total: number;
}
