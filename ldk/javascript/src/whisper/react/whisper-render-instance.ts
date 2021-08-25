import { NewWhisper, UpdateWhisper, Whisper } from '../types';
import { create } from '../index';

export interface WhisperRenderingInterface {
  createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): void;
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

  private readonly closeHandler: () => void;
  // TODO: Remove again or remove constructor handler.
  private externalCloseHandler: (() => void) | undefined;

  constructor(closeHandler: () => void) {
    this.closeHandler = closeHandler;
  }

  async createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): Promise<void> {
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
    this.whisper = await create({ ...whisperData, onClose: this.onWhisperClose } as NewWhisper);
    this.externalCloseHandler = whisperData.onClose;
    this.status = RenderInstanceStatus.Created;
  }

  private onWhisperClose = (): void => {
    this.closeHandler();
    this.status = RenderInstanceStatus.Closed;
  };
}
