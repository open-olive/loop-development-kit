/* eslint-disable no-async-promise-executor */
import { whisper, React, ReactWhisper } from '@oliveai/ldk';
import {
  CaseTypes,
  MatchSorterRankings,
  WhisperComponentType,
} from '@oliveai/ldk/dist/whisper/types';
import { autocompleteOptions, ignoreCase, matchFrom, onActionWrapper } from '../utils';

export const testAutocomplete = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['Select', false],
      ['Change', false],
      ['Multiple', false],
      ['Custom', false],
      ['MultiCustom', false],
    ]);
    try {
      await whisper.create({
        label: 'Autocomplete test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: 'Select "Value 4"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Test',
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('4')) {
                onActionWrapper(error, 'Select', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: autocompleteOptions,
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Type into the input "Typed"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Test',
            loading: true,
            onChange: (error, value: string, onChangeWhisper) => {
              console.info(`Received onChange value: ${value}`);
              if (value.toLowerCase() === 'typed') {
                onActionWrapper(error, 'Change', resolverMap, onChangeWhisper, resolve, reject);
              }
            },
            onSelect: (_error, value: string[]) => {
              console.info(`Received onSelect value: ${JSON.stringify(value)}`);
            },
            options: [...autocompleteOptions, { label: 'Typed', value: '10' }],
            tooltip: 'tooltip',
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Select values 4 and 5',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Test',
            loading: true,
            multiple: true,
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              console.log('type of value: ', typeof value);
              if (value.includes('4') && value.includes('5')) {
                onActionWrapper(error, 'Multiple', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: autocompleteOptions,
            tooltip: 'tooltip',
            value: '5',
          },
          {
            type: WhisperComponentType.Markdown,
            body: "Enter the word 'custom'",
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Free Solo Test',
            loading: true,
            multiple: false,
            freeSolo: true,
            onChange: (error, value, onChangeWhisper) => {
              console.log(`Received onChange value: ${JSON.stringify(value)}`);
              if (value?.includes('custom')) {
                onActionWrapper(error, 'Custom', resolverMap, onChangeWhisper, resolve, reject);
              }
            },
            onSelect: (_error, value: string[]) => {
              console.info(`Received onSelect value: ${JSON.stringify(value)}`);
            },
            options: autocompleteOptions,
            tooltip: 'tooltip',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Autocomplete Free Solo Multiple Test',
            loading: true,
            multiple: true,
            freeSolo: true,
            onChange: (error, value, onChangeWhisper) => {
              console.log(`Received onChange value: ${JSON.stringify(value)}`);
              if (value?.includes('custom')) {
                onActionWrapper(
                  error,
                  'MultiCustom',
                  resolverMap,
                  onChangeWhisper,
                  resolve,
                  reject,
                );
              }
            },
            onSelect: (_error, value: string[]) => {
              console.info(`Received onSelect value: ${JSON.stringify(value)}`);
            },
            options: autocompleteOptions,
            tooltip: 'tooltip',
          },
        ],
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testAutocompleteFilterOptions = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['IgnoreCase', false],
      ['RespectCase', false],
      ['Limit', false],
      ['MatchFromStart', false],
      ['MatchFromAny', false],
      ['Stringify', false],
    ]);
    try {
      await whisper.create({
        label: 'Autocomplete test',
        onClose: () => {
          console.debug('closed');
        },
        components: [
          {
            type: WhisperComponentType.Markdown,
            body: 'Case when searching should be ignored. Search for either "Value" or "value", all options should come back. Select "value 1"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Ignore Case Test',
            filterOptions: {
              ignoreCase: true,
            },
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('1')) {
                onActionWrapper(error, 'IgnoreCase', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: ignoreCase,
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Case when searching should NOT be ignored. Search for either "Value" or "value", only the respective results should come back. Select "value 5"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: `Don't Ignore Case Test`,
            filterOptions: {
              ignoreCase: false,
            },
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('5')) {
                onActionWrapper(
                  error,
                  'RespectCase',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            },
            options: ignoreCase,
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'Search results limited to max of 2 options shown. If you click the arrow in other autocompletes and 5 options come back, not setting it works. Select "Value 4"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Limit Test',
            filterOptions: {
              limit: 2,
            },
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('4')) {
                onActionWrapper(error, 'Limit', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: autocompleteOptions,
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'The search is searching using matchFrom value "start" (defaults to "any"). This means that the query will try to find items matching from the start of the string. 3 values are "Weird Value X". Start a search with "Weird" and confirm that only those items come back. Then, Search for "Value" and select "Value 2"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Match From Start Test',
            filterOptions: {
              matchFrom: 'start',
            },
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('2')) {
                onActionWrapper(
                  error,
                  'MatchFromStart',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            },
            options: matchFrom,
          },
          {
            type: WhisperComponentType.Markdown,
            body: 'The search is searching using matchFrom value "any". This means that the query will try to find items matching from any part of the string. Same options as previous Match test. Search "Value", confirm all 5 options return, and select "Value 2"',
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Match From Any Test',
            filterOptions: {
              matchFrom: 'any',
            },
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('2')) {
                onActionWrapper(
                  error,
                  'MatchFromAny',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            },
            options: matchFrom,
          },
          {
            type: WhisperComponentType.Markdown,
            body: `Uses the stringify function in filter options. This tells the autocomplete to use a different value when searching it's options. In this case, it is using option.value (1, 2, 3, 4, 5) instead of option.label. This means that if you search "Value", noting will return. Confirm that this happens, then search 1, confirm it shows up, then select "Value 1"`,
          },
          {
            type: WhisperComponentType.Autocomplete,
            label: 'Stringify Test',
            filterOptions: {
              stringify: ['value'],
            },
            loading: false,
            onChange: () => {
              // do nothing
            },
            onSelect: (error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('1')) {
                onActionWrapper(error, 'Stringify', resolverMap, onSelectWhisper, resolve, reject);
              }
            },
            options: autocompleteOptions,
          },
        ],
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testAutocompleteMatchSorter = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['KeepDiacritics', false],
      ['StripDiacritics', false],
      // ['NestedKeys', false],
      ['CamelCase', false],
      ['KebabCase', false],
      ['PascalCase', false],
      ['SnakeCase', false],
      ['Acronym', false],
      ['CaseSensitiveEqual', false],
      ['Contains', false],
      ['Equal', false],
      // ['NoMatch', false],
      ['StartsWith', false],
      ['WordStartsWith', false],
    ]);

    const DIACRITICS_OPTIONS = [
      { label: 'válué 1', value: 'válué 1' },
      { label: 'value 2', value: 'value 2' },
      { label: 'válué 3', value: 'válué 3' },
      { label: 'value 4', value: 'value 4' },
      { label: 'válué 5', value: 'válué 5' },
    ];

    // const NESTED_KEYS_OPTIONS = [
    //   { label: 'value 1', value: { number: '1', type: 'value' } },
    //   { label: 'value 2', value: { number: '2', type: 'value' } },
    //   { label: 'value 3', value: { number: '3', type: 'value' } },
    //   { label: 'value 4', value: { number: '4', type: 'value' } },
    //   { label: 'value 5', value: { number: '5', type: 'value' } },
    // ];

    const CAMEL_CASE_OPTIONS = [
      { label: 'other value 1', value: 'otherValue1' },
      { label: 'other value 2', value: 'otherValue2' },
      { label: 'other value 3', value: 'otherValue3' },
      { label: 'other value 4', value: 'otherValue4' },
      { label: 'other value 5', value: 'otherValue5' },
    ];

    const KEBAB_CASE_OPTIONS = [
      { label: 'other value 1', value: 'other-value-1' },
      { label: 'other value 2', value: 'other-value-2' },
      { label: 'other value 3', value: 'other-value-3' },
      { label: 'other value 4', value: 'other-value-4' },
      { label: 'other value 5', value: 'other-value-5' },
    ];

    const PASCAL_CASE_OPTIONS = [
      { label: 'other value 1', value: 'OtherValue1' },
      { label: 'other value 2', value: 'OtherValue2' },
      { label: 'other value 3', value: 'OtherValue3' },
      { label: 'other value 4', value: 'OtherValue4' },
      { label: 'other value 5', value: 'OtherValue5' },
    ];

    const SNAKE_CASE_OPTIONS = [
      { label: 'other value 1', value: 'other_value_1' },
      { label: 'other value 2', value: 'other_value_2' },
      { label: 'other value 3', value: 'other_value_3' },
      { label: 'other value 4', value: 'other_value_4' },
      { label: 'other value 5', value: 'other_value_5' },
    ];

    const CASE_SENSITIVE_EQUAL_OPTIONS = [
      { label: 'abc', value: 'abc' },
      { label: 'ABC', value: 'ABC' },
      { label: 'abcdef', value: 'abcdef' },
      { label: 'ABCDEF', value: 'ABCDEF' },
    ];

    const ACRONYM_OPTIONS = [
      { label: 'United States', value: 'United States' },
      { label: 'Great Britain', value: 'Great Britain' },
      { label: 'British Columbia', value: 'British Columbia' },
    ];

    const CONTAINS_OPTIONS = [
      { label: 'Bahamas', value: 'Bahamas' },
      { label: 'Zimbabwe', value: 'Zimbabwe' },
      { label: 'Mexico', value: 'Mexico' },
    ];

    const EQUAL_OPTIONS = [
      { label: 'abc', value: 'abc' },
      { label: 'ABC', value: 'ABC' },
      { label: 'abcdef', value: 'abcdef' },
      { label: 'ABCDEF', value: 'ABCDEF' },
    ];

    // const NO_MATCH_OPTIONS = [
    //   { label: 'orange', value: 'orange' },
    //   { label: 'apple', value: 'apple' },
    //   { label: 'grape', value: 'grape' },
    //   { label: 'banana', value: 'banana' },
    // ];

    const STARTS_WITH_OPTIONS = [
      { label: 'South Korea', value: 'South Korea' },
      { label: 'South Africa', value: 'South Africa' },
      { label: 'North South', value: 'North South' },
      { label: 'North West', value: 'North West' },
    ];

    const WORD_STARTS_WITH_OPTIONS = [
      { label: 'South Korea', value: 'South Korea' },
      { label: 'South Africa', value: 'South Africa' },
      { label: 'West South', value: 'West South' },
      { label: 'North West', value: 'North West' },
    ];

    try {
      const MatchSorterTest = () => (
        <oh-whisper label="Autocomplete Match Sorter Test" onClose={() => console.debug('closed')}>
          <oh-markdown
            body="Diacritic letters make a difference. Search for 'value' and 
            only 'value 2' and 'value 4' options should come back. Select 'value 2'"
          />
          <oh-autocomplete
            label="Keep Diacritics Test"
            matchSorter={{ keepDiacritics: true }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('value 2')) {
                onActionWrapper(
                  error,
                  'KeepDiacritics',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            }}
            options={DIACRITICS_OPTIONS}
          />
          <oh-markdown
            body="Diacritic letters should not make a difference. Search for 
            'value' and all 5 options should come back. Select 'válué 1'"
          />
          <oh-autocomplete
            label="Strip Diacritics Test"
            matchSorter={{ keepDiacritics: false }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('válué 1')) {
                onActionWrapper(
                  error,
                  'StripDiacritics',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            }}
            options={DIACRITICS_OPTIONS}
          />
          {/* Nested keys in 'value' doesn't work in Core */}
          {/* <oh-markdown
            body="Nested value keys should be handled. Here we only are 
            matching on a nested key called 'number' that only has the number of the value. 
            Search for '1' and only 'value 1' should come back, search for '2' and only 
            'value 2' should come back, and so on. Search for and select 'value 5'"
          />
          <oh-autocomplete
            label="Nested Keys Test"
            matchSorter={{ keys: ['value.number'] }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('value 5')) {
                onActionWrapper(error, 'NestedKeys', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={NESTED_KEYS_OPTIONS}
          /> */}
          <oh-markdown
            body="For the next 4 tests, we're testing the different separators used for 
            the values that we're matching against. So we want to make sure that searching 
            'other value' should come back with all 5 options. Search 'other value' in 
            each one and select 'other value 3' in each one"
          />
          <oh-autocomplete
            label="camelCase Test"
            matchSorter={{ recipe: CaseTypes.CamelCase }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('otherValue3')) {
                onActionWrapper(error, 'CamelCase', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={CAMEL_CASE_OPTIONS}
          />
          <oh-autocomplete
            label="kebab-case Test"
            matchSorter={{ recipe: CaseTypes.KebabCase }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('other-value-3')) {
                onActionWrapper(error, 'KebabCase', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={KEBAB_CASE_OPTIONS}
          />
          <oh-autocomplete
            label="PascalCase Test"
            matchSorter={{ recipe: CaseTypes.PascalCase }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('OtherValue3')) {
                onActionWrapper(error, 'PascalCase', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={PASCAL_CASE_OPTIONS}
          />
          <oh-autocomplete
            label="snake_case Test"
            matchSorter={{ recipe: CaseTypes.SnakeCase }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('other_value_3')) {
                onActionWrapper(error, 'SnakeCase', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={SNAKE_CASE_OPTIONS}
          />
          <oh-markdown
            body="Normal matching, but **also** matches on an acronym of the item. Searching 
            'us' should return 'United States', searching 'gb' should return 'Great 
            Britain', and so on. Search for 'bc' and select 'British Columbia'."
          />
          <oh-autocomplete
            label="Acronym Test"
            matchSorter={{ threshold: MatchSorterRankings.Acronym }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('British Columbia')) {
                onActionWrapper(error, 'Acronym', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={ACRONYM_OPTIONS}
          />
          <oh-markdown
            body="Only exact matches with the same casing. When you first click inside, 
            you'll see no options, this is because it's searching for an exact match. 
            The options we've provided are abc, ABC, abcdef, ABCDEF. Searching 'abc' 
            should only return 'abc', searching 'ABC' should only return 'ABC', and so on. 
            Search for 'ABCDEF' and select 'ABCDEF'."
          />
          <oh-autocomplete
            label="Case Sensitive Equal Test"
            matchSorter={{ threshold: MatchSorterRankings.CaseSensitiveEqual }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('ABCDEF')) {
                onActionWrapper(
                  error,
                  'CaseSensitiveEqual',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            }}
            options={CASE_SENSITIVE_EQUAL_OPTIONS}
          />
          <oh-markdown
            body="Matches on any item that contains the letters in your search. For 
            example, searching 'ham' should return 'Ba**ham**as'. Search for 'bab' and 
            select 'Zimbabwe'."
          />
          <oh-autocomplete
            label="Contains Test"
            matchSorter={{ threshold: MatchSorterRankings.Contains }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('Zimbabwe')) {
                onActionWrapper(error, 'Contains', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={CONTAINS_OPTIONS}
          />
          <oh-markdown
            body="Only exact matches, but casing is ignored. When you first click inside, 
            you'll see no options, this is because it's searching for an exact match. 
            The options we've provided are abc, ABC, abcdef, ABCDEF. Searching 'abc' 
            should return 'abc' and 'ABC, and vice versa. Search for 'abcdef' and select 
            'ABCDEF'."
          />
          <oh-autocomplete
            label="Equal Test"
            matchSorter={{ threshold: MatchSorterRankings.Equal }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('ABCDEF')) {
                onActionWrapper(error, 'Equal', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={EQUAL_OPTIONS}
          />
          {/* Sorting is currently disabled in UI, commenting out until fix is in */}
          {/* <oh-markdown
            body="Return all options, but _sorts_ the options by best match. Searching 
            'ap' should return all options but 'apple' should be at the top. Search for 
            'an' and confirm 'banana' moves to the top with 'orange' below it, then select 
            'orange'"
          />
          <oh-autocomplete
            label="No Match Test"
            matchSorter={{ threshold: MatchSorterRankings.NoMatch }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('ABCDEF')) {
                onActionWrapper(error, 'NoMatch', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={NO_MATCH_OPTIONS}
          /> */}
          <oh-markdown
            body="Only matches with options that start with your search. Searching 'sou' 
            should only return 'South Korea' and 'South Africa', and not 'North South'. 
            Search 'nor' and select 'North West'."
          />
          <oh-autocomplete
            label="Starts With Test"
            matchSorter={{ threshold: MatchSorterRankings.StartsWith }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('North West')) {
                onActionWrapper(error, 'StartsWith', resolverMap, onSelectWhisper, resolve, reject);
              }
            }}
            options={STARTS_WITH_OPTIONS}
          />
          <oh-markdown
            body="Only matches with options where any word starts with your search. 
            Searching 'sou' should return 'South Korea', 'South Africa', and 'North 
            South'. Search 'wes' and select 'North West'."
          />
          <oh-autocomplete
            label="Word Starts With Test"
            matchSorter={{ threshold: MatchSorterRankings.WordStartsWith }}
            onSelect={(error, value, onSelectWhisper) => {
              console.log(`Received selected value: ${JSON.stringify(value)}`);
              if (value.includes('North West')) {
                onActionWrapper(
                  error,
                  'WordStartsWith',
                  resolverMap,
                  onSelectWhisper,
                  resolve,
                  reject,
                );
              }
            }}
            options={WORD_STARTS_WITH_OPTIONS}
          />
        </oh-whisper>
      );
      ReactWhisper.renderNewWhisper(<MatchSorterTest />);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
