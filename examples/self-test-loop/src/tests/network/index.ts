/* eslint-disable no-async-promise-executor */
import { network, whisper, clipboard } from '@oliveai/ldk';

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
    // Whisper to instruct the user to get a test websocket URL from piesocket
    const getUrlWhisper = await whisper.create({
      label: 'Get websocket URL',
      onClose: () => undefined,
      components: [
        {
          type: whisper.WhisperComponentType.Markdown,
          body: '[Click this link](https://www.piesocket.com/websocket-tester) and copy/paste the websocket URL it gives you (starts with wss://) into the text input below',
        },
      ],
    });

    // After copying the websocket URL from the above step run websocket test
    const clipboardListener = await clipboard.listenWithOptions(
      { includeOliveHelpsEvents: false },
      async (url) => {
        let testPassed = false;

        const socketConfiguration: network.SocketConfiguration = { url };

        try {
          const socket = await network.webSocketConnect(socketConfiguration);
          console.info('Websocket successfully connected');
          const cancellable = await socket.setMessageHandler(async (error, message) => {
            if (error) {
              console.error('setMessageHandler error', error);
              reject(error);
            }

            console.log(`Received message: ${message}`);

            // This is the first message that is always returned from piesocket on connect
            if (message === 'You are using a test api key') {
              testPassed = true;
            }

            socket.close();
            console.info('Socket closed');

            getUrlWhisper.close(console.error);
            console.info('Whisper closed');

            clipboardListener.cancel();
            console.info('Clipboard listener cancelled');
            cancellable.cancel();
          });

          await socket.writeMessage('You are using a test api key');

          await socket.setCloseHandler((error, code, text) => {
            if (error) {
              console.error('setCloseHandler error', error);
              reject(error);
            }

            console.info(`Received on close code: ${code}. ${text}`);

            // This is from us closing the socket connection in the message handler below
            if (testPassed) {
              resolve(true);
            }
          });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      },
    );
  });
