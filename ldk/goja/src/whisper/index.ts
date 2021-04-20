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
  id?: string;
  type: string;
}

export interface Button extends WhisperComponent {
  label: string;
  onClick: () => void
  submit?: boolean;
}

export interface Checkbox extends WhisperComponent {
  label: string;
  tooltip?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
}

export interface Link extends WhisperComponent {
  href?: string;
  style?: Urgency;
  onClick?: (value: string) => void;
  text: string;
  textAlign?: string;
}

export interface ListPair extends WhisperComponent {
  copyable: boolean;
  label: string;
  style?: Urgency;
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
  onChange?: (value: string) => void;
  step?: number;
  tooltip?: string;
  value?: number;
}

export interface Password extends WhisperComponent {
  label: string;
  onChange?: (value: string) => void;
  tooltip?: string;
  value?: string;
}

export interface RadioGroup extends WhisperComponent {
  onSelect: (value: number) => void;
  options: string[];
  selected?: any;
}

export interface Select extends WhisperComponent {
  label: string;
  onSelect: (value: number) => void;
  tooltip?: string;
  options: string[];
}

export interface Telephone extends WhisperComponent {
  label: string;
  onChange?: (value: string) => void;
  pattern?: RegExp;
  tooltip?: string;
  value?: string;
}

export interface TextInput extends WhisperComponent {
  label: string;
  onChange?: (value: string) => void;
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
    | CollapseBox
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
  direction: string;
}

export interface NewWhisper {
  components: Array<
    | Box
    | Button
    | Checkbox
    | CollapseBox
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
  label: string;
  onClose: () => void;
}

export interface Whisper {
  id: string;
  label: string;
  components: Array<
    | Box
    | Button
    | Checkbox
    | CollapseBox
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
  close(callback: () => void): void;
}

export interface WhisperAptitude {
  create(whisper: NewWhisper): Promise<Whisper>;
  /**
   * Returns a promise which provides a list of all of the current whispers in Olive Helps
   */
  all(): Promise<Whisper[]>;

  /**
   * Adds a new whisper to Olive Helps based on the configuration provided.
   * Returns a promise which provides a reference to the newly created whisper 
   *
   * @param whisper The configuration for the whisper being created
   */
  create(whisper: NewWhisper): Promise<Whisper>;
}

function all(): Promise<Whisper[]> {
  return new Promise<Whisper[]>((resolve, reject) => {
    try {
      oliveHelps.whisper.all((whispers: Whisper[]) => resolve(whispers));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function create(whisper: NewWhisper): Promise<Whisper> {
  return new Promise<Whisper>((resolve, reject) => {
    try {
      oliveHelps.whisper.create(whisper, (w: Whisper) => resolve(w))
    } catch (e) {
      reject(e)
    }
  });
}

export const whisper: WhisperAptitude = {
  all,
  create,
};
