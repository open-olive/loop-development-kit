export enum WhisperComponentType {
  BOX = 'box',
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  COLLAPSE_BOX = 'collapseBox',
  DIVIDER = 'divider',
  LINK = 'link',
  LIST_PAIR = 'listPair',
  MARKDOWN = 'markdown',
  MESSAGE = 'message',
  NUMBER = 'number',
  PASSWORD = 'password',
  RADIO_GROUP = 'radioGroup',
  SELECT = 'select',
  TELEPHONE = 'telephone',
  TEXT_INPUT = 'textInput',
}

export enum Alignment {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
  SPACE_AROUND = 'space_around',
  SPACE_EVENLY = 'space_evenly',
}

export enum Direction {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum Urgency {
  ERROR = 'error',
  NONE = 'none',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface WhisperComponent {
  id: string;
  type: string;
}

export interface Button extends WhisperComponent {
  label: string;
  onClick(): Promise<void>;
  submit?: boolean;
}

export interface Checkbox extends WhisperComponent {
  label: string;
  tooltip?: string;
  value?: boolean;
}

export interface Link extends WhisperComponent {
  href?: string;
  style?: string;
  onClick?(): Promise<string>;
  text: string;
  textAlign?: string;
}

export interface ListPair extends WhisperComponent {
  copyable: boolean;
  label: string;
  style?: string;
  value?: string;
}

export interface Markdown extends WhisperComponent {
  body: string;
}

export interface Message extends WhisperComponent {
  body: string;
  header: string;
  style?: Urgency;
  textAlign?: TextAlign;
}

export interface NumberInput extends WhisperComponent {
  label: string;
  max?: number;
  min?: number;
  onChange?(): Promise<number>;
  step?: number;
  tooltip?: string;
  value?: number;
}

export interface Password extends WhisperComponent {
  label: string;
  onChange?(): Promise<string>;
  tooltip?: string;
  value?: string;
}

export interface RadioGroup extends WhisperComponent {
  onSelect(): Promise<any>;
  options: Record<string, any>;
  selected?: any;
}

export interface Select extends WhisperComponent {
  label: string;
  onChange?(): Promise<any>;
  tooltip?: string;
  options: Record<string, any>;
}

export interface Telephone extends WhisperComponent {
  label: string;
  onChange?(): Promise<string>;
  pattern?: RegExp;
  tooltip?: string;
  value?: string;
}

export interface TextInput extends WhisperComponent {
  label: string;
  onChange?(): Promise<string>;
  tooltip?: string;
  value?: string;
}

export interface CollapseBox extends WhisperComponent {
  children: Array<
    | Button
    | Checkbox
    | Link
    | ListPair
    | Markdown
    | Message
    | NumberInput
    | Password
    | RadioGroup
    | Select
    | Telephone
    | TextInput
  >;
  label?: string;
  open: boolean;
}

export interface Box extends WhisperComponent {
  alignment: string;
  children: Array<
    | Button
    | Checkbox
    | ListPair
    | Markdown
    | Message
    | NumberInput
    | Password
    | RadioGroup
    | Select
    | Telephone
    | TextInput
  >;
  direction: string;
}

/**
 * The HTTP Request configuration.
 */
export interface NewWhisper {
  components: Array<
    | Box
    | Button
    | Checkbox
    | ListPair
    | Markdown
    | Message
    | NumberInput
    | Password
    | RadioGroup
    | Select
    | Telephone
    | TextInput
  >;
  label: string;
}

export interface Whisper {
  components: Array<
    | Box
    | Button
    | Checkbox
    | ListPair
    | Markdown
    | Message
    | NumberInput
    | Password
    | RadioGroup
    | Select
    | Telephone
    | TextInput
  >;
  close(cb: () => void): void;
  id: string;
  label: string;
  onChange(cb: (whisper: Whisper) => void): void;
}

export interface WhisperAptitude {
  all(cb: (whispers: Whisper[]) => void): void;
  create(whisper: Whisper, cb: (whisper: Whisper) => void): void;
}

function all(cb: (whispers: Whisper[]) => void): void {
  return oliveHelps.whisper.all(cb);
}

function create(whisper: NewWhisper, cb: (whisper: Whisper) => void): void {
  return oliveHelps.whisper.create(whisper, cb);
}

export const whisper: WhisperAptitude = {
  all,
  create,
};

/* Argument of type '(whispers: import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Whisper[]) => void' is not assignable to parameter of type '(whispers: OliveHelps.Whisper[]) => void'.
  Types of parameters 'whispers' and 'whispers' are incompatible.
    Type 'OliveHelps.Whisper[]' is not assignable to type 'import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Whisper[]'.
      Type 'OliveHelps.Whisper' is not assignable to type 'import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Whisper'.
        Types of property 'components' are incompatible.
          Type '(OliveHelps.Button | OliveHelps.Checkbox | OliveHelps.Markdown | OliveHelps.Message | OliveHelps.NumberInput | ... 5 more ... | OliveHelps.Box)[]' is not assignable to type '(import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Button | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Checkbox | ... 8 more ... | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Box)[]'.
            Type 'OliveHelps.Button | OliveHelps.Checkbox | OliveHelps.Markdown | OliveHelps.Message | OliveHelps.NumberInput | ... 5 more ... | OliveHelps.Box' is not assignable to type 'import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Button | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Checkbox | ... 8 more ... | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Box'.
              Type 'Box' is not assignable to type 'Button | Checkbox | Markdown | Message | NumberInput | Password | RadioGroup | Select | Telephone | TextInput | Box'.
                Type 'OliveHelps.Box' is not assignable to type 'import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Box'.
                  Types of property 'children' are incompatible.
                    Type '(OliveHelps.Button | OliveHelps.Checkbox | OliveHelps.Link | OliveHelps.ListPair | OliveHelps.Markdown | OliveHelps.Message | ... 5 more ... | OliveHelps.TextInput)[]' is not assignable to type '(import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Button | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Checkbox | ... 9 more ... | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").TextInput)[]'.
                      Type 'OliveHelps.Button | OliveHelps.Checkbox | OliveHelps.Link | OliveHelps.ListPair | OliveHelps.Markdown | OliveHelps.Message | ... 5 more ... | OliveHelps.TextInput' is not assignable to type 'import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Button | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Checkbox | ... 9 more ... | import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").TextInput'.
                        Type 'Link' is not assignable to type 'Button | Checkbox | Link | ListPair | Markdown | Message | NumberInput | Password | RadioGroup | Select | Telephone | TextInput'.
                          Type 'OliveHelps.Link' is not assignable to type 'import("/Users/brettmugglin/Projects/loop-development-kit/ldk/goja/src/whisper/index").Link'.
                            Types of property 'style' are incompatible.
                              Type 'string | undefined' is not assignable to type 'Urgency | undefined'.
                                Type 'string' is not assignable to type 'Urgency | undefined'. */
