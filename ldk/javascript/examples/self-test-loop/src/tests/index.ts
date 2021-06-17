import {
  clipboard,
  cursor,
  keyboard,
  network,
  process,
  vault,
  window,
  user,
  ui,
  filesystem,
} from '@oliveai/ldk';

import { Cancellable } from '@oliveai/ldk/dist/cancellable';
import * as testUtils from '../testUtils';

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

export const clipboardWriteAndQuery = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const string = 'Im in yr loop, writing to yr clipboard';
    clipboard
      .write(string)
      .then(() => {
        clipboard.read().then((response) => {
          if (response === string) {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          } else {
            reject(new Error('Incorrect value detected'));
          }
        });
      })
      .catch((e) => {
        reject(e);
      });
  });

export const clipboardStream = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var clipboardStream: Cancellable;
    clipboard
      .listen(true, (response) => {
        if (response === 'LDKThxBai') {
          clipboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (clipboardStream = cancellable));
  });

export const cursorPosition = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    cursor
      .position()
      .then((response) => {
        console.debug(`Cursor X - ${response.x}`);
        console.debug(`Cursor Y - ${response.y}`);
        setTimeout(() => {
          resolve(true);
        }, 1500);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });

export const streamCursorPosition = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    let i = 0;
    var cursorPositionStream: Cancellable;
    cursor
      .listenPosition((response) => {
        if (typeof response !== 'undefined') {
          console.debug(`Cursor Stream X - ${response.x}`);
          console.debug(`Cursor Stream Y - ${response.y}`);
          i += 1;

          if (i >= 5) {
            cursorPositionStream.cancel();
            resolve(true);
          }
        }
      })
      .then((cancellable: Cancellable) => (cursorPositionStream = cancellable));
  });

export const listenActiveWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var activeWindowStream: Cancellable;
    window
      .listenActiveWindow((response) => {
        if (response) {
          console.debug('Window become active', 'response', response.title);
          activeWindowStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (activeWindowStream = cancellable));
  });

export const activeWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .activeWindow()
      .then((windowInfo) => {
        console.debug(windowInfo.height);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const allWindowTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    window
      .all()
      .then((allWindows) => {
        console.debug(allWindows.length);
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const processQuery = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    process
      .all()
      .then((processList) => {
        console.debug(JSON.stringify(processList[0].pid));
        setTimeout(() => {
          resolve(true);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const processStream = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var processStream: Cancellable;
    process
      .listenAll((response) => {
        console.debug(response.processInfo.pid);
        processStream.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => (processStream = cancellable));
  });

export const vaultReadWrite = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const value = 'Do I exist?';
    vault.write('testKey', value).then(() => {
      vault
        .exists('testKey')
        .then((exists) => {
          console.debug(`Value exists in vault: ${exists}`);
          if (!exists) {
            reject(new Error('Key does not exist in storage'));
            return null;
          }

          return vault.read('testKey');
        })
        .then((vaultValue) => {
          console.debug(`Value in vault: ${vaultValue}`);
          if (vaultValue !== value) {
            reject(new Error('Stored value does not match initial value'));
            return null;
          }

          return vault.remove('testKey');
        })
        .then(() => {
          console.debug(`Value deleted from vault`);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

export const queryDirectory = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const dirPath = `${await getTestFolderPath()}`;
    const writeMode = 0o755;
    await filesystem.writeFile({
      path: `${dirPath}/file.json`,
      data: new Uint8Array([102, 85]),
      writeOperation: filesystem.WriteOperation.overwrite,
      writeMode: writeMode,
    });
    filesystem
      .dir(dirPath)
      .then((response) => {
        for (let i = 0; i < response.length; i += 1) {
          if (response[i].name === 'file.json' && !response[i].isDir) {
            setTimeout(() => {
              resolve(true);
            }, 1500);
          }
        }
      })
      .catch((error) => {
        setTimeout(() => {
          reject(error);
        }, 1500);
      })
      .finally(async () => {
        await filesystem.remove(`${dirPath}/file.json`);
      });
  });

export const createAndDeleteFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test.txt`;
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
              writeMode: writeMode,
            })
            .then(() => {
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

export const updateAndReadFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const testString = 'Im in yr loop, writing to yr clipboard';
    const filePath = `${await getTestFolderPath()}/test.txt`;
    const writeMode = 0o755;

    setTimeout(() => {
      network
        .encode(testString)
        .then((encodedValue) => {
          filesystem
            .writeFile({
              path: filePath,
              data: encodedValue,
              writeOperation: filesystem.WriteOperation.overwrite,
              writeMode: writeMode,
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
    }, 1000);
  });

export const listenFile = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenFile.txt`;
    const writeMode = 0o755;
    console.info('listening to file changes');
    let listenFileCancelable: Cancellable;

    setTimeout(() => {
      reject(new Error('ListenFile test didnt passed within allowed timeframe'));
    }, 3000);

    filesystem
      .writeFile({
        path: filePath,
        data: new Uint8Array(),
        writeOperation: filesystem.WriteOperation.overwrite,
        writeMode: writeMode,
      })
      .then(() => {
        console.debug('Write file for listening successful');
        filesystem
          .listenFile(filePath, async (response) => {
            if (response) {
              console.debug('Received file action: ' + response.action);
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
                    writeMode: writeMode,
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

export const listenDir = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenDir.txt`;
    const dirPath = `${await getTestFolderPath()}`;
    const writeMode = 0o755;
    let listenDirCancellable: Cancellable;
    console.info('listening to directory changes');

    setTimeout(() => {
      reject(new Error('ListenDir test did not pass within allowed timeframe'));
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
                writeMode: writeMode,
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

export const dirExists = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const destination = `${await getTestFolderPath()}/test-tmp-dir`;
    const writeMode = 0o755;
    filesystem.makeDir(destination, writeMode).then(() => {
      filesystem.exists(destination).then((exists) => {
        filesystem.remove(destination);
        if (exists === true) {
          resolve(true);
        }
        reject('Could not check if directory exists');
      });
    });
  });

export const fileExists = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const filePath = `${await getTestFolderPath()}/test_listenDir.txt`;
    const writeMode = 0o755;
    network.encode('some file text').then((encodedValue) => {
      filesystem
        .writeFile({
          path: filePath,
          data: encodedValue,
          writeOperation: filesystem.WriteOperation.overwrite,
          writeMode: writeMode,
        })
        .then(() => {
          filesystem.exists(filePath).then((exists) => {
            filesystem.remove(filePath);
            if (exists === true) {
              resolve(true);
            }
            reject('Could not check if directory exists');
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

export const networkHTTPS = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url =
      'https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1';

    setTimeout(() => {
      reject(new Error('Network http request did not finish in the appropriate timespan.'));
    }, 5000);

    network
      .httpRequest({
        url,
        method: 'GET',
      })
      .then((response: network.HTTPResponse) => {
        if (response.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error('Network http request failed with code: ' + response.statusCode));
        }
      })
      .catch((e) => {
        console.debug(JSON.stringify(e));
        reject(e);
      });
  });

export const networkHTTP = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const url = 'http://catalog.data.gov/api/3/';
    setTimeout(() => {
      reject(new Error('Network http request did not finish in the appropriate timespan.'));
    }, 5000);

    network
      .httpRequest({
        url,
        method: 'GET',
      })
      .then(() => {
        reject(new Error('Should not have succeeded'));
      })
      .catch(() => {
        resolve(true);
      });
  });

export const networkWebSocket = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url = 'wss://html5rocks.websocket.org/echo';
    const testData = new Uint8Array([53, 6, 6, 65, 20, 74, 65, 78, 74]);
    const testText = 'some text';
    let textTestPassed = false;
    let binaryTestPassed = false;

    setTimeout(() => {
      reject(new Error('Network websocket test did not finish in the appropriate timespan.'));
    }, 20000);

    const socketConfiguration: network.SocketConfiguration = {
      url: url,
      useCompression: true,
    };

    try {
      console.debug('Stating websocket connect');
      const socket = await network.webSocketConnect(socketConfiguration);
      console.debug('Websocket successfully connected');
      socket.setCloseHandler((error, code, text) => {
        if (error) {
          console.error(`OnCloseHandler received error:`);
          console.error(error);

          return;
        }

        console.info(`Received on close code: ${code}. ${text}`);
      });
      const cancellable: Cancellable = await socket.setMessageHandler(async (error, message) => {
        if (error) {
          console.error(error);

          return;
        }
        if (message) {
          if (typeof message === 'string') {
            if (message === testText) {
              console.debug(`Received text data`);
              textTestPassed = true;
              if (binaryTestPassed) {
                resolve(true);
                await testUtils.finalizeWebsocketTest(cancellable, socket);
              }
            }
          } else {
            if (JSON.stringify(message) === JSON.stringify(testData)) {
              console.debug(`Received binary data`);
              binaryTestPassed = true;
              if (textTestPassed) {
                resolve(true);
                await testUtils.finalizeWebsocketTest(cancellable, socket);
              }
            }
          }
        }
      });
      // send text
      await socket.writeMessage(testText);
      // send binary
      await socket.writeMessage(testData);
    } catch (error) {
      console.error(`Error received while testing websocket: ${error.message}`);
      reject(error);
    }
  });

export const charTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var keyboardStream: Cancellable;
    keyboard
      .listenCharacter((char) => {
        console.debug('Character pressed', 'response', char);
        if (char === 'f' || char === 'F') {
          keyboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (keyboardStream = cancellable));
  });

export const charStreamTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var keyboardStream: Cancellable;
    keyboard
      .listenText((text) => {
        console.debug('Characters pressed', 'response', text);
        if (text === 'Olive') {
          keyboardStream.cancel();
          resolve(true);
        }
      })
      .then((cancellable: Cancellable) => (keyboardStream = cancellable));
  });

export const hotkeyTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const hotkeys = {
      key: 'a',
      control: true,
    };

    var keyboardStream: Cancellable;
    keyboard
      .listenHotkey(hotkeys, (pressed) => {
        console.debug('Hotkey pressed', 'response', pressed);
        keyboardStream.cancel();
        resolve(true);
      })
      .then((cancellable: Cancellable) => (keyboardStream = cancellable));
  });

export const userJWTTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt().then((token) => {
      if (token) {
        console.debug('jwt', token);
        resolve(true);
      } else {
        reject('JWT should not have been empty');
      }
    });
  });

export const uiSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var uiStream: Cancellable;
    ui.listenSearchbar((value) => {
      if (value.toLowerCase() === 'for life') {
        uiStream.cancel();
        resolve(true);
      }
    }).then((cancellable: Cancellable) => (uiStream = cancellable));
  });

export const uiGlobalSearchTest = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    var uiStream: Cancellable;
    ui.listenGlobalSearch((value) => {
      if (value.toLowerCase() === 'for meaning') {
        uiStream.cancel();
        resolve(true);
      }
    }).then((cancellable: Cancellable) => (uiStream = cancellable));
  });
