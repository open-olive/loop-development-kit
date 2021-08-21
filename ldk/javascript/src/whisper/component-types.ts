import { ReactNode } from "react";
import * as Whisper from "./types";
import { WhisperHandler } from "./types";

type ComponentProps<T> = Omit<T, 'id' | 'type'> & {
  key?: string | number;
};

type ComponentPropsWithChildren<T, TExcludeName extends string = 'children'> = Omit<
  ComponentProps<T>,
  TExcludeName
  > & {
  children: ReactNode;
};

// TODO: Figure out how to ensure these declarations are respected by importers.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- needed to populate jsx components
  namespace JSX {
    type BoxProps = ComponentPropsWithChildren<Whisper.Box>;
    type ButtonProps = ComponentPropsWithChildren<Whisper.Button, 'label'>;
    type CheckboxProps = ComponentPropsWithChildren<Whisper.Checkbox, 'label'>;
    type CollapseBoxProps = ComponentPropsWithChildren<Whisper.CollapseBox>;
    type DateTimeInputProps = ComponentProps<Whisper.DateTimeInput>;
    type DividerProps = ComponentProps<Whisper.Divider>;
    type EmailProps = ComponentProps<Whisper.Email>;
    type IconProps = ComponentProps<Whisper.Icon>;
    type LinkProps = ComponentPropsWithChildren<Whisper.Link, 'text'>;
    type MarkdownProps = ComponentPropsWithChildren<Whisper.Markdown, 'body'>;
    type MessageProps = ComponentPropsWithChildren<Whisper.Message, 'body'>;
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

    interface IntrinsicElements {
      'oh-box': BoxProps;
      'oh-button': ButtonProps;
      'oh-checkbox': CheckboxProps;
      'oh-collapsebox': CollapseBoxProps;
      'oh-datetime': DateTimeInputProps;
      'oh-email': EmailProps;
      'oh-divider': DividerProps;
      'oh-icon': IconProps;
      'oh-link': LinkProps;
      'oh-message': MessageProps;
      'oh-markdown': MarkdownProps;
      'oh-number': NumberInputProps;
      'oh-password': PasswordProps;
      'oh-radiogroup': RadioGroupProps;
      'oh-section-title': SectionTitleProps;
      'oh-telephone': TelephoneProps;
      'oh-textinput': TextInputProps;
      'oh-whisper': WhisperProps;
    }
  }
}