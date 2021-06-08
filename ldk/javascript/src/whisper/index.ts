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
   * The text input field allows the user to provide a telephone number.
   */
  Telephone = 'telephone',
  /**
   * The text input field allows the user to provide text information.
   *
   * The text can be pre-populated by the loop.
   */
  TextInput = 'textInput',
}

export enum JustifyContent {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  SpaceAround = 'space_around',
  SpaceEvenly = 'space_evenly',
}

/**
 * @deprecated - Use JustifyContent instead.
 */
export const Alignment = JustifyContent;

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
  close: (cb: (err: Error | undefined) => void) => void;
  update(whisper: UpdateWhisper, cb?: (err: Error) => void): void;
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
}

export type Button = WhisperComponent<WhisperComponentType.Button> & {
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
  label: string;
  onClick: WhisperHandler;
  size?: ButtonSize;
  tooltip?: string;
};

export type Checkbox = WhisperComponent<WhisperComponentType.Checkbox> & {
  label: string;
  tooltip?: string;
  value: boolean;
  onChange: WhisperHandlerWithParam<boolean>;
};

export type Email = WhisperComponent<WhisperComponentType.Email> & {
  label: string;
  onChange: WhisperHandlerWithParam<string>;
  tooltip?: string;
  value?: string;
};

export type Link = WhisperComponent<WhisperComponentType.Link> & {
  href?: string;
  text: string;
  onClick?: WhisperHandler;
  style?: Urgency;
  textAlign?: TextAlign;
};

export type ListPair = WhisperComponent<WhisperComponentType.ListPair> & {
  copyable: boolean;
  labelCopyable?: boolean;
  label: string;
  value: string;
  style: Urgency;
};

export type Markdown = WhisperComponent<WhisperComponentType.Markdown> & {
  body: string;
  tooltip?: string;
};

export type Message = WhisperComponent<WhisperComponentType.Message> & {
  body?: string;
  header?: string;
  style?: Urgency;
  textAlign?: TextAlign;
  tooltip?: string;
};

export type NumberInput = WhisperComponent<WhisperComponentType.Number> & {
  label: string;
  onChange: WhisperHandlerWithParam<number>;
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  tooltip?: string;
};

export type Password = WhisperComponent<WhisperComponentType.Password> & {
  label: string;
  onChange: WhisperHandlerWithParam<string>;
  tooltip?: string;
  value?: string;
};

export type RadioGroup = WhisperComponent<WhisperComponentType.RadioGroup> & {
  onSelect: WhisperHandlerWithParam<number>;
  options: string[];
  selected?: number;
};

export type Select = WhisperComponent<WhisperComponentType.Select> & {
  label: string;
  options: string[];
  onSelect: WhisperHandlerWithParam<number>;
  selected?: number;
  tooltip?: string;
};

export type Telephone = WhisperComponent<WhisperComponentType.Telephone> & {
  label: string;
  onChange: WhisperHandlerWithParam<string>;
  // pattern?: RegExp; TODO: Implement this
  tooltip?: string;
  value?: string;
};

export type TextInput = WhisperComponent<WhisperComponentType.TextInput> & {
  label: string;
  onChange: WhisperHandlerWithParam<string>;
  tooltip?: string;
  value?: string;
};

export type Divider = WhisperComponent<WhisperComponentType.Divider>;

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

export type CollapseBox = WhisperComponent<WhisperComponentType.CollapseBox> & {
  children: Array<ChildComponents>;
  label?: string;
  open: boolean;
};

export type DeprecatedBox = WhisperComponent<WhisperComponentType.Box> & {
  /**
   * @deprecated - use justifyContent instead.
   */
  alignment: JustifyContent;
  children: Array<ChildComponents>;
  direction: Direction;
};

export type Box = WhisperComponent<WhisperComponentType.Box> & {
  justifyContent: JustifyContent;
  children: Array<Box | ChildComponents>;
  direction: Direction;
};

export type Components = DeprecatedBox | Box | ChildComponents | CollapseBox;

export interface NewWhisper {
  components: Array<Components>;
  label: string;
  onClose?: () => void;
}

export interface UpdateWhisper {
  label?: string;
  components: Array<Components>;
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

function convertChildComponents(component: ChildComponents): OliveHelps.ChildComponents {
  switch (component.type) {
    case WhisperComponentType.Button:
      return {
        ...component,
        onClick: (error, whisper) => {
          component.onClick(error, convertGojaWhisper(whisper));
        },
      } as OliveHelps.Button;
    case WhisperComponentType.Checkbox:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.Checkbox;
    case WhisperComponentType.Divider:
      return component;
    case WhisperComponentType.Email:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.Email;
    case WhisperComponentType.Link: {
      const { onClick } = component;
      if (onClick) {
        return {
          ...component,
          onClick: (error, whisper) => {
            onClick(error, convertGojaWhisper(whisper));
          },
        } as OliveHelps.Link;
      }
      return component as OliveHelps.Link;
    }

    case WhisperComponentType.ListPair:
      return component;
    case WhisperComponentType.Markdown:
      return component;
    case WhisperComponentType.Message:
      return component;
    case WhisperComponentType.Number:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.NumberInput;
    case WhisperComponentType.Password:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.Password;
    case WhisperComponentType.RadioGroup:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.RadioGroup;
    case WhisperComponentType.Select:
      return {
        ...component,
        onSelect: (error, param, whisper) => {
          component.onSelect(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.Select;
    case WhisperComponentType.Telephone:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.Telephone;
    case WhisperComponentType.TextInput:
      return {
        ...component,
        onChange: (error, param, whisper) => {
          component.onChange(error, param, convertGojaWhisper(whisper));
        },
      } as OliveHelps.TextInput;
    default:
      throw new Error('Unexpected Whisper Component Type');
  }
}

function convertComponents(component: Components): OliveHelps.Components {
  if (component.type === WhisperComponentType.Box) {
    return {
      alignment: 'justifyContent' in component ? component.justifyContent : component.alignment,
      direction: component.direction,
      children: component.children.map(convertChildComponents),
      type: WhisperComponentType.Box,
    };
  }
  if (component.type === WhisperComponentType.CollapseBox) {
    return {
      label: component.label,
      open: component.open,
      children: component.children.map(convertChildComponents),
      type: WhisperComponentType.CollapseBox,
    };
  }
  return convertChildComponents(component);
}

function convertToGojaWhisper(whisper: UpdateWhisper): OliveHelps.UpdateWhisper;
function convertToGojaWhisper(whisper: NewWhisper): OliveHelps.NewWhisper;
function convertToGojaWhisper(
  whisper: NewWhisper | UpdateWhisper,
): OliveHelps.NewWhisper | OliveHelps.UpdateWhisper {
  return 'onClose' in whisper
    ? {
        label: whisper.label,
        onClose: whisper.onClose,
        components: whisper.components.map(convertComponents),
      }
    : {
        label: whisper.label,
        components: whisper.components.map(convertComponents),
      };
}

function convertGojaWhisper(whisper: OliveHelps.Whisper): Whisper {
  return {
    id: whisper.id,
    close: whisper.close,
    update(updateWhisper: UpdateWhisper, cb): void {
      whisper.update(convertToGojaWhisper(updateWhisper), cb);
    },
  };
}

export function create(whisper: NewWhisper): Promise<Whisper> {
  return promisifyMappedBothWithParams(
    whisper,
    convertToGojaWhisper,
    convertGojaWhisper,
    oliveHelps.whisper.create,
  );
}
