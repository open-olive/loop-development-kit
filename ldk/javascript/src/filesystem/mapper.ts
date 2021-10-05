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
      return fileEvent;
  }
};

export function UnixMilli(path: string){
  fs.stat(path, (err, stats) => {
    if (err) {
      throw err;
    }
    const mtimeMS = stats.mtimeMs;
    const date = new Date(mtimeMS).toString();
    return date;
  });
  //  return promisifyWithParam(path, oliveHelps.filesystem.dir);
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
