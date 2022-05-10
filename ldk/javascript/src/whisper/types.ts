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
  /**
   * A graph charting component
   */
  Chart = 'chart',
  Checkbox = 'checkbox',
  /**
   * A container component to allow content to be opened and closed with a button click.
   */
  CollapseBox = 'collapseBox',
  /**
   * A text input field allows the user to provide date and time information.
   *
   * The field can be pre-populated by the loop.
   */
  DateTimeInput = 'dateTimeInput',
  /**
   * This component shows a horizontal divider to separate different kinds on content in a whisper. This component has no options.
   */
  Divider = 'divider',
  /**
   * The dropzone component allows the Loop to receive a file uploaded by a user
   */
  DropZone = 'dropZone',
  /**
   * The text input field allows the user to provide an email address.
   */
  Email = 'email',
  /**
   * The Icon Component renders requested icon inside of a whisper. Icons can be placed inside of Box components.
   */
  Icon = 'icon',
  /**
   * This component shows a link that can either open a link in the user's default browser or function as an `onClick` to allow for loops to do things like send a new whisper.
   */
  Link = 'link',
  /**
   * This component creates grid and adapts to Olive Helps size and orientation, ensuring consistency across layouts.
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
   * Rating gives a multi-icon cluster to show or give ratings
   */
  Rating = 'rating',
  /**
   *  The RichTextEditor gives users a text area that allows users to add text with styling (bold, italics, links, etc)
   */
  RichTextEditor = 'richTextEditor',
  /**
   * The SectionTitle component adds a background that stretches across the entire whisper to the provided text
   */
  SectionTitle = 'sectionTitle',
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
  Typography = 'typography',
}

export enum Align {
  Center = 'center',
  Inherit = 'inherit',
  Justify = 'justify',
  Left = 'left',
  Right = 'right',
}

export enum AlignItems {
  Center = 'center',
  FlexEnd = 'flex-end',
  FlexStart = 'flex-start',
  Stretch = 'stretch',
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

export enum Size {
  None = 'none',
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

export enum SeriesColor {
  Blue = '#29C6F8',
  DarkPurple = '#410099',
  Green = '#52E48D',
  LightPurple = '#B388FF',
  Orange = '#FD9743',
  Pink = '#C5457A',
  Purple = '#651FFF',
  Red = '#EB473B',
  Salmon = '#FF7F78',
  Yellow = '#FDD443',
}

export enum SeriesType {
  Area = 'area',
  Line = 'line',
  Mark = 'mark',
  VerticalBar = 'verticalBar',
}

export enum AxisScale {
  /**
   * A continuous scale that works with numbers
   */
  Linear = 'linear',
  /**
   * A discrete, ordered set that works with numbers or strings. For example,
   * the x values could contain the months of the year in string form.
   */
  Ordinal = 'ordinal',
  /**
   * Used for time series. X values will be interpreted as Unix epoch time.
   */
  Time = 'time',
}

export enum Variant {
  Body1 = 'body1',
  Body2 = 'body2',
  Button = 'button',
  Caption = 'caption',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Inherit = 'inherit',
  Overline = 'overline',
  Subtitle1 = 'subtitle1',
  Subtitle2 = 'subtitle2',
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

export type Typography = WhisperComponent<WhisperComponentType.Typography> & {
  align?: Align;
  body: string;
  paragraph?: boolean;
  tooltip?: string;
  variant?: Variant;
};

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

export type SeriesData = {
  /**
   * The plot point on the X axis
   */
  x: number | string | Date;
  /**
   * The plot point on the Y axis
   */
  y: number | string | Date;
};

export type Series<T> = {
  /**
   * Color of this series
   */
  color?: SeriesColor;
  /**
   * Array of plot points on the graph
   */
  data: SeriesData[];
  /**
   * Title given to this series in a legend below the chart
   */
  title: string;
  /**
   * The type of graphing. Current options are area, line, mark or vertical bar graphs.
   *
   * See: {@link SeriesType}
   */
  type: T;
};

export type AreaSeries = Series<SeriesType.Area>;

export type LineSeries = Series<SeriesType.Line> & {
  /**
   * Set the stroke width of the line in a line graph
   */
  strokeWidth?: number;
};

export type MarkSeries = Series<SeriesType.Mark> & {
  /**
   * Set the size of the points in a mark graph
   */
  size?: number;
};

export type VerticalBarSeries = Series<SeriesType.VerticalBar> & {
  /**
   * Sets the width of the bars
   * @default 1
   */
  barWidth?: number;
};

/**
 * @beta released to third-party developers experimentally for the purpose of collecting feedback
 * Chart component for displaying data sets
 */
export type Chart = WhisperComponent<WhisperComponentType.Chart> & {
  /**
   * The title of the chart that displays above it
   */
  chartTitle?: string;
  /**
   * The height to width ratio of the chart
   *
   * For example: 0.5 would be a short & wide chart, 2.0 would be a tall & thin chart
   * @default 1.0
   */
  heightToWidthRatio?: number;
  /**
   * An option to enable/disable the horizontal grid lines
   * @default true
   */
  horizontalGridLines?: boolean;
  /**
   * The total number horizontal grid lines
   */
  horizontalLineTotal?: number;
  /**
   * Set the inside margins of the chart
   * @default { bottom: 40, left: 40, right: 10, top: 10 }
   */
  margin?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  /**
   * An array of series options and data, limited to 10 total (10 series, not 10 plot points)
   */
  series: Series<SeriesType>[];
  /**
   * An option to enable/disable the tooltip that appears when hovering over plot points
   *
   * The crosshair will only appear for the first series
   * @default true
   */
  showCrosshair?: boolean;
  /**
   * An option to enable/disable the vertical grid lines
   * @default true
   */
  verticalGridLines?: boolean;
  /**
   * The total number vertical grid lines
   */
  verticalLineTotal?: number;
  /**
   * An option to enable/disable the X axis
   * @default true
   */
  xAxis?: boolean;
  /**
   * Define a custom label for the X axis
   */
  xAxisLabel?: string;
  /**
   * Sets left and right padding for the X axis as a percentage of the chart width.
   * Half of the value is applied to each side.
   * @default 0
   */
  xAxisPadding?: number;
  /**
   * Sets the {@link AxisScale} of the X axis
   * @default AxisScale.Linear
   */
  xAxisScale?: AxisScale;
  /**
   * Define the total number of ticks on the X axis
   */
  xAxisTickTotal?: number;
  /**
   * Define the rotation angle of the ticks on the X axis
   * @default 0
   */
  xAxisTickLabelAngle?: number;
  /**
   * An option to enable/disable the Y axis
   * @default true
   */
  yAxis?: boolean;
  /**
   * Define a custom label for the Y axis
   */
  yAxisLabel?: string;
  /**
   * Sets top and bottom padding for the Y axis as a percentage of the chart width.
   * Half of the value is applied to each side.
   * @default 0
   */
  yAxisPadding?: number;
  /**
   * Sets the {@link AxisScale} of the Y axis
   * @default AxisScale.Linear
   */
  yAxisScale?: AxisScale;
  /**
   * Define the total number of ticks on the Y axis
   */
  yAxisTickTotal?: number;
  /**
   * Define the rotation angle of the ticks on the Y axis
   * @default 0
   */
  yAxisTickLabelAngle?: number;
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

export type Rating = WhisperComponent<WhisperComponentType.Rating> & {
  /**
   * Value that this input starts at if not provided.
   */
  defaultValue?: number;
  /**
   * If true, greys out and prevents the value from changing.
   */
  disabled?: boolean;
  /**
   * The snake case name of the material icon you wish you use for "empty" rating icons
   *
   * @default 'star_border'
   * @example ['star', 'add_circle']
   */
  emptyIcon?: string;
  /**
   * The hex code for the empty icons.
   *
   * @default '#661fff'
   */
  emptyIconColor?: string;
  /**
   * The variant type for the empty icons.
   */
  emptyIconVariant?: IconVariant;
  /**
   * The snake case name of the material icon you wish you use for "filled" rating icons
   *
   * @default 'star'
   * @example ['star', 'add_circle']
   */
  icon?: string;
  /**
   * The hex code for the filled icons.
   *
   * @default '#661fff'
   */
  iconColor?: string;
  /**
   * The variant type for the filled icons.
   */
  iconVariant?: IconVariant;
  /**
   * The maximum rating that someone can give.
   */
  max?: number;
  /**
   * The "name" attribute used in HTML, attached to this input.
   */
  name?: string;
  /**
   * Function which is triggered whenever the value is changed.
   */
  onChange?: WhisperHandlerWithParam<number>;
  /**
   * The precision with which someone can provide a rating
   *
   * @default 1
   * @example [1, 0.5]
   */
  precision?: number;
  /**
   * If true, the rating is read only, and is not editable.
   */
  readOnly?: boolean;
  /**
   * The size of the icons in the component.
   */
  size?: IconSize;
  /**
   * If provided, sets the value for the rating.
   */
  value?: number;
};

export type Icon = WhisperComponent<WhisperComponentType.Icon> & {
  color?: Color.Black | Color.Grey | Color.White | Color.WhisperStrip | Color.Accent;
  disabled?: boolean;
  name: string;
  onClick?: WhisperHandler;
  size?: IconSize;
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
  container?: boolean;
  children: Array<ChildComponents>;
  direction?: GridDirection;
  justifyContent?: JustifyContent;
  item?: boolean;
  spacing?: number;
  wrap?: Wrap;
  xs?: string;
};

export type ChildComponents =
  | Autocomplete
  | Box
  | Breadcrumbs
  | Button
  | Chart
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
  | Rating
  | RichTextEditor
  | Select
  | SectionTitle
  | Telephone
  | TextInput
  | Typography;

export type CollapseBox = WhisperComponent<WhisperComponentType.CollapseBox> & {
  children: Array<ChildComponents>;
  label?: string;
  open: boolean;
  openDirection?: OpenDirection;
  onClick?: WhisperHandlerWithParam<boolean>;
  previewHeight?: Size;
};

export type Box = WhisperComponent<WhisperComponentType.Box> & {
  alignItems?: AlignItems;
  children: Array<BoxChildComponent>;
  customHeight?: CustomHeight;
  direction: Direction;
  justifyContent: JustifyContent;
  onClick?: WhisperHandler;
};

export type Component = ChildComponents | CollapseBox;
/**
 * @deprecated - Use {@link Component} instead.
 */
export type Components = Component;

export type BoxChildComponent = ChildComponents;

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
