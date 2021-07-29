/* eslint-disable no-async-promise-executor */
import { network } from '@oliveai/ldk';

export const testSecuredHttpRequest = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url =
      'https://api.fda.gov/food/enforcement.json?search=report_date:[20210101+TO+20210401]&limit=1';

    setTimeout(() => {
      reject(new Error('Network http request did not finish in the appropriate time span.'));
    }, 5000);

    try {
      const response = await network.httpRequest({
        url,
        method: 'GET',
      });

      if (response.statusCode === 200) {
        resolve(true);
      } else {
        reject(new Error(`Network http request failed with code: ${response.statusCode}`));
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testUnsecuredHttpRequest = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url = 'http://catalog.data.gov/api/3/';
    setTimeout(() => {
      reject(new Error('Network http request did not finish in the appropriate time span.'));
    }, 5000);

    try {
      await network.httpRequest({ url, method: 'GET' });
      reject(new Error('Should not have succeeded'));
    } catch (error) {
      resolve(true);
    }
  });

export const testHttpRequestTimeout = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const url = 'https://httpstat.us/200?sleep=2000';
      const response = await network.httpRequest({
        url,
        method: 'GET',
        timeoutMs: 3000,
      });
      if (response.statusCode === 200) {
        try {
          await network.httpRequest({
            url,
            method: 'GET',
            timeoutMs: 1000,
          });
          reject(new Error('Timeout error was not received'));
        } catch (error) {
          resolve(true);
        }
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testHttpRequestBlock = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    try {
      const url = 'https://httpstat.us/200?sleep=4000';
      setTimeout(() => {
        console.debug(`Http request blocked which caused a timeout`);
        reject(new Error(`Test didn't resolved in the appropriate time frame`));
      }, 2000);
      network
        .httpRequest({
          url,
          method: 'GET',
          timeoutMs: 5000,
        })
        .then(() => {
          console.debug(
            `Should not get here. Test should timeout or resolve before getting a response`,
          );
          reject(new Error());
        });
      console.debug(`Http request didn't blocked`);
      resolve(true);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

export const testWebsocketConnection = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url = 'wss://html5rocks.websocket.org/echo';
    const testData = new Uint8Array([53, 6, 6, 65, 20, 74, 65, 78, 74]);
    const testText = 'some text';
    let textTestPassed = false;
    let binaryTestPassed = false;

    setTimeout(() => {
      reject(new Error('Network websocket test did not finish in the appropriate time span.'));
    }, 20000);

    const socketConfiguration: network.SocketConfiguration = {
      url,
      useCompression: true,
    };

    try {
      const socket = await network.webSocketConnect(socketConfiguration);
      console.info('Websocket successfully connected');

      socket.setCloseHandler(async (error, code, text) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        console.info(`Received on close code: ${code}. ${text}`);
        if (textTestPassed && binaryTestPassed) {
          resolve(true);
        }
      });
      const cancellable = await socket.setMessageHandler(async (error, message) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        if (message) {
          console.info(`Received message: ${JSON.stringify(message)}`);
          if (typeof message === 'string') {
            if (message === testText) {
              textTestPassed = true;
            }
          } else if (JSON.stringify(message) === JSON.stringify(testData)) {
            binaryTestPassed = true;
          }
          if (textTestPassed && binaryTestPassed) {
            console.info(`Received all messages. Cancelling message listener.`);
            cancellable.cancel();
          }
        }
      });
      // send text
      await socket.writeMessage(testText);
      // send binary
      await socket.writeMessage(testData);
      // close socket
      setTimeout(async () => {
        await socket.close();
      }, 2000);
    } catch (error) {
      console.error(`Error received while testing websocket: ${error.message}`);
      reject(error);
    }
  });
