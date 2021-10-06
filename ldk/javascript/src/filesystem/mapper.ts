import fs from 'fs';
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
        info: convert(fileEvent.info),
      };
  }
};

export function convert(fileInfo: Filesystem.FileInfo): FileInfo {
  return {
    ...fileInfo,
    modTime: new Date(fileInfo.modTime.UnixMilli()),
  };
}

// export const UnixMilli = (fileInfo: FileInfo): number => {
//   // input date, output number

//   const date = new Date(fileInfo.modTime).getTime();

//     fs.stat(path : string, (err, stats) => {
//       if (err) {
//         throw err;
//       }
//       const mtimeMS = stats.mtimeMs;
//       return stats.mtimeMs;
//     });

//     return date;

//   // return mtimeMS;
// };
