import { NewWhisper, UpdateWhisper, Whisper } from '../types';
import { create } from '../index';

export interface WhisperRenderingInterface {
  createOrUpdateWhisper(whisperData: NewWhisper | UpdateWhisper): void;
  closeWhisper(): void;
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
    this.whisper = await create(whisperData);
    this.status = RenderInstanceStatus.Created;
  }

  closeWhisper(): void {
    this.whisper?.close(() => {});
  }
}
