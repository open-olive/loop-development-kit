/* eslint-disable no-async-promise-executor */
import { filesystem, network } from '@oliveai/ldk';
import {
  WriteOperation,
  FileEvent,
  RenamedFileEvent,
  RemovedFileEvent,
} from '@oliveai/ldk/dist/filesystem/types';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';
import { areStringsEqual, StringOptions } from '../../utils/string';
import * as zipFile from './zipFile';

let testFolderPath: string;

async function createFolder(path: string): Promise<void> {
  if (!(await filesystem.exists(path))) {
    const writeMode = 0o755;
    await filesystem.makeDir(path, writeMode);
  }
}

async function getTestFolderPath(): Promise<string> {
  if (!testFolderPath) {
    const path = 'test_dir';
    await createFolder(path);
    testFolderPath = path;
  }

  return testFolderPath;
}

export const testQueryingDirectory = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const dirPath = `${await getTestFolderPath()}`;
      const fileName = `file.json`;
      const filePath = `${dirPath}/${fileName}`;
      const writeMode = 0o755;
      await filesystem.writeFile({
        path: filePath,
        data: new Uint8Array([102, 85]),
        writeOperation: WriteOperation.overwrite,
        writeMode,
      });
      const response = await filesystem.dir(dirPath);
      for (let i = 0; i < response.length; i += 1) {
        if (response[i].name === fileName && !response[i].isDir) {
          resolve(true);
        }
      }
      await filesystem.remove(filePath);
    } catch (error) {
      reject(error);
    }
  });

export const testWriteAndRemoveFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const filePath = `${await getTestFolderPath()}/test.txt`;
      const writeMode = 0o755;

      await filesystem.writeFile({
        path: filePath,
        data: 'some text',
        writeOperation: WriteOperation.overwrite,
        writeMode,
      });
      await filesystem.remove(filePath);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const testWriteAndReadFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const testString = 'Im in yr loop, writing to yr clipboard';
      const filePath = `${await getTestFolderPath()}/test.txt`;
      const writeMode = 0o755;

      await filesystem.writeFile({
        path: filePath,
        data: testString,
        writeOperation: WriteOperation.overwrite,
        writeMode,
      });
      const readEncodedValue = await filesystem.readFile(filePath);
      const decodedText = await network.decode(readEncodedValue);
      console.debug(decodedText);
      if (decodedText === testString) {
        resolve(true);
      } else {
        reject(new Error('File contents were incorrect'));
      }
      await filesystem.remove(filePath);
    } catch (error) {
      reject(error);
    }
  });

export const testListenRemoveFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const testFolder = `${await getTestFolderPath()}/listenFileRemoveTest`;
      await filesystem.makeDir(testFolder, 0o755);
      const fileName = `test_listenFile.txt`;
      const filePath = `${testFolder}/${fileName}`;

      let writeFileResolved = false;
      let removeFileResolved = false;

      console.debug('listening to file changes');
      setTimeout(() => {
        reject(new Error(`ListenFile test didn't passed within allowed time frame`));
      }, 5000);

      await filesystem.writeFile({
        path: filePath,
        data: new Uint8Array(),
        writeOperation: WriteOperation.overwrite,
        writeMode: 0o755,
      });

      const listenFileCancelable: Cancellable = await filesystem.listenFile(
        filePath,
        (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => {
          if (!fileEvent) {
            reject(new Error('File event is not received'));
          }
          console.debug(`Received file event: ${JSON.stringify(fileEvent)}`);
          if (
            fileEvent.action === 'Write' &&
            areStringsEqual(fileEvent.info.name, fileName, StringOptions.IgnoreCase)
          ) {
            writeFileResolved = true;
          }
          if (
            fileEvent.action === 'Remove' &&
            areStringsEqual(
              (fileEvent as RemovedFileEvent).name,
              fileName,
              StringOptions.IgnoreCase,
            )
          ) {
            removeFileResolved = true;
          }
          if (writeFileResolved && removeFileResolved) {
            listenFileCancelable.cancel();
            resolve(true);
          }
        },
      );
      setTimeout(async () => {
        await filesystem.writeFile({
          path: filePath,
          data: 'Listen to file text',
          writeOperation: filesystem.WriteOperation.append,
          writeMode: 0o755,
        });
        setTimeout(async () => {
          await filesystem.remove(filePath);
          await filesystem.remove(testFolder);
        }, 500);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });

export const testListenRenameFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      console.info(`testListenRenameFile`);
      const testFolder = `${await getTestFolderPath()}/listenFileRenameTest`;
      await filesystem.makeDir(testFolder, 0o755);
      const fileName = `test_listenFile.txt`;
      const fileNameMoved = `test_listenFile_moved.txt`;
      const filePath = `${testFolder}/${fileName}`;
      const filePathMoved = `${testFolder}/${fileNameMoved}`;

      let renameFileResolved = false;

      console.debug('listening to file changes');
      setTimeout(() => {
        reject(new Error(`ListenFile test didn't passed within allowed time frame`));
      }, 5000);
      console.info(`before file create`);
      await filesystem.writeFile({
        path: filePath,
        data: 'Listen to file text',
        writeOperation: WriteOperation.overwrite,
        writeMode: 0o755,
      });
      const listenFileCancelable: Cancellable = await filesystem.listenFile(
        filePath,
        (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => {
          if (!fileEvent) {
            reject(new Error('File event is not received'));
          }
          console.debug(`Received file event: ${JSON.stringify(fileEvent)}`);
          if (
            fileEvent.action === 'Rename' &&
            areStringsEqual(
              (fileEvent as RenamedFileEvent).name,
              fileName,
              StringOptions.IgnoreCase,
            )
          ) {
            renameFileResolved = true;
          }
          if (renameFileResolved) {
            listenFileCancelable.cancel();
            resolve(true);
          }
        },
      );
      setTimeout(async () => {
        await filesystem.move(filePath, filePathMoved);
        setTimeout(async () => {
          await filesystem.remove(filePathMoved);
          await filesystem.remove(testFolder);
        }, 500);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });

export const testListenDir = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const dirName = `listenDirTest`;
      const testFolder = `${await getTestFolderPath()}/${dirName}`;
      await filesystem.makeDir(testFolder, 0o755);
      const fileName = `test_listenFile.txt`;
      const fileNameMoved = `test_listenFile_moved.txt`;
      const filePath = `${testFolder}/${fileName}`;
      const filePathMoved = `${testFolder}/${fileNameMoved}`;

      let createFileResolved = false;
      let createRenameFileResolved = false;
      let renameFileResolved = false;
      let removeFileResolved = false;
      let removeDirResolved = false;

      console.debug('listening to directory changes');
      setTimeout(() => {
        reject(new Error('ListenDir test did not pass within allowed time frame'));
      }, 6000);

      const listenDirCancellable: Cancellable = await filesystem.listenDir(
        testFolder,
        (fileEvent: FileEvent | RenamedFileEvent | RemovedFileEvent) => {
          if (!fileEvent) {
            reject(new Error('File event is not received'));
          }
          console.debug(`Received file event: ${JSON.stringify(fileEvent)}`);
          if (
            fileEvent.action === 'Create' &&
            areStringsEqual(fileEvent.info.name, fileName, StringOptions.IgnoreCase)
          ) {
            createFileResolved = true;
          }
          if (
            fileEvent.action === 'Create' &&
            areStringsEqual(fileEvent.info.name, fileNameMoved, StringOptions.IgnoreCase)
          ) {
            createRenameFileResolved = true;
          }
          if (
            fileEvent.action === 'Rename' &&
            areStringsEqual(
              (fileEvent as RenamedFileEvent).name,
              fileName,
              StringOptions.IgnoreCase,
            )
          ) {
            renameFileResolved = true;
          }
          if (
            fileEvent.action === 'Remove' &&
            areStringsEqual(
              (fileEvent as RemovedFileEvent).name,
              fileNameMoved,
              StringOptions.IgnoreCase,
            )
          ) {
            removeFileResolved = true;
          }
          if (
            fileEvent.action === 'Remove' &&
            areStringsEqual((fileEvent as RemovedFileEvent).name, dirName, StringOptions.IgnoreCase)
          ) {
            removeDirResolved = true;
          }
          if (
            createFileResolved &&
            createRenameFileResolved &&
            renameFileResolved &&
            removeFileResolved &&
            removeDirResolved
          ) {
            listenDirCancellable.cancel();
            resolve(true);
          }
        },
      );

      setTimeout(async () => {
        await filesystem.writeFile({
          path: filePath,
          data: 'listen to dir text',
          writeOperation: WriteOperation.overwrite,
          writeMode: 0o755,
        });
        setTimeout(async () => {
          await filesystem.move(filePath, filePathMoved);
          setTimeout(async () => {
            await filesystem.remove(filePathMoved);
            await filesystem.remove(testFolder);
          }, 500);
        }, 500);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });

export const testDirExists = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const destination = `${await getTestFolderPath()}/test-tmp-dir`;
    const writeMode = 0o755;
    filesystem.makeDir(destination, writeMode).then(() => {
      filesystem.exists(destination).then((exists) => {
        filesystem.remove(destination);
        if (exists === true) {
          resolve(true);
        }
        reject(new Error('Could not check if directory exists'));
      });
    });
  });

export const testFileExists = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_fileExists.txt`;
    const writeMode = 0o755;
    network.encode('some file text').then((encodedValue) => {
      filesystem
        .writeFile({
          path: filePath,
          data: encodedValue,
          writeOperation: WriteOperation.overwrite,
          writeMode,
        })
        .then(() => {
          filesystem.exists(filePath).then((exists) => {
            filesystem.remove(filePath);
            if (exists === true) {
              resolve(true);
            }
            reject(new Error('Could not check if directory exists'));
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

export const testOpenFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `test.txt`;
    const writeMode = 0o755;

    try {
      await filesystem.writeFile({
        path: filePath,
        data: 'some text',
        writeOperation: filesystem.WriteOperation.overwrite,
        writeMode,
      });
      await filesystem.openWithDefaultApplication(filePath);
      setTimeout(async () => {
        await filesystem.remove(filePath);
        resolve(true);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });

export const testFileStat = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const filePath = `${await getTestFolderPath()}/test_stat.txt`;
      await filesystem.writeFile({
        path: filePath,
        data: 'some file text',
        writeOperation: WriteOperation.overwrite,
        writeMode: 0o755,
      });
      const fileInfo = await filesystem.stat(filePath);
      if (fileInfo) {
        await filesystem.remove(filePath);
        resolve(true);
      } else {
        reject(new Error(`Din not received file info`));
      }
    } catch (error) {
      reject(error);
    }
  });

export const testFileUnzip = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const dirPath = `${await getTestFolderPath()}`;
      const zipFilePath = `${dirPath}/test_zip.zip`;
      const textFilePath = `${dirPath}/test_zip.txt`;
      const writeMode = 0o755;
      const writeOperation = WriteOperation.overwrite;

      // Create a zip file
      await filesystem.writeFile({
        path: zipFilePath,
        data: zipFile.data,
        writeOperation,
        writeMode,
      });

      // Unzip file
      await filesystem.unzip(zipFilePath, dirPath);

      // Assert
      const fileInfo = await filesystem.stat(textFilePath);
      if (fileInfo) {
        resolve(true);
      } else {
        reject(new Error(`Unzipped file not found.`));
      }

      // Cleanup
      await filesystem.remove(zipFilePath);
      await filesystem.remove(textFilePath);
    } catch (error) {
      reject(error);
    }
  });

export const testOpenFileDoesNotExist = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `nofile.txt`;
    try {
      await filesystem.openWithDefaultApplication(filePath);
      reject(new Error("Shouldn't get a success here"));
    } catch (error) {
      resolve(true);
    }
  });

export const testOpenDirectory = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = ``;
    try {
      await filesystem.openWithDefaultApplication(filePath);
      resolve(true);
    } catch (error) {
      reject(new Error("Couldn't open the directory"));
    }
  });

export const testWorkDir = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const workDir = await filesystem.workDir();
      console.info(`workDir: ${workDir}`);
      resolve(true);
    } catch (error) {
      reject(new Error("Couldn't get working directory"));
    }
  });
