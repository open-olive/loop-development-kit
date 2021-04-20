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
  submit?: boolean;
}

export interface Checkbox extends WhisperComponent {
  label: string;
  tooltip?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
}

export interface Email extends WhisperComponent {
  label: string;
  onChange?: (value: string) => void;
  pattern?: RegExp;
  tooltip?: string;
  value?: string;
}

export interface Link extends WhisperComponent {
  href?: string;
  style?: Urgency;
  onClick?: (value: string) => void;
  text: string;
  textAlign?: TextAlign;
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
  selected?: number;
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

export type ChildElement =
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
  | WhisperComponent;

export interface CollapseBox extends WhisperComponent {
  children: Array<ChildElement>;
  label?: string;
  open: boolean;
}

export interface Box extends WhisperComponent {
  alignment: Alignment;
  children: Array<ChildElement | CollapseBox>;
  direction: string;
}

export interface NewWhisper {
  components: Array<Box | ChildElement | CollapseBox>;
  label: string;
  onClose: () => void;
}

export interface Whisper {
  id: string;
  label: string;
  components: Array<Box | ChildElement | CollapseBox>;
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
