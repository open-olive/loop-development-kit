import { NewWhisper, UpdateWhisper, Whisper } from '../types';
import { create } from '../index';

export interface WhisperRenderingInterface {
  createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): void;
  closeWhisper(): void;
  setOnClose(func: () => Promise<void>): void;
}

enum RenderInstanceStatus {
  NotCreated,
  Created,
  Closed,
}

// TODO: When a whisper is closed I need to unmount its contents. I probably need to
//  call updateContainer again with an empty element.
export class WhisperRenderInstance implements WhisperRenderingInterface {
  private status: RenderInstanceStatus = RenderInstanceStatus.NotCreated;

  private whisper: Whisper | undefined;

  private onCloseHandler: undefined | (() => Promise<void>);

  async createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): Promise<void> {
    if (this.status === RenderInstanceStatus.Closed) {
      return;
    }
    if (this.whisper == null) {
      await this.createWhisper(whisperData as NewWhisper);
    } else {
      if (this.status !== RenderInstanceStatus.Created) {
        throw new Error('Cannot update whisper in invalid state');
      }
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
    this.onCloseHandler?.();
  };

  setOnClose(func: () => Promise<void>): void {
    this.onCloseHandler = func;
  }
}
