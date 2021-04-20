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

export interface Box extends WhisperComponent {
  alignment?: Alignment;
  children: WhisperComponent[];
  direction?: Direction;
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

export interface CollapseBox extends WhisperComponent {
  children: WhisperComponent[];
  label?: string;
  open: boolean;
}

export interface Link extends WhisperComponent {
  href?: boolean;
  style?: Urgency;
  onClick?: (value: string) => void;
  text: string;
  textAlign?: TextAlign;
}

export interface ListPair extends WhisperComponent {
  copyable: boolean;
  label: string;
  style: Urgency;
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

export interface Number extends WhisperComponent {
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
  onSelect(): Promise<any>;
  options: Record<string, any>;
  selected?: any;
}

export interface Select extends WhisperComponent {
  label: string;
  onChange(): (value: number) => void;
  tooltip?: string;
  options: Record<string, any>;
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

/**
 * The HTTP Request configuration.
 */
export interface NewWhisper {
  components: WhisperComponent[];
  label: string;
  onClose(): void;
}

export interface Whisper {
  components: WhisperComponent[];
  close(cb: () => void): void;
  id: string;
  label: string;
  onChange(cb: (whisper: Whisper) => void): void;
}

export interface WhisperAptitude {
  all(cb: (whispers: Whisper[]) => void): void;
  create(whisper: NewWhisper): Promise<Whisper>;
}

function all(cb: (whispers: Whisper[]) => void): void {
  return oliveHelps.whisper.all(cb);
}

function create(newWhisper: NewWhisper): Promise<Whisper> {
  return new Promise<Whisper>((resolve, reject) => {
    try {
      oliveHelps.whisper.create(newWhisper, (w: Whisper) => resolve(w))
    } catch (e) {
      reject(e)
    }
  });
}

export const whisper: WhisperAptitude = {
  all,
  create,
};
