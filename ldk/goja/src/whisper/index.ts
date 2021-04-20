enum WhisperComponentType {
  Box = 'box',
  Button = 'button',
  Checkbox = 'checkbox',
  CollapseBox = 'collapseBox',
  Divider = 'divider',
  Email = 'email',
  Link = 'link',
  ListPair = 'listPair',
  Markdown = 'markdown',
  Message = 'message',
  Number = 'number',
  Password = 'password',
  RadioGroup = 'radioGroup',
  Select = 'select',
  Telephone = 'telephone',
  TextInput = 'textInput',
}

export enum Alignment {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  SpaceAround = 'space_around',
  SpaceEvenly = 'space_evenly',
}

export enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum TextAlign {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum Urgency {
  Error = 'error',
  None = 'none',
  Success = 'success',
  Warning = 'warning',
}

export interface WhisperComponent {
  id?: string;
  type: WhisperComponentType;
}

export interface Button extends WhisperComponent {
  label: string;
  onClick: () => void;
}

export interface Checkbox extends WhisperComponent {
  label: string;
  tooltip?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export interface Email extends WhisperComponent {
  label: string;
  onChange: (value: string) => void;
  tooltip?: string;
  value?: string;
}

export interface Link extends WhisperComponent {
  href?: string;
  text: string;
  onClick?: () => void;
  style?: Urgency;
  textAlign?: TextAlign;
}

export interface ListPair extends WhisperComponent {
  copyable: boolean;
  label: string;
  value: string;
  style: Urgency;
}

export interface Markdown extends WhisperComponent {
  body: string;
}

export interface Message extends WhisperComponent {
  body?: string;
  header?: string;
  style?: Urgency;
  textAlign?: TextAlign;
}

export interface NumberInput extends WhisperComponent {
  label: string;
  onChange: (value: number) => void;
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  tooltip?: string;
}

export interface Password extends WhisperComponent {
  label: string;
  onChange: (value: string) => void;
  tooltip?: string;
  value?: string;
}

export interface RadioGroup extends WhisperComponent {
  onSelect: (value: number) => void;
  options: string[];
  selected?: number;
}

export interface Select extends WhisperComponent {
  label: string;
  options: string[];
  onSelect: (value: number) => void;
  selected?: number;
  tooltip?: string;
}

export interface Telephone extends WhisperComponent {
  label: string;
  onChange: (value: string) => void;
  // pattern?: RegExp; TODO: Implement this
  tooltip?: string;
  value?: string;
}

export interface TextInput extends WhisperComponent {
  label: string;
  onChange: (value: string) => void;
  tooltip?: string;
  value?: string;
}

export type Divider = WhisperComponent;

export type Components =
  | Button
  | Checkbox
  | Divider
  | Email
  | Link
  | ListPair
  | Markdown
  | Message
  | NumberInput
  | Password
  | RadioGroup
  | Select
  | Telephone
  | TextInput;

export interface CollapseBox extends WhisperComponent {
  children: Array<Components>;
  label?: string;
  open: boolean;
}

export interface Box extends WhisperComponent {
  alignment: Alignment;
  children: Array<Components>;
  direction: Direction;
}

export interface NewWhisper {
  components: Array<Box | Components | CollapseBox>;
  label: string;
  onClose: () => void;
}

export interface Whisper {
  id: string;
  label: string;
  components: Array<Box | Components | CollapseBox>;
  close(callback: () => void): void;
}

export interface WhisperAptitude {
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
      oliveHelps.whisper.create(whisper, (w: Whisper) => resolve(w));
    } catch (e) {
      reject(e);
    }
  });
}

export const whisper: WhisperAptitude = {
  all,
  create,
};
