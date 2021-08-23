import { NewWhisper, UpdateWhisper, Whisper } from './types';
import { create } from './index';

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
// TODO: Add support for closing or updating whisper.
export class WhisperRenderInstance implements WhisperRenderingInterface {
  private status: RenderInstanceStatus = RenderInstanceStatus.NotCreated;

  private whisper: Whisper | undefined;

  private readonly closeHandler: () => void;

  constructor(closeHandler: () => void) {
    this.closeHandler = closeHandler;
  }

  async createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): Promise<void> {
    if (this.whisper == null) {
      this.whisper = await create({ ...whisperData, onClose: this.onWhisperClose } as NewWhisper);
      this.status = RenderInstanceStatus.Created;
    } else {
      if (this.status !== RenderInstanceStatus.Created) {
        throw new Error('Cannot update whisper in invalid state');
      }
      await this.whisper.update(whisperData);
    }
  }

  private onWhisperClose = (): void => {
    this.closeHandler();
    this.status = RenderInstanceStatus.Closed;
  };
}
