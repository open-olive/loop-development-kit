/* eslint-disable no-async-promise-executor */
import { browser, network } from '@oliveai/ldk';

const windowId = 37;

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

const browserFake = async (
  socket: network.Socket,
  msg: string | Uint8Array,
  reject: (arg0: unknown) => void,
): Promise<void> => {
  if (msg && typeof msg === 'string') {
    console.info(`Received message: ${JSON.stringify(msg)}`);
    // Regex to find callId (uuid) from msg string
    const callIdRegex = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/g;
    const [callId] = msg.match(callIdRegex);
    try {
      await socket.writeMessage(
        `{ "type": "OpenWindowReturn", "version": 0, "callId": "${callId}", "return": { "windowId": ${windowId}, "err": "" }}`,
      );
    } catch (error) {
      console.log('failed to write message ', error);
      reject(error);
    }
  }
};

export const testWebsocketConnection = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const url = 'ws://127.0.0.1:24984/';
    let testPassed = false;
    setTimeout(() => {
      reject(new Error('Network websocket test did not finish in the appropriate time span.'));
    }, 20000);

    const socketConfiguration: network.SocketConfiguration = { url };

    try {
      const socket = await network.webSocketConnect(socketConfiguration);
      console.info('Websocket successfully connected');

      await socket.setCloseHandler((error, code, text) => {
        if (error) {
          console.error('setCloseHandler error', error);
          reject(error);
        }
        console.info(`Received on close code: ${code}. ${text}`);
        if (testPassed) {
          resolve(true);
        }
      });

      const cancellable = await socket.setMessageHandler(async (error, message) => {
        if (error) {
          console.error('setMessageHandler error', error);
          reject(error);
        }
        await browserFake(socket, message, reject);
      });

      try {
        const id = await browser.openWindow('about:blank');
        console.log('open browser window with id ', id);
        testPassed = id.valueOf() === windowId;
        if (testPassed) {
          cancellable.cancel();
          console.log('All messages received, cancelling message listener!');
        }
      } catch (error) {
        console.error(`broken: ${error}`);
      } finally {
        console.log('closing socket!');
        await socket.close();
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
