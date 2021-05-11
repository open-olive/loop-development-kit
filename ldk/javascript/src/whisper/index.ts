import { promisifyWithParam } from '../promisify';

export enum WhisperComponentType {
  /**
   * A container component for formatting other components.
   */
  Box = 'box',
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
   * The password input field allows the user to provide a password. This field protects the user by obscuring what they type. Showing each character as a solid black dot.
   */
  Password = 'password',
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
   * The text input field allows the user to provide an email address.
   */
  Telephone = 'telephone',
  /**
   * The text input field allows the user to provide text information.
   *
   * The text can be pre-populated by the loop.
   */
  TextInput = 'textInput',
}

export enum Alignment {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  SpaceAround = 'space_around',
  SpaceEvenly = 'space_evenly',
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

export interface Whisper {
  id: string;
  close(cb:(err: string) => void): void;
  // update(whisper: NewWhisper, cb: (err: string) => void): void
}

export interface WhisperComponent<T extends WhisperComponentType> {
  id?: string;
  type: T;
}

export declare type Button = WhisperComponent<WhisperComponentType.Button> & {
  buttonStyle?: ButtonStyle;
  label: string;
  onClick: (whisper: Whisper) => void;
  size?: ButtonSize;
};

export declare type Checkbox = WhisperComponent<WhisperComponentType.Checkbox> & {
  label: string;
  tooltip?: string;
  value: boolean;
  onChange: (value: boolean, whisper: Whisper) => void;
};

export declare type Email = WhisperComponent<WhisperComponentType.Email> & {
  label: string;
  onChange: (value: string, whisper: Whisper) => void;
  tooltip?: string;
  value?: string;
};

export declare type Link = WhisperComponent<WhisperComponentType.Link> & {
  href?: string;
  text: string;
  onClick?: (whisper: Whisper) => void;
  style?: Urgency;
  textAlign?: TextAlign;
};

export declare type ListPair = WhisperComponent<WhisperComponentType.ListPair> & {
  copyable: boolean;
  label: string;
  value: string;
  style: Urgency;
};

export declare type Markdown = WhisperComponent<WhisperComponentType.Markdown> & {
  body: string;
};

export declare type Message = WhisperComponent<WhisperComponentType.Message> & {
  body?: string;
  header?: string;
  style?: Urgency;
  textAlign?: TextAlign;
};

export declare type NumberInput = WhisperComponent<WhisperComponentType.Number> & {
  label: string;
  onChange: (value: number, whisper: Whisper) => void;
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  tooltip?: string;
};

export declare type Password = WhisperComponent<WhisperComponentType.Password> & {
  label: string;
  onChange: (value: string, whisper: Whisper) => void;
  tooltip?: string;
  value?: string;
};

export declare type RadioGroup = WhisperComponent<WhisperComponentType.RadioGroup> & {
  onSelect: (value: number, whisper: Whisper) => void;
  options: string[];
  selected?: number;
};

export declare type Select = WhisperComponent<WhisperComponentType.Select> & {
  label: string;
  options: string[];
  onSelect: (value: number, whisper: Whisper) => void;
  selected?: number;
  tooltip?: string;
};

export declare type Telephone = WhisperComponent<WhisperComponentType.Telephone> & {
  label: string;
  onChange: (value: string, whisper: Whisper) => void;
  // pattern?: RegExp; TODO: Implement this
  tooltip?: string;
  value?: string;
};

export declare type TextInput = WhisperComponent<WhisperComponentType.TextInput> & {
  label: string;
  onChange: (value: string, whisper: Whisper) => void;
  tooltip?: string;
  value?: string;
};

export declare type Divider = WhisperComponent<WhisperComponentType.Divider>;

export type ChildComponents =
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

export declare type CollapseBox = WhisperComponent<WhisperComponentType.CollapseBox> & {
  children: Array<ChildComponents>;
  label?: string;
  open: boolean;
};

export declare type Box = WhisperComponent<WhisperComponentType.Box> & {
  alignment: Alignment;
  children: Array<ChildComponents>;
  direction: Direction;
};

export type Components = Box | ChildComponents | CollapseBox;

export interface NewWhisper {
  components: Array<Components>;
  label: string;
  onClose: () => void;
}

export interface WhisperAptitude {
  /**
   * Adds a new whisper to Olive Helps based on the configuration provided.
   * Returns a promise which provides a reference to the newly created whisper
   *
   * @param whisper The configuration for the whisper being created
   */
  create(whisper: NewWhisper): Promise<Whisper>;
}

export function create(whisper: NewWhisper): Promise<Whisper> {
  return promisifyWithParam(whisper, oliveHelps.whisper.create);
}
