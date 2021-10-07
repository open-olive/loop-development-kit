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
  fileInfo.modTime.UnixMilli();
  return {
    ...fileInfo,
    modTime: new Date(fileInfo.modTime.UnixMilli()),
  };
}

export function mapToFileInfoArray(fileInfos: Filesystem.FileInfo[]): FileInfo[] {
  const result = fileInfos.map((x) => ({
    ...x,
    modTime: new Date(x.modTime.UnixMilli()),
  }));
  return result;
}
