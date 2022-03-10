declare namespace WhisperService {
  interface Aptitude {
    create: Common.ReadableWithParam<NewWhisper, Whisper>;
  }

  type WhisperComponentType =
    | 'autocomplete'
    | 'box'
    | 'breadcrumbs'
    | 'button'
    | 'checkbox'
    | 'collapseBox'
    | 'dateTimeInput'
    | 'divider'
    | 'dropZone'
    | 'email'
    | 'icon'
    | 'link'
    | 'listPair'
    | 'markdown'
    | 'message'
    | 'number'
    | 'password'
    | 'progress'
    | 'radioGroup'
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

  type ButtonSize = 'large' | 'small';

  type ButtonStyle = 'primary' | 'secondary' | 'text';

  type CustomHeight = 'small' | 'medium' | 'large' | 'extraLarge';

  type Direction = 'horizontal' | 'vertical';

  type DateTimeType = 'date' | 'time' | 'date_time';

  type FontWeight = 300 | 400 | 700 | 800;

  type IconSize = 'small' | 'medium' | 'large' | 'x-large';

  type OpenDirection = 'bottom' | 'top';

  type ProgressShape = 'circular' | 'linear';

  type StyleSize = 'none' | 'small' | 'medium' | 'large';

  type TextAlign = 'center' | 'left' | 'right';

  type WidthSize = 'full' | 'half';

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
    name: string;
    size?: IconSize;
    color?: 'black' | 'whisper-strip' | 'white' | 'grey';
    onClick?: WhisperHandler;
    tooltip?: string;
  };

  type Divider = Component<'divider'>;

  type CollapseBox = Component<'collapseBox'> & {
    children: Array<ChildComponents>;
    label?: string;
    open: boolean;
    openDirection?: OpenDirection;
    onClick?: WhisperHandlerWithParam<boolean>;
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
    | Checkbox
    | Divider
    | DropZone
    | Email
    | Link
    | ListPair
    | Markdown
    | Message
    | NumberInput
    | Password
    | Progress
    | RadioGroup
    | RichTextEditor
    | Select
    | Telephone
    | TextInput
    | DateTimeInput
    | Icon
    | SectionTitle;

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
