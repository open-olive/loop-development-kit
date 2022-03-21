/**
 * REMINDER: Whenever you add (or remove) components from this file, you MUST
 * also make the corresponding change in the `ldk/javascript/src/whisper/react/component-types.ts`
 * and `ldk/javascript/src/whisper/react/component-handlers.ts` files.
 *
 * You'll get a compile error if you don't...
 */
export enum WhisperComponentType {
  Autocomplete = 'autocomplete',
  /**
   * A container component for formatting other components.
   */
  Box = 'box',
  /**
   * A list of links that display a hierarchal relationship between each other
   */
  Breadcrumbs = 'breadcrumbs',
  Button = 'button',
  Checkbox = 'checkbox',
  /**
   * A container component to allow content to be opened and closed with a button click.
   */
  CollapseBox = 'collapseBox',
  /**
   * This component shows a horizontal divider to separate different kinds on content in a whisper. This component has no options.
   */
  Divider = 'divider',
  /**
   * The text input field allows the user to provide an email address.
   */
  Email = 'email',
  /**
   * This component shows a link that can either open a link in the user's default browser or function as an `onClick` to allow for loops to do things like send a new whisper.
   */
  Link = 'link',
  /**
   * This component shows a link that can either open a link in the user's default browser or function as an `onClick` to allow for loops to do things like send a new whisper.
   */
  Grid = 'grid',
  /**
   * This component shows a two column view of information typically used for lists of information.
   */
  ListPair = 'listPair',
  Markdown = 'markdown',
  /**
   * This component shows a banner in the whisper that functions as a call to action to the user.
   */
  Message = 'message',
  /**
   * The text input field allows the user to provide a number within the parameters provided.
   */
  Number = 'number',
  /**
   * Pagination component to use in conjunction with state changes for paginating content within components
   */
  Pagination = 'pagination',
  /**
   * The password input field allows the user to provide a password. This field protects the user by obscuring what they type. Showing each character as a solid black dot.
   */
  Password = 'password',
  /**
   * Progress components express an unspecified wait time or display the length of a process.
   */
  Progress = 'progress',
  /**
   * The radio group allows a loop to provide the user with a collection of options in which they select a single result. The result is selected by clicking one of the radio elements in the radio group.
   *
   * A selected value of -1 indicates that nothing is selected.
   */
  RadioGroup = 'radioGroup',
  /**
   * A selected value of -1 indicates that nothing is selected.
   */
  Select = 'select',
  /**
   * The text input field allows the user to provide a telephone number.
   */
  Telephone = 'telephone',
  /**
   * The text input field allows the user to provide text information.
   *
   * The text can be pre-populated by the loop.
   */
  TextInput = 'textInput',
  /**
   * The SectionTitle component adds a background that stretches across the entire whisper to the provided text
   */
  SectionTitle = 'sectionTitle',
  /**
   * A text input field allows the user to provide date and time information.
   *
   * The field can be pre-populated by the loop.
   */
  DateTimeInput = 'dateTimeInput',
  /**
   *  The RichTextEditor gives users a text area that allows users to add text with styling (bold, italics, links, etc)
   */
  RichTextEditor = 'richTextEditor',
  /**
   * The Icon Component renders requested icon inside of a whisper. Icons can be placed inside of Box components.
   */
  Icon = 'icon',
  /**
   * The dropzone component allows the Loop to receive a file uploaded by a user
   */
  DropZone = 'dropZone',
}

export enum JustifyContent {
  Center = 'center',
  FlexEnd = 'flex-end',
  FlexStart = 'flex-start',
  Left = 'left',
  Normal = 'normal',
  Right = 'right',
  SpaceAround = 'space-around',
  SpaceBetween = 'space-between',
  SpaceEvenly = 'space-evenly',
}

export enum AlignItems {
  Center = 'center',
  FlexEnd = 'flex-end',
  FlexStart = 'flex-start',
  Stretch = 'stretch',
}

/**
 * @deprecated - Use JustifyContent instead.
 */
export const Alignment = JustifyContent;

export enum AlignContent {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around',
  Stretch = 'stretch',
}

export enum ButtonSize {
  Large = 'large',
  Small = 'small',
}

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  Text = 'text',
}

export enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum GridDirection {
  Row = 'row',
  RowReverse = 'row-reverse',
  Column = 'column',
  ColumnReverse = 'column-reverse',
}

export enum FontWeight {
  Thin = 300,
  Regular = 400,
  Bold = 700,
  ExtraBold = 800,
}

export enum TextAlign {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum OpenDirection {
  Bottom = 'bottom',
  Top = 'top',
}

export enum Urgency {
  Error = 'error',
  None = 'none',
  Success = 'success',
  Warning = 'warning',
}
export enum Wrap {
  NoWrap = 'nowrap',
  WrapReverse = 'wrap-reverse',
  Wrap = 'wrap',
}

export enum DateTimeType {
  Date = 'date',
  Time = 'time',
  DateTime = 'date_time',
}

export enum Color {
  Accent = 'accent',
  Black = 'black',
  Grey = 'grey',
  WhisperStrip = 'whisper-strip',
  White = 'white',
}

export enum MarkdownWhisperCopyMode {
  Body = 'body',
}

export enum MessageWhisperCopyMode {
  Body = 'body',
  Header = 'header',
}

export interface LayoutOptions {
  flex?: string;
  margin?: StyleSize;
  marginBottom?: StyleSize;
  marginLeft?: StyleSize;
  marginTop?: StyleSize;
  marginRight?: StyleSize;
  padding?: StyleSize;
  paddingBottom?: StyleSize;
  paddingLeft?: StyleSize;
  paddingTop?: StyleSize;
  paddingRight?: StyleSize;
  width?: WidthSize;
}

export interface StyleOptions {
  fontWeight?: FontWeight;
}

export enum IconSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'x-large',
}

export enum IconVariant {
  Outlined = 'outlined',
  Round = 'round',
  Sharp = 'sharp',
  TwoTone = 'two-tone',
}

export type AutocompleteOption = {
  label: string;
  value: any; // eslint-disable-line
};

export enum PaginationComponentType {
  Pagination = 'pagination',
  TablePagination = 'tablePagination',
}

export enum ProgressShape {
  Circular = 'circular',
  Linear = 'linear',
}
export enum StyleSize {
  None = 'none',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum WidthSize {
  Full = 'full',
  Half = 'half',
}

export type StateMap = Map<string, string | boolean | number | string[]>;

export enum CustomHeight {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extraLarge',
}

export enum CaseTypes {
  CamelCase = 'camelCase',
  KebabCase = 'kebab-case',
  PascalCase = 'PascalCase',
  SnakeCase = 'snake_case',
}

export enum MatchSorterRankings {
  Acronym = 'ACRONYM',
  CaseSensitiveEqual = 'CASE_SENSITIVE_EQUAL',
  Contains = 'CONTAINS',
  Equal = 'EQUAL',
  Matches = 'MATCHES',
  /**
   * @hidden -- Sorting is disabled in UI, breaking this ranking. Temporarily hiding.
   */
  NoMatch = 'NO_MATCH',
  StartsWith = 'STARTS_WITH',
  WordStartsWith = 'WORD_STARTS_WITH',
}

export interface Whisper {
  id: string;
  close: (cb: (err: Error | undefined) => void) => void;
  update(whisper: UpdateWhisper, cb?: (err: Error) => void): void;
  componentState: StateMap;
}

export type WhisperHandler = (error: Error | undefined, whisper: Whisper) => void;
export type WhisperHandlerWithParam<T> = (
  error: Error | undefined,
  param: T,
  whisper: Whisper,
) => void;

export interface WhisperComponent<T extends WhisperComponentType> {
  id?: string;
  type: T;
  /**
   * The key is used to maintain the object state.
   * The component's key must be unique among its sibling components.
   */
  key?: string;
  layout?: LayoutOptions;
}

interface InputComponent<T1 extends WhisperComponentType, T2, T3 = T2>
  extends WhisperComponent<T1> {
  disabled?: boolean;
  label?: string;
  tooltip?: string;
  validationError?: string;
  value?: T2;
  onBlur?: (error: Error | undefined) => void;
  onFocus?: (error: Error | undefined) => void;
  onChange: WhisperHandlerWithParam<T3>;
}

interface SelectComponent<T extends WhisperComponentType> extends WhisperComponent<T> {
  disabled?: boolean;
  validationError?: string;
}

export interface AutocompleteFilterOptions {
  /**
   * Defaults to true. Remove diacritics.
   */
  ignoreAccents?: boolean;
  /**
   * Defaults to true. Lowercase everything.
   */
  ignoreCase?: boolean;
  /**
   * Default to null. Limit the number of suggested options
   * to be shown. For example, if config.limit is 100, only
   * the first 100 matching options are shown. It can be
   * useful if a lot of options match and virtualization
   * wasn't set up.
   */
  limit?: number;
  /**
   * Defaults to 'any'
   */
  matchFrom?: 'any' | 'start';
  /**
   * Controls how an option is converted into a string so that
   * it can be matched against the input text fragment. Accepts
   * an array of strings that is the path to the key in the
   * AutocompleteOption to be used.
   */
  stringify?: string[];
  /**
   * Defaults to false. Remove trailing spaces.
   */
  trim?: boolean;
}

export interface AutocompleteMatchSorterOptions {
  /**
   * By default, match-sorter will strip diacritics before doing any comparisons.
   * You can use this option to disable this behavior.
   */
  keepDiacritics?: boolean;
  /**
   * @hidden -- Core does not support objects for values yet
   * By default, match-sorter just uses the value itself. Passing an array
   * tells match-sorter which keys to use for the ranking.
   */
  keys?: string[];
  /**
   * By default, match-sorter assumes spaces to be the word separator. However,
   * you can use this option with the {@link CaseTypes} enum to choose a different
   * casing style.
   */
  recipe?: CaseTypes;
  /**
   * Thresholds can be used to specify the criteria used to rank the results.
   * Available thresholds are in the {@link MatchSorterRankings} enum.
   */
  threshold?: MatchSorterRankings;
}

export type Autocomplete = SelectComponent<WhisperComponentType.Autocomplete> & {
  /**
   * Options to configure how the filter search behaves
   *
   * (Note: filterOptions and matchSorter can't be used together; if you include both,
   * matchSorter will take precedence)
   */
  filterOptions?: AutocompleteFilterOptions;
  /**
   * Option to allow custom user input that doesn't match any of the
   * supplied selectable options
   */
  freeSolo?: boolean;
  /**
   * Label associated with component
   */
  label?: string;
  /**
   * If true, displays component in 'loading' state
   */
  loading?: boolean;
  /**
   * Options to use with our implementation of match-sorter
   * https://github.com/kentcdodds/match-sorter
   *
   * (Note: filterOptions and matchSorter can't be used together; if you include both,
   * matchSorter will take precedence)
   */
  matchSorter?: AutocompleteMatchSorterOptions;
  /**
   * Indicates if multiple drop down selections are allowed
   */
  multiple?: boolean;
  /**
   * Callback handler triggered if typed input is received
   */
  onChange?: WhisperHandlerWithParam<string>;
  /**
   * Callback handler triggered if drop down value is selected
   */
  onSelect: WhisperHandlerWithParam<string[]>;
  /**
   * List of selectable options
   */
  options?: AutocompleteOption[];
  /**
   * Tooltip associated with component
   */
  tooltip?: string;
  /**
   * Default selected value
   */
  value?: string;
};

export type Checkbox = SelectComponent<WhisperComponentType.Checkbox> & {
  label?: string;
  tooltip?: string;
  value?: boolean;
  onChange: WhisperHandlerWithParam<boolean>;
};

export type RadioGroup = SelectComponent<WhisperComponentType.RadioGroup> & {
  onSelect: WhisperHandlerWithParam<number>;
  options: string[];
  selected?: number;
};

export type Select = SelectComponent<WhisperComponentType.Select> & {
  label?: string;
  options: string[];
  /**
   * Indicates if default (None) option should be excluded from selectable options
   */
  excludeDefaultOption?: boolean;
  onSelect: WhisperHandlerWithParam<number>;
  selected?: number;
  tooltip?: string;
};

export type Email = InputComponent<WhisperComponentType.Email, string>;

export type NumberInput = InputComponent<WhisperComponentType.Number, number> & {
  max?: number;
  min?: number;
  step?: number;
};

export type Password = InputComponent<WhisperComponentType.Password, string>;

export type Telephone = InputComponent<WhisperComponentType.Telephone, string>;

export type TextInput = InputComponent<WhisperComponentType.TextInput, string>;

export type DateTimeInput = InputComponent<
  WhisperComponentType.DateTimeInput,
  Date | string,
  string
> & {
  dateTimeType: DateTimeType;
  min?: Date;
  max?: Date;
};

export type Breadcrumbs = WhisperComponent<WhisperComponentType.Breadcrumbs> & {
  links: Link[];
};

export type Button = WhisperComponent<WhisperComponentType.Button> & {
  endIcon?: {
    name: string;
    variant?: IconVariant;
  };
  startIcon?: {
    name: string;
    variant?: IconVariant;
  };
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
  label?: string;
  onClick: WhisperHandler;
  size?: ButtonSize;
  tooltip?: string;
};

export type Link = WhisperComponent<WhisperComponentType.Link> & {
  href?: string;
  text: string;
  onClick?: WhisperHandler;
  style?: Urgency;
  textAlign?: TextAlign;
  componentStyle?: StyleOptions;
};

export type ListPair = WhisperComponent<WhisperComponentType.ListPair> & {
  copyable: boolean;
  labelCopyable?: boolean;
  label: string;
  onCopy?: WhisperHandlerWithParam<string>;
  value: string;
  style: Urgency;
};

export type Markdown = WhisperComponent<WhisperComponentType.Markdown> & {
  copyable?: MarkdownWhisperCopyMode;
  body: string;
  onCopy?: WhisperHandler;
  tooltip?: string;
  onLinkClick?: WhisperHandlerWithParam<string>;
};

export type Message = WhisperComponent<WhisperComponentType.Message> & {
  copyable?: MessageWhisperCopyMode;
  body?: string;
  header?: string;
  onCopy?: WhisperHandler;
  style?: Urgency | Color.Accent | Color.Black | Color.Grey;
  textAlign?: TextAlign;
  tooltip?: string;
};

export type DropZone = WhisperComponent<WhisperComponentType.DropZone> & {
  /**
   * Specify what extensions the user can include. Do not include the dot.
   *
   * @example ['jpg','jpeg','png']
   */
  accept?: string[];
  label: string;
  /**
   * The number of files that can be selected. There is a hard limit of ten files that can be selected at once.
   */
  limit?: number;
  /**
   * If provided, replaces the word "files" in the component.
   */
  noun?: string;
  /**
   * If provided, display the messages stating that the the file not being accepted, the area that user drops a file, browse a file, or has reached the maximum number of files.
   */
  messaging?: {
    accept?: string;
    click?: string;
    drop?: string;
    limit?: string;
  };
  /**
   * The callback function to call whenever the user selects or unselects a file.
   */
  onDrop: WhisperHandlerWithParam<File[]>;
  onRemove?: WhisperHandlerWithParam<File[]>;
  tooltip?: string;
  validationError?: string;
  /**
   * This field can be used to re-order and remove selected files from the component.
   *
   * If the value property is null or undefined, the existing selection will remain as-is. To deselect all the files,
   * set it to an empty array.
   *
   * You cannot add a file to the selection via this interface. The component will ignore any files provided it
   * currently does not have selected.
   */
  value?: File[];
};

export type Icon = WhisperComponent<WhisperComponentType.Icon> & {
  name: string;
  size?: IconSize;
  color?: Color.Black | Color.Grey | Color.White | Color.WhisperStrip | Color.Accent;
  onClick?: WhisperHandler;
  tooltip?: string;
  variant?: IconVariant;
};

export type SectionTitle = WhisperComponent<WhisperComponentType.SectionTitle> & {
  body: string;
  textAlign?: TextAlign;
  backgroundStyle?: Color.Grey | Color.White;
};

export type RichTextEditor = WhisperComponent<WhisperComponentType.RichTextEditor> & {
  disabled?: boolean;
  onBlur?: (error: Error | undefined) => void;
  onChange: WhisperHandlerWithParam<string>;
  onFocus?: (error: Error | undefined) => void;
  tooltip?: string;
  validationError?: string;
  value?: string;
};

export type Divider = WhisperComponent<WhisperComponentType.Divider>;

export type Progress = WhisperComponent<WhisperComponentType.Progress> & {
  determinate?: number;
  shape?: ProgressShape;
  /**
   * If StyleSize is set to 'None', it will return its default StyleSize 'Medium'
   */
  size?: StyleSize;
};

export type Pagination = WhisperComponent<WhisperComponentType.Pagination> & {
  /**
   * tablePagination: total number of rows in your table
   * pagination: total number of pages
   */
  count: number;
  /**
   * This component can either be normal pagination or table pagination
   */
  component?: PaginationComponentType;
  disabled?: boolean;
  /**
   * The label next to the "rows per page" dropdown (for table pagination)
   */
  labelRowsPerPage?: string;
  /**
   * @returns string containing the selected page number
   */
  onChange?: WhisperHandlerWithParam<string>;
  /**
   * @returns string containing the new "rows per page" value selected (for table pagination)
   */
  onRowsPerPageChange?: WhisperHandlerWithParam<string>;
  /**
   * The current page
   */
  page: number;
  /**
   * The number of table rows per page (for table pagination)
   */
  rowsPerPage?: number;
  /**
   * An array of options that the user can select to determine the number of rows per page
   * (table pagination)
   */
  rowsPerPageOptions?: number[];
};

export type Grid = WhisperComponent<WhisperComponentType.Grid> & {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  children: Array<ChildComponents>;
  direction?: GridDirection;
  justifyContent?: JustifyContent;
  spacing?: number;
  wrap?: Wrap;
  xs?: string;
} & (
    | {
        container: boolean;
      }
    | {
        item: boolean;
      }
  );

export type ChildComponents =
  | Autocomplete
  | Box
  | Breadcrumbs
  | Button
  | Checkbox
  | CollapseBox
  | DateTimeInput
  | Divider
  | DropZone
  | Email
  | Grid
  | Icon
  | Link
  | ListPair
  | Markdown
  | Message
  | NumberInput
  | Pagination
  | Password
  | Progress
  | RadioGroup
  | RichTextEditor
  | Select
  | SectionTitle
  | Telephone
  | TextInput;

export type CollapseBox = WhisperComponent<WhisperComponentType.CollapseBox> & {
  children: Array<ChildComponents>;
  label?: string;
  open: boolean;
  openDirection?: OpenDirection;
  onClick?: WhisperHandlerWithParam<boolean>;
};

export type DeprecatedBox = WhisperComponent<WhisperComponentType.Box> & {
  /**
   * @deprecated - use {@link Box.justifyContent} instead.
   */
  alignItems?: AlignItems;
  alignment: JustifyContent;
  children: Array<BoxChildComponent>;
  customHeight?: CustomHeight;
  direction: Direction;
  onClick?: WhisperHandler;
};

export type Box = WhisperComponent<WhisperComponentType.Box> & {
  alignItems?: AlignItems;
  children: Array<BoxChildComponent>;
  customHeight?: CustomHeight;
  direction: Direction;
  justifyContent: JustifyContent;
  onClick?: WhisperHandler;
};

export type Component = ChildComponents | CollapseBox | DeprecatedBox;
/**
 * @deprecated - Use {@link Component} instead.
 */
export type Components = Component;

export type BoxChildComponent = ChildComponents | DeprecatedBox;

export interface NewWhisper {
  components: Array<Component>;
  label: string;
  onClose?: () => void;
}

export interface UpdateWhisper {
  label?: string;
  components: Array<Component>;
}

export interface File {
  path: string;
  size: number;
  /**
   * Reads the entirety of the file.
   */
  readFile(): Promise<Uint8Array>;
}
