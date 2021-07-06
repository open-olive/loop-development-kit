import {
  JustifyContent,
  Direction,
  WhisperComponentType,
  Whisper,
  Component,
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
  justifyContent: JustifyContent.SpaceEvenly,
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

export const newGuid = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
