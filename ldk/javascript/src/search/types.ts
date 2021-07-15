export enum FieldType {
	// TODO: Add all field types
	standard = 'standard',
	stemmer = 'stemmer'
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
