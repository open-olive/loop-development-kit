declare namespace WhisperService {
  interface Aptitude {
    create: Common.ReadableWithParam<NewWhisper, Whisper>;
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
    | 'textInput';

  type Urgency = 'error' | 'none' | 'success' | 'warning';

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

  type AlignItems = 'center' | 'flex-end' | 'flex-start' | 'stretch';

  type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

  type ButtonSize = 'large' | 'small';

  type ButtonStyle = 'primary' | 'secondary' | 'text';

  type CustomHeight = 'small' | 'medium' | 'large' | 'extraLarge';

  type Direction = 'horizontal' | 'vertical';

  type DateTimeType = 'date' | 'time' | 'date_time';

  type FontWeight = 300 | 400 | 700 | 800;

  type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

  type IconSize = 'small' | 'medium' | 'large' | 'x-large';

  type IconVariant = 'outlined' | 'round' | 'sharp' | 'two-tone';

  type OpenDirection = 'bottom' | 'top';

  type PaginationComponentType = 'pagination' | 'tablePagination';

  type ProgressShape = 'circular' | 'linear';

  type StyleSize = 'none' | 'small' | 'medium' | 'large';

  type Size = 'none' | 'small' | 'medium' | 'large' | 'extraLarge';

  type TextAlign = 'center' | 'left' | 'right';

  type WidthSize = 'full' | 'half';

  type Wrap = 'nowrap' | 'wrap-reverse' | 'wrap';
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

  type WhisperHandler = (error: Error | undefined, whisper: Whisper) => void;
  type WhisperHandlerWithParam<T> = (error: Error | undefined, param: T, whisper: Whisper) => void;

  type AutocompleteOption = {
    label: string;
    value: any; // eslint-disable-line
  };

  interface AutocompleteFilterOptions {
    ignoreAccents?: boolean;
    ignoreCase?: boolean;
    limit?: number;
    matchFrom?: 'any' | 'start';
    stringify?: string[];
    trim?: boolean;
  }

  type Autocomplete = SelectComponent<'autocomplete'> & {
    filterOptions?: AutocompleteFilterOptions;
    label?: string;
    loading?: boolean;
    multiple?: boolean;
    onChange?: WhisperHandlerWithParam<string>;
    onSelect: WhisperHandlerWithParam<string[]>;
    options?: AutocompleteOption[];
    tooltip?: string;
    value?: string;
    freeSolo?: boolean;
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

  type SeriesData = {
    x: number | string | Date;
    y: number | string | Date;
  };

  type SeriesType = 'area' | 'bar' | 'line' | 'mark';

  type Series<T> = {
    color?: SeriesColor;
    data: SeriesData[];
    title: string;
    type: T;
  };

  type AreaSeries = Series<'area'>;

  type LineSeries = Series<'line'> & {
    strokeWidth?: number;
  };

  type MarkSeries = Series<'mark'> & {
    size?: number;
  };

  type VerticalBarSeries = Series<'bar'>;

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
    xAxisTicks?: string[];
    xAxisTickTotal?: number;
    xAxisTickLabelAngle?: number;
    xAxisTimeSeries?: boolean;
    yAxis?: boolean;
    yAxisLabel?: string;
    yAxisTicks?: string[];
    yAxisTickTotal?: number;
    yAxisTickLabelAngle?: number;
    yAxisTimeSeries?: boolean;
  };

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

  type Link = Component<'link'> & {
    href?: string;
    text: string;
    onClick?: WhisperHandler;
    style?: Urgency;
    textAlign?: TextAlign;
    componentStyle?: StyleOptions;
  };

  type Grid = Component<'grid'> & {
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

  type ListPair = Component<'listPair'> & {
    copyable: boolean;
    labelCopyable?: boolean;
    label: string;
    onCopy?: WhisperHandlerWithParam<string>;
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

  type Email = InputComponent<'email', string>;

  type Password = InputComponent<'password', string>;

  type Telephone = InputComponent<'telephone', string>;

  type TextInput = InputComponent<'textInput', string>;

  type NumberInput = InputComponent<'number', number> & {
    max?: number;
    min?: number;
    step?: number;
  };

  type RadioGroup = SelectComponent<'radioGroup'> & {
    onSelect: WhisperHandlerWithParam<number>;
    options: string[];
    selected?: number;
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

  type Checkbox = SelectComponent<'checkbox'> & {
    label: string;
    tooltip?: string;
    value?: boolean;
    onChange: WhisperHandlerWithParam<boolean>;
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

  type Select = SelectComponent<'select'> & {
    label: string;
    options: string[];
    onSelect: WhisperHandlerWithParam<number>;
    excludeDefaultOption?: boolean;
    selected?: number;
    tooltip?: string;
  };

  type SectionTitle = Component<'sectionTitle'> & {
    body: string;
    textAlign?: TextAlign;
    backgroundStyle?: 'white' | 'grey';
  };

  type DateTimeInput = InputComponent<'dateTimeInput', string> & {
    dateTimeType: DateTimeType;
    value?: string;
    min?: string;
    max?: string;
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

  type Divider = Component<'divider'>;

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

  type CollapseBox = Component<'collapseBox'> & {
    children: Array<ChildComponents>;
    label?: string;
    open: boolean;
    openDirection?: OpenDirection;
    onClick?: WhisperHandlerWithParam<boolean>;
    previewHeight?: Size;
  };

  type Box = Component<'box'> & {
    alignItems?: AlignItems;
    alignment: Alignment;
    children: Array<ChildComponents>;
    customHeight?: CustomHeight;
    direction: Direction;
    onClick?: WhisperHandler;
  };

  type Progress = Component<'progress'> & {
    determinate?: number;
    shape?: ProgressShape;
    size?: StyleSize;
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
    | TextInput;

  type Components = ChildComponents | CollapseBox;

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
}
