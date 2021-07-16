/* eslint-disable no-async-promise-executor */
import { filesystem, network } from '@oliveai/ldk';
import { WriteOperation, FileEvent, RemovedFileEvent } from '@oliveai/ldk/dist/filesystem/types';
import { Cancellable } from '@oliveai/ldk/dist/cancellable';

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
    const dirPath = `${await getTestFolderPath()}`;
    const writeMode = 0o755;
    await filesystem.writeFile({
      path: `${dirPath}/file.json`,
      data: new Uint8Array([102, 85]),
      writeOperation: WriteOperation.overwrite,
      writeMode,
    });
    filesystem
      .dir(dirPath)
      .then((response) => {
        for (let i = 0; i < response.length; i += 1) {
          if (response[i].name === 'file.json' && !response[i].isDir) {
            resolve(true);
          }
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally(async () => {
        await filesystem.remove(`${dirPath}/file.json`);
      });
  });

export const testWriteAndRemoveFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test.txt`;
    const writeMode = 0o755;

    network
      .encode('some text')
      .then((encodedValue) => {
        filesystem
          .writeFile({
            path: filePath,
            data: encodedValue,
            writeOperation: WriteOperation.overwrite,
            writeMode,
          })
          .then(() => {
            filesystem
              .remove(filePath)
              .then(() => {
                resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            console.error('write file failed');
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const testWriteAndReadFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const testString = 'Im in yr loop, writing to yr clipboard';
    const filePath = `${await getTestFolderPath()}/test.txt`;
    const writeMode = 0o755;

    network
      .encode(testString)
      .then((encodedValue) => {
        filesystem
          .writeFile({
            path: filePath,
            data: encodedValue,
            writeOperation: WriteOperation.overwrite,
            writeMode,
          })
          .then(() => {
            console.debug('Write successful');
            console.debug(encodedValue);

            filesystem
              .readFile(filePath)
              .then((readEncodedValue) => {
                console.debug(readEncodedValue);
                network
                  .decode(readEncodedValue)
                  .then((decodedText) => {
                    console.debug(decodedText);
                    if (decodedText === testString) {
                      resolve(true);
                    } else {
                      reject(new Error('File contents were incorrect'));
                    }
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
              })
              .finally(() => {
                filesystem.remove(filePath);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const testListenFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const testFolder = `${await getTestFolderPath()}/listenFileTest`;
      await filesystem.makeDir(testFolder, 0o755);
      const fileName = `test_listenFile.txt`;
      const filePath = `${testFolder}/${fileName}`;

      let writeFileResolved = false;
      let removeFileResolved = false;

      console.debug('listening to file changes');
      setTimeout(() => {
        reject(new Error(`ListenFile test didn't passed within allowed time frame`));
      }, 3000);

      await filesystem.writeFile({
        path: filePath,
        data: new Uint8Array(),
        writeOperation: WriteOperation.overwrite,
        writeMode: 0o755,
      });

      const listenFileCancelable: Cancellable = await filesystem.listenFile(
        filePath,
        (fileEvent: FileEvent | RemovedFileEvent) => {
          if (fileEvent) {
            console.debug(`Received file event: ${JSON.stringify(fileEvent)}`);
            if (fileEvent.action === 'Write' && fileEvent.info.name === fileName) {
              console.info('Create PASSED!');
              writeFileResolved = true;
            }
            if (
              fileEvent.action === 'Remove' &&
              (fileEvent as RemovedFileEvent).name === fileName
            ) {
              console.info('Remove file PASSED!');
              removeFileResolved = true;
            }
            if (writeFileResolved && removeFileResolved) {
              listenFileCancelable.cancel();
              resolve(true);
            }
          } else {
            reject(new Error('File event is not received'));
          }
        },
      );
      await filesystem.writeFile({
        path: filePath,
        data: 'Listen to file text',
        writeOperation: filesystem.WriteOperation.append,
        writeMode: 0o755,
      });
      await filesystem.remove(filePath);
      // waiting for 1 sec before deleting folder to allow all events to propagate properly
      setTimeout(async () => {
        await filesystem.remove(testFolder);
      }, 1000);
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
      const filePath = `${testFolder}/${fileName}`;
      let createFileResolved = false;
      let removeFileResolved = false;
      let removeDirResolved = false;

      console.debug('listening to directory changes');
      setTimeout(() => {
        reject(new Error('ListenDir test did not pass within allowed time frame'));
      }, 3000);

      const listenDirCancellable: Cancellable = await filesystem.listenDir(
        testFolder,
        (fileEvent: FileEvent | RemovedFileEvent) => {
          if (fileEvent) {
            console.debug(`Received file event: ${JSON.stringify(fileEvent)}`);
            if (fileEvent.action === 'Create' && fileEvent.info.name === fileName) {
              createFileResolved = true;
            }
            if (
              fileEvent.action === 'Remove' &&
              (fileEvent as RemovedFileEvent).name === fileName
            ) {
              removeFileResolved = true;
            }
            if (fileEvent.action === 'Remove' && (fileEvent as RemovedFileEvent).name === dirName) {
              removeDirResolved = true;
            }
            if (createFileResolved && removeFileResolved && removeDirResolved) {
              listenDirCancellable.cancel();
              resolve(true);
            }
          } else {
            reject(new Error('File event is not received'));
          }
        },
      );

      await filesystem.writeFile({
        path: filePath,
        data: 'listen to dir text',
        writeOperation: WriteOperation.overwrite,
        writeMode: 0o755,
      });
      await filesystem.remove(filePath);
      // waiting for 1 sec before deleting folder to allow all events to propagate properly
      setTimeout(async () => {
        await filesystem.remove(testFolder);
      }, 1000);
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
    const filePath = `${await getTestFolderPath()}/test_listenDir.txt`;
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
        reject(new Error('Could not check if directory exists'));
      }
    } catch (error) {
      reject(error);
    }
  });
