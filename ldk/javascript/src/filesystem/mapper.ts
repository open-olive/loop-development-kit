import { FileEvent, RemovedFileEvent } from './types';

export const mapToFileEvent = (fileEvent: OliveHelps.FileEvent): FileEvent | RemovedFileEvent => {
  if (fileEvent.action === 'Remove') {
    return {
      action: 'Remove',
      name: fileEvent.info.name,
    } as RemovedFileEvent;
  }
  return fileEvent;
};
