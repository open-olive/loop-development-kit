import { NewWhisper, UpdateWhisper, Whisper } from '../types';
import { create } from '../index';

export interface WhisperRenderingInterface {
  createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): void;
  closeWhisper(): void;
  setInternalOnClose(func: () => Promise<void>): void;
  setExternalOnClose(func: () => Promise<void>): void;
}

enum RenderInstanceStatus {
  NotCreated,
  Created,
  Closed,
}

/**
 * @internal
 */
export class WhisperRenderInstance implements WhisperRenderingInterface {
  private status: RenderInstanceStatus = RenderInstanceStatus.NotCreated;

  private whisper: Whisper | undefined;

  private internalOnClose: (() => Promise<void>) | undefined;

  private externalOnClose: (() => Promise<void>) | undefined;

  async createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): Promise<void> {
    if (this.status === RenderInstanceStatus.Closed) {
      return;
    }
    if (this.whisper == null) {
      await this.createWhisper(whisperData as NewWhisper);
    } else if (this.status !== RenderInstanceStatus.Created) {
      throw new Error('Cannot update whisper in invalid state');
    } else {
      await this.whisper.update(whisperData);
    }
  }

  private async createWhisper(whisperData: NewWhisper) {
    this.whisper = await create({ ...whisperData, onClose: this.handleOnClose });
    this.status = RenderInstanceStatus.Created;
  }

  closeWhisper(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.whisper?.close(() => {});
  }

  handleOnClose = (): void => {
    this.status = RenderInstanceStatus.Closed;
    this.internalOnClose?.();
    this.externalOnClose?.();
  };

  setInternalOnClose(func: () => Promise<void>): void {
    this.internalOnClose = func;
  }

  setExternalOnClose(func: () => Promise<void>): void {
    this.externalOnClose = func;
  }
}
