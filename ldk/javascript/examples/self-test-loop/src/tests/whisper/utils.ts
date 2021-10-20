import {
  Autocomplete,
  Button,
  Component,
  Direction,
  Divider,
  JustifyContent,
  Markdown,
  RadioGroup,
  Select,
  StateMap,
  TextInput,
  Whisper,
  WhisperComponentType,
} from '@oliveai/ldk/dist/whisper/types';

import { WidthSize } from '@oliveai/ldk/dist/whisper';

export const resolveOnClick = (
  error: Error,
  whisperToClose: Whisper | undefined,
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
): void => {
  if (error) {
    console.error(error);
    reject(error);
  }
  whisperToClose?.close(() => {
    // do nothing.
  });
  resolve(true);
};

export const rejectOnClick = (
  error: Error,
  whisperToClose: Whisper | undefined,
  reject: (reason?: Error) => void,
): void => {
  if (error) {
    console.error(error);
    reject(error);
  }
  whisperToClose?.close(() => {
    // do nothing.
  });
  reject(new Error('Not rendered correctly.'));
};

export const resolveRejectButtons = (
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
  resolveButtonText?: string | undefined,
  rejectButtonText?: string | undefined,
  closeWhisper = true,
): Component => ({
  type: WhisperComponentType.Box,
  justifyContent: JustifyContent.SpaceBetween,
  direction: Direction.Horizontal,
  children: [
    {
      type: WhisperComponentType.Button,
      label: rejectButtonText || `Incorrect`,
      onClick: (error: Error, onClickWhisper: Whisper) => {
        rejectOnClick(error, closeWhisper ? onClickWhisper : undefined, reject);
      },
    },
    {
      type: WhisperComponentType.Button,
      label: resolveButtonText || `Looks Good`,
      onClick: (error: Error, onClickWhisper: Whisper) => {
        resolveOnClick(error, closeWhisper ? onClickWhisper : undefined, resolve, reject);
      },
    },
  ],
});

export const logMap = (map: StateMap): void => {
  Array.from(map.entries()).forEach((entry) => {
    console.log(`Key: ${entry[0]} Value: ${entry[1]}`);
  });
};

export const createDivider = (widthSize?: WidthSize): Divider => ({
  type: WhisperComponentType.Divider,
  layout: {
    width: widthSize || WidthSize.Half,
  },
});

export const createTextComponent = (id: string, label?: string): TextInput => ({
  type: WhisperComponentType.TextInput,
  label: label || 'Enter text',
  id,
  key: id,
  onChange: (_error: Error, _param: string, onChangeWhisper: Whisper) => {
    logMap(onChangeWhisper.componentState);
  },
  tooltip: 'Enter text',
});

export const createSelectComponent = (id: string, label?: string): Select => ({
  type: WhisperComponentType.Select,
  label: label || 'Select an option',
  id,
  key: id,
  onSelect: (_error: Error, _param: number, onSelectWhisper: Whisper) => {
    logMap(onSelectWhisper.componentState);
  },
  options: ['Option 1', 'Option 2'],
  tooltip: 'Select an option',
});

export const createRadioComponent = (id: string): RadioGroup => {
  return {
    type: WhisperComponentType.RadioGroup,
    id: id,
    key: id,
    onSelect: (_error: Error, _param: number, onSelectWhisper: Whisper) => {
      logMap(onSelectWhisper.componentState);
    },
    options: ['Option 1', 'Option 2'],
  };
};

export const createAutocompleteComponent = (id: string, label?: string): Autocomplete => ({
  type: WhisperComponentType.Autocomplete,
  label: label || 'Select an option',
  id,
  key: id,
  onSelect: (_error: Error, _param: string[], onSelectWhisper: Whisper) => {
    logMap(onSelectWhisper.componentState);
  },
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ],
  tooltip: 'Select an option',
});

export const createButtonComponent = (
  label: string,
  onClick: (error: Error, onClickWhisper: Whisper) => void,
): Button => ({
  type: WhisperComponentType.Button,
  label,
  onClick: (error: Error, onClickWhisper: Whisper) => {
    logMap(onClickWhisper.componentState);
    onClick(error, onClickWhisper);
  },
});

export const createMarkdownComponent = (text: string): Markdown => {
  return {
    type: WhisperComponentType.Markdown,
    body: text,
  };
};

export const newGuid = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });

export const autocompleteOptions = [
  { label: 'Value 1', value: '1' },
  { label: 'Value 2', value: '2' },
  { label: 'Value 3', value: '3' },
  { label: 'Value 4', value: '4' },
  { label: 'Value 5', value: '5' },
];
