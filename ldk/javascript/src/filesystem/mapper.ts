import { FileEvent, RemovedFileEvent, RenamedFileEvent } from './types';

export const mapToFileEvent = (
  fileEvent: OliveHelps.FileEvent,
): FileEvent | RemovedFileEvent | RenamedFileEvent => {
  switch (fileEvent.action) {
    case 'Remove':
      return {
        action: 'Remove',
        name: fileEvent.info.name,
      } as RemovedFileEvent;
    case 'Rename':
      return {
        action: 'Rename',
        name: fileEvent.info.name,
      } as RenamedFileEvent;
    default:
      return fileEvent;
  }
};
