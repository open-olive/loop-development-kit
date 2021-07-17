/* eslint-disable no-async-promise-executor */
import { filesystem, network } from '@oliveai/ldk';
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
      writeOperation: filesystem.WriteOperation.overwrite,
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
            writeOperation: filesystem.WriteOperation.overwrite,
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
            writeOperation: filesystem.WriteOperation.overwrite,
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
    const filePath = `${await getTestFolderPath()}/test_listenFile.txt`;
    const writeMode = 0o755;
    console.info('listening to file changes');
    let listenFileCancelable: Cancellable;

    setTimeout(() => {
      reject(new Error(`ListenFile test didn't passed within allowed time frame`));
    }, 3000);

    filesystem
      .writeFile({
        path: filePath,
        data: new Uint8Array(),
        writeOperation: filesystem.WriteOperation.overwrite,
        writeMode,
      })
      .then(() => {
        console.debug('Write file for listening successful');
        filesystem
          .listenFile(filePath, async (response) => {
            if (response) {
              console.debug(`Received file action: ${response.action}`);
              console.debug(`${response.info.modTime}`);

              listenFileCancelable.cancel();
              await filesystem.remove(filePath);
              resolve(true);
            } else {
              reject(new Error('File info is not received'));
            }
          })
          .then((cancellable: Cancellable) => {
            listenFileCancelable = cancellable;
            console.debug('writing file we listen to');
            network
              .encode('Listen to file text')
              .then((encodedValue) => {
                filesystem
                  .writeFile({
                    path: filePath,
                    data: encodedValue,
                    writeOperation: filesystem.WriteOperation.append,
                    writeMode,
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
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

export const testListenDir = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenDir.txt`;
    const dirPath = `${await getTestFolderPath()}`;
    const writeMode = 0o755;
    let listenDirCancellable: Cancellable;
    console.info('listening to directory changes');

    setTimeout(() => {
      reject(new Error('ListenDir test did not pass within allowed time frame'));
    }, 3000);

    console.debug('Write file for listening successful');
    filesystem
      .listenDir(dirPath, async (response) => {
        if (response) {
          console.info(`Received file action in directory: ${response.action}`);
          console.info(`${response.info.modTime}`);

          listenDirCancellable.cancel();
          await filesystem.remove(filePath);
          resolve(true);
        } else {
          reject(new Error('File action is not received'));
        }
      })
      .then((cancellable) => {
        listenDirCancellable = cancellable;
        console.info('writing file we listen to');
        network
          .encode('Listen to dir text')
          .then((encodedValue) => {
            filesystem
              .writeFile({
                path: filePath,
                data: encodedValue,
                writeOperation: filesystem.WriteOperation.overwrite,
                writeMode,
              })
              .catch((error) => {
                reject(error);
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
          writeOperation: filesystem.WriteOperation.overwrite,
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

    network
      .encode('some text')
      .then((encodedValue) => {
        setTimeout(() => {
          filesystem
            .writeFile({
              path: filePath,
              data: encodedValue,
              writeOperation: filesystem.WriteOperation.overwrite,
              writeMode,
            })
            .then(() => {
              filesystem.openWithDefaultApplication(filePath).then(() => {
                setTimeout(() => {
                  filesystem
                    .remove(filePath)
                    .then(() => {
                      setTimeout(() => {
                        resolve(true);
                      }, 1500);
                    })
                    .catch((error) => {
                      setTimeout(() => {
                        reject(error);
                      }, 1500);
                    });
                }, 3000);
              });
            })
            .catch((error) => {
              console.error('write file failed');
              reject(error);
            });
        }, 500);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const testOpenFileDoesNotExist = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `nofile.txt`;

    filesystem
      .openWithDefaultApplication(filePath)
      .then(() => {
        // Resolves even when file not found
        reject(new Error("Shouldn't get a success here"));
      })
      .catch((e) => {
        resolve(true);
      });
  });

export const testOpenDirectory = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = ``;
    filesystem
      .openWithDefaultApplication(filePath)
      .then(() => {
        resolve(true);
      })
      .catch((e) => {
        reject(new Error("Couldn't open the directory"));
      });
  });
