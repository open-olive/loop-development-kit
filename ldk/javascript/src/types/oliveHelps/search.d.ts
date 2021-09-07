declare namespace Search {
  interface Aptitude {
    createIndex: Common.ReadableWithThreeParams<string, Array<Document>, Config, Index>;
    openIndex: Common.ReadableWithTwoParams<string, Config, Index>;
    exists: Common.ReadableWithParam<string, boolean>;
  }

  interface Index {
    search: Common.ReadableWithParam<string, SearchResult>;
    queryStringSearch: Common.ReadableWithParam<string, SearchResult>;
    update: Common.ReadableWithTwoParams<Array<Document>, Config, void>;
    delete: Common.Readable<void>;
  }

  type Config = {
    sortBy?: string[];
    searchSize?: number;
    exactMatchThreshold?: number;
    beginsWithSearch?: boolean;
  };

  type Document = {
    name: string;
    data: string;
    fields?: Array<Field>;
  };

  type Field = {
    name: string;
    displayName?: string;
    type?: FieldType;
  };

  type FieldType = 'standard' | 'stemmer' | 'simple' | 'numeric' | 'boolean' | 'datetime';

  interface SearchResult {
    data: Array<{ [key: string]: string }>;
    total: number;
  }
}
