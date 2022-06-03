declare namespace WhisperService {
  interface Aptitude {
    create: Common.ReadableWithParam<NewWhisper, Whisper>;
  }

  interface AutocompleteFilterOptions {
    ignoreAccents?: boolean;
    ignoreCase?: boolean;
    limit?: number;
    matchFrom?: 'any' | 'start';
    stringify?: string[];
    trim?: boolean;
  }

  interface AutocompleteMatchSorterOptions {
    keepDiacritics?: boolean;
    keys?: string[];
    recipe?: CaseTypes;
    threshold?: MatchSorterRankings;
  }

  interface Component<T extends WhisperComponentType> {
    id?: string;
    type: T;
    key?: string;
    layout?: LayoutOptions;
  }

  interface InputComponent<T1 extends WhisperComponentType, T2> extends Component<T1> {
    disabled?: boolean;
    label: string;
    tooltip?: string;
    validationError?: string;
    value?: T2;
    onBlur?: (error: Error | undefined) => void;
    onFocus?: (error: Error | undefined) => void;
    onChange: WhisperHandlerWithParam<T2>;
  }

  interface SelectComponent<T extends WhisperComponentType> extends Component<T> {
    disabled?: boolean;
    validationError?: string;
  }

  interface LayoutOptions {
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

  interface StyleOptions {
    fontWeight?: FontWeight;
  }

  interface Whisper {
    id: string;
    close: Common.Readable<undefined>;

    update(whisper: UpdateWhisper, cb?: (err: Error) => void): void;
  }

  interface NewWhisper {
    label: string;
    components: Array<Components>;
    onClose?: () => void;
  }

  interface UpdateWhisper {
    label?: string;
    components: Array<Components>;
  }

  interface File {
    path: string;
    size: number;
    readFile: Common.Readable<ArrayBuffer>;
  }

  type WhisperComponentType =
    | 'autocomplete'
    | 'box'
    | 'breadcrumbs'
    | 'button'
    | 'chart'
    | 'checkbox'
    | 'collapseBox'
    | 'dateTimeInput'
    | 'divider'
    | 'dropZone'
    | 'email'
    | 'grid'
    | 'icon'
    | 'link'
    | 'listPair'
    | 'markdown'
    | 'message'
    | 'number'
    | 'pagination'
    | 'password'
    | 'progress'
    | 'radioGroup'
    | 'rating'
    | 'richTextEditor'
    | 'select'
    | 'sectionTitle'
    | 'telephone'
    | 'textInput'
    | 'typography';

  type Alignment =
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'left'
    | 'normal'
    | 'right'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';

  type Align = 'center' | 'inherit' | 'justify' | 'left' | 'right';

  type AlignItems = 'center' | 'flex-end' | 'flex-start' | 'stretch';

  type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

  type AxisScale = 'linear' | 'ordinal' | 'time';

  type ButtonSize = 'large' | 'small';

  type ButtonStyle = 'primary' | 'secondary' | 'text';

  type CaseTypes = 'camelCase' | 'kebab-case' | 'PascalCase' | 'snake_case';

  type CustomHeight = 'small' | 'medium' | 'large' | 'extraLarge';

  type Direction = 'horizontal' | 'vertical';

  type DateTimeType = 'date' | 'time' | 'date_time';

  type FontWeight = 300 | 400 | 700 | 800;

  type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

  type Height = 'small' | 'medium' | 'large' | 'extraLarge';

  type IconSize = 'small' | 'medium' | 'large' | 'x-large';

  type IconVariant = 'outlined' | 'round' | 'sharp' | 'two-tone';

  type MatchSorterRankings = 'ACRONYM' | 'CASE_SENSITIVE_EQUAL' | 'CONTAINS' | 'EQUAL' | 'MATCHES'

  type MaxHeight = 'small' | 'medium' | 'large' | 'extraLarge';

  type MinHeight = 'small' | 'medium' | 'large' | 'extraLarge';

  type OpenDirection = 'bottom' | 'top';

  type PaginationComponentType = 'pagination' | 'tablePagination';

  type ProgressShape = 'circular' | 'linear';

  type SeriesColor =
    | '#29C6F8'
    | '#410099'
    | '#FD9743'
    | '#52E48D'
    | '#EB473B'
    | '#FDD443'
    | '#B388FF'
    | '#C5457A'
    | '#FF7F78'
    | '#651FFF';

  type SeriesType = 'area' | 'line' | 'mark' | 'verticalBar';

  type StyleSize = 'none' | 'small' | 'medium' | 'large';

  type Size = 'none' | 'small' | 'medium' | 'large' | 'extraLarge';

  type TextAlign = 'center' | 'left' | 'right';

  type Urgency = 'error' | 'none' | 'success' | 'warning';

  type Variant =
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';

  type WidthSize = 'full' | 'half';

  type Wrap = 'nowrap' | 'wrap-reverse' | 'wrap';

  type WhisperHandler = (error: Error | undefined, whisper: Whisper) => void;
  type WhisperHandlerWithParam<T> = (error: Error | undefined, param: T, whisper: Whisper) => void;

  type AutocompleteOption = {
    label: string;
    value: any; // eslint-disable-line
  };

  type SeriesData = {
    x: number | string | Date;
    y: number | string | Date;
  };

  type Series<T> = {
    color?: SeriesColor;
    data: SeriesData[];
    title: string;
    type: T;
  };

  // Component Section
  type Box = Component<'box'> & {
    alignItems?: AlignItems;
    alignment: Alignment;
    children: Array<ChildComponents>;
    customHeight?: CustomHeight;
    direction: Direction;
    height?: Height;
    maxHeight?: MaxHeight;
    minHeight?: MinHeight;
    onClick?: WhisperHandler;
  };

  type Breadcrumbs = Component<'breadcrumbs'> & {
    links: Link[];
  };

  type Button = Component<'button'> & {
    buttonStyle?: ButtonStyle;
    disabled?: boolean;
    label: string;
    onClick: WhisperHandler;
    size?: ButtonSize;
    tooltip?: string;
  };

  type Chart = Component<'chart'> & {
    chartTitle?: string;
    heightToWidthRatio?: number;
    horizontalGridLines?: boolean;
    horizontalLineTotal?: number;
    margin?: {
      bottom?: number;
      left?: number;
      right?: number;
      top?: number;
    };
    series: Series<SeriesType>[];
    showCrosshair?: boolean;
    verticalGridLines?: boolean;
    verticalLineTotal?: number;
    xAxis?: boolean;
    xAxisLabel?: string;
    xAxisPadding?: number;
    xAxisScale?: AxisScale;
    xAxisTickTotal?: number;
    xAxisTickLabelAngle?: number;
    yAxis?: boolean;
    yAxisLabel?: string;
    yAxisPadding?: number;
    yAxisScale?: AxisScale;
    yAxisTickTotal?: number;
    yAxisTickLabelAngle?: number;
  };

  type Checkbox = SelectComponent<'checkbox'> & {
    label: string;
    tooltip?: string;
    value?: boolean;
    onChange: WhisperHandlerWithParam<boolean>;
  };

  type CollapseBox = Component<'collapseBox'> & {
    children: Array<ChildComponents>;
    label?: string;
    open: boolean;
    openDirection?: OpenDirection;
    onClick?: WhisperHandlerWithParam<boolean>;
    previewHeight?: Size;
  };

  type Divider = Component<'divider'>;

  type DropZone = Component<'dropZone'> & {
    accept?: string[];
    label: string;
    limit?: number;
    messaging?: {
      accept?: string;
      click?: string;
      drop?: string;
      limit?: string;
    };
    noun?: string;
    onDrop: WhisperHandlerWithParam<File[]>;
    onRemove?: WhisperHandlerWithParam<File[]>;
    value?: File[];
    tooltip?: string;
    validationError?: string;
  };

  type Grid = Component<'grid'> & {
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

  type Icon = Component<'icon'> & {
    color?: 'black' | 'whisper-strip' | 'white' | 'grey';
    disabled?: boolean;
    name: string;
    onClick?: WhisperHandler;
    size?: IconSize;
    tooltip?: string;
    variant?: IconVariant;
  };

  type Link = Component<'link'> & {
    href?: string;
    text: string;
    onClick?: WhisperHandler;
    style?: Urgency;
    textAlign?: TextAlign;
    componentStyle?: StyleOptions;
  };

  type ListPair = Component<'listPair'> & {
    copyable: boolean;
    labelCopyable?: boolean;
    label: string;
    onLabelCopy?: WhisperHandlerWithParam<string>;
    onValueCopy?: WhisperHandlerWithParam<string>;
    value: string;
    style: Urgency;
  };

  type Markdown = Component<'markdown'> & {
    copyable?: 'body';
    body: string;
    onCopy?: WhisperHandler;
    tooltip?: string;
    onLinkClick?: WhisperHandlerWithParam<string>;
  };

  type Message = Component<'message'> & {
    copyable?: 'body' | 'header';
    body?: string;
    header?: string;
    onCopy?: WhisperHandler;
    style?: Urgency | 'accent' | 'black' | 'grey';
    textAlign?: TextAlign;
    tooltip?: string;
  };

  type Pagination = Component<'pagination'> & {
    count: number;
    component?: PaginationComponentType;
    disabled?: boolean;
    labelRowsPerPage?: string;
    onChange?: WhisperHandlerWithParam<string>;
    onRowsPerPageChange?: WhisperHandlerWithParam<string>;
    page: number;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
  };

  type Progress = Component<'progress'> & {
    determinate?: number;
    label?: string;
    shape?: ProgressShape;
    size?: StyleSize;
  };

  type Rating = Component<'rating'> & {
    defaultValue?: number;
    disabled?: boolean;
    emptyIcon?: string;
    emptyIconColor?: string;
    emptyIconVariant?: IconVariant;
    icon?: string;
    iconColor?: string;
    iconVariant?: IconVariant;
    max?: number;
    name?: string;
    onChange?: WhisperHandlerWithParam<number>;
    precision?: number;
    readOnly?: boolean;
    size?: IconSize;
    value?: number;
  };

  type RichTextEditor = Component<'richTextEditor'> & {
    disabled?: boolean;
    onBlur?: (error: Error | undefined) => void;
    onChange: WhisperHandlerWithParam<string>;
    onFocus?: (error: Error | undefined) => void;
    tooltip?: string;
    validationError?: string;
    value?: string;
  };

  type SectionTitle = Component<'sectionTitle'> & {
    body: string;
    textAlign?: TextAlign;
    backgroundStyle?: 'white' | 'grey';
  };

  type Typography = Component<'typography'> & {
    align?: Align;
    body: string;
    paragraph?: boolean;
    tooltip?: string;
    variant?: Variant;
  };

  // Input Component Section
  type DateTimeInput = InputComponent<'dateTimeInput', string> & {
    dateTimeType: DateTimeType;
    value?: string;
    min?: string;
    max?: string;
  };

  type Email = InputComponent<'email', string>;

  type Password = InputComponent<'password', string>;

  type Telephone = InputComponent<'telephone', string>;

  type TextInput = InputComponent<'textInput', string>;

  type NumberInput = InputComponent<'number', number> & {
    max?: number;
    min?: number;
    step?: number;
  };

  //  Select Component Section
  type Autocomplete = SelectComponent<'autocomplete'> & {
    label?: string;
    loading?: boolean;
    multiple?: boolean;
    onChange?: WhisperHandlerWithParam<string>;
    onSelect: WhisperHandlerWithParam<string[]>;
    options?: AutocompleteOption[];
    tooltip?: string;
    value?: string;
    freeSolo?: boolean;
  } & (AutocompleteMatchSorter | AutocompleteFilter)

  type AutocompleteFilter = {
    filterOptions?: AutocompleteFilterOptions;
    matchSorter?: never;
  }

  type AutocompleteMatchSorter = {
    filterOptions?: never;
    matchSorter?: AutocompleteMatchSorterOptions;
  }

  type RadioGroup = SelectComponent<'radioGroup'> & {
    onSelect: WhisperHandlerWithParam<number>;
    options: string[];
    selected?: number;
  };

  type Select = SelectComponent<'select'> & {
    label: string;
    options: string[];
    onSelect: WhisperHandlerWithParam<number>;
    excludeDefaultOption?: boolean;
    selected?: number;
    tooltip?: string;
  };

  // Series
  type AreaSeries = Series<'area'>;

  type LineSeries = Series<'line'> & {
    strokeWidth?: number;
  };

  type MarkSeries = Series<'mark'> & {
    size?: number;
  };

  type VerticalBarSeries = Series<'verticalBar'> & {
    barWidth?: number;
  };

  type ChildComponents =
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
    | SectionTitle
    | Select
    | Telephone
    | TextInput
    | Typography;

  type Components = ChildComponents | CollapseBox;
}
