import {
  JustifyContent,
  Direction,
  WhisperComponentType,
  Whisper,
  Component,
  StateMap,
  Button,
  Select,
  TextInput,
} from '@oliveai/ldk/dist/whisper/types';

export const resolveOnClick = (
  error: Error,
  whisperToClose: Whisper,
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
): void => {
  if (error) {
    console.error(error);
    reject(error);
  }
  whisperToClose.close(() => {
    // do nothing.
  });
  resolve(true);
};

export const rejectOnClick = (
  error: Error,
  whisperToClose: Whisper,
  reject: (reason?: Error) => void,
): void => {
  if (error) {
    console.error(error);
    reject(error);
  }
  whisperToClose.close(() => {
    // do nothing.
  });
  reject(new Error('Not rendered correctly.'));
};

export const resolveRejectButtons = (
  resolve: (value: boolean) => void,
  reject: (reason?: Error) => void,
  resolveButtonText?: string | undefined,
  rejectButtonText?: string | undefined,
): Component => ({
  type: WhisperComponentType.Box,
  justifyContent: JustifyContent.SpaceBetween,
  direction: Direction.Horizontal,
  children: [
    {
      type: WhisperComponentType.Button,
      label: rejectButtonText || `Incorrect`,
      onClick: (error: Error, onClickWhisper: Whisper) => {
        rejectOnClick(error, onClickWhisper, reject);
      },
    },
    {
      type: WhisperComponentType.Button,
      label: resolveButtonText || `Looks Good`,
      onClick: (error: Error, onClickWhisper: Whisper) => {
        resolveOnClick(error, onClickWhisper, resolve, reject);
      },
    },
  ],
});

export const createTextComponent = (id: string, label?: string): TextInput => {
  return {
    type: WhisperComponentType.TextInput,
    label: label || 'Enter text',
    id: id,
    key: id,
    onChange: (_error: Error, _param: string, onChangeWhisper: Whisper) => {
      logMap(onChangeWhisper.componentState);
    },
    tooltip: 'Enter text',
  };
};

export const createSelectComponent = (id: string, label?: string): Select => {
  return {
    type: WhisperComponentType.Select,
    label: label || 'Select an option',
    id: id,
    key: id,
    onSelect: (_error: Error, _param: number, onSelectWhisper: Whisper) => {
      logMap(onSelectWhisper.componentState);
    },
    options: ['Option 1', 'Option 2'],
    tooltip: 'Select an option',
  };
};

export const createButtonComponent = (
  label: string,
  onClick: (error: Error, onClickWhisper: Whisper) => void,
): Button => {
  return {
    type: WhisperComponentType.Button,
    label,
    onClick: (error: Error, onClickWhisper: Whisper) => {
      logMap(onClickWhisper.componentState);
      onClick(error, onClickWhisper);
    },
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

export const logMap = (map: StateMap): void => {
  Array.from(map.entries()).forEach((entry) => {
    console.log(`Key: ${entry[0]} Value: ${entry[1]}`);
  });
};
