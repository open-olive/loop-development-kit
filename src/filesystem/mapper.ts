import { FileEvent, RemovedFileEvent, RenamedFileEvent, FileInfo } from './types';

export const mapToFileEvent = (
  fileEvent: Filesystem.FileEvent,
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
      return {
        action: fileEvent.action,
        info: mapToFileInfo(fileEvent.info),
      };
  }
};

export function mapToFileInfo(fileInfo: Filesystem.FileInfo): FileInfo {
  return {
    ...fileInfo,
    modTime: new Date(fileInfo.modTime.UnixNano() / 1000000),
  };
}

export function mapToFileInfoArray(fileInfos: Filesystem.FileInfo[]): FileInfo[] {
  const result = fileInfos.map(mapToFileInfo);
  return result;
}
