import { ReactNode } from 'react';
import * as Whisper from '../types';
import { WhisperHandler } from '../types';

/**
 * @internal
 */
type ComponentProps<T> = Omit<T, 'type'> & {
  key?: string | number;
};

/**
 * @internal
 */
type ComponentPropsWithChildren<T, TExcludeName extends string = 'children'> = Omit<
  ComponentProps<T>,
  TExcludeName
> & {
  children: ReactNode;
};

type AutocompleteProps = ComponentProps<Whisper.Autocomplete>;
type BoxProps = ComponentPropsWithChildren<Whisper.Box>;
type ButtonProps = ComponentProps<Whisper.Button>;
type CheckboxProps = ComponentProps<Whisper.Checkbox>;
type CollapseBoxProps = ComponentPropsWithChildren<Whisper.CollapseBox>;
type DateTimeInputProps = ComponentProps<Whisper.DateTimeInput>;
type DividerProps = ComponentProps<Whisper.Divider>;
type DropZoneProps = ComponentProps<Whisper.DropZone>;
type EmailProps = ComponentProps<Whisper.Email>;
type IconProps = ComponentProps<Whisper.Icon>;
type LinkProps = ComponentProps<Whisper.Link>;
type ListPairProps = ComponentProps<Whisper.ListPair>;
type MarkdownProps = ComponentProps<Whisper.Markdown>;
type MessageProps = ComponentProps<Whisper.Message>;
type NumberInputProps = ComponentProps<Whisper.NumberInput>;
type PasswordProps = ComponentProps<Whisper.Password>;
type RadioGroupProps = ComponentProps<Whisper.RadioGroup>;
type SelectProps = ComponentProps<Whisper.Select>;
type SectionTitleProps = ComponentProps<Whisper.SectionTitle>;
type TelephoneProps = ComponentProps<Whisper.Telephone>;
type TextInputProps = ComponentProps<Whisper.TextInput>;
type WhisperProps = {
  children: ReactNode;
  label: string;
  onClose: WhisperHandler;
};

export interface HelpsComponents {
  'oh-autocomplete': AutocompleteProps;
  'oh-box': BoxProps;
  'oh-button': ButtonProps;
  'oh-checkbox': CheckboxProps;
  'oh-collapse-box': CollapseBoxProps;
  'oh-datetime': DateTimeInputProps;
  'oh-divider': DividerProps;
  'oh-drop-zone': DropZoneProps;
  'oh-email': EmailProps;
  'oh-icon': IconProps;
  'oh-link': LinkProps;
  'oh-list-pair': ListPairProps;
  'oh-markdown': MarkdownProps;
  'oh-message': MessageProps;
  'oh-number': NumberInputProps;
  'oh-password': PasswordProps;
  'oh-radio-group': RadioGroupProps;
  'oh-select': SelectProps;
  'oh-section-title': SectionTitleProps;
  'oh-telephone': TelephoneProps;
  'oh-text-input': TextInputProps;
  'oh-whisper': WhisperProps;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- needed to populate jsx components
  namespace JSX {
    interface IntrinsicElements extends HelpsComponents {}
  }
}
