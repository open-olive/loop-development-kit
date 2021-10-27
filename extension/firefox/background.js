const setIcon = (isConnected) => {
  const offImage = 'images/OH Chrome Browser Extension Icon - Off.png';
  const onImage = 'images/OH Chrome Browser Extension Icon - On.png';
  const path = isConnected
    ? {
        16: onImage,
        48: onImage,
        128: onImage,
      }
    : {
        16: offImage,
        48: offImage,
        128: offImage,
      };
  browser.browserAction.setIcon({ path });
};

const setPopup = (isConnected) => {
  const connectedHTML = 'popup/connected.html';
  const disconnectedHTML = 'popup/disconnected.html';

  const popUp = {
    popup: isConnected ? connectedHTML : disconnectedHTML,
  };

  browser.browserAction.setPopup(popUp);
};

const backgroundAction = (isConnected) => {
  setIcon(isConnected);
  setPopup(isConnected);
};

let timeout = 2;
let connect = () => {
  backgroundAction(false);

  const ws = new WebSocket('ws://127.0.0.1:24984');

  ws.addEventListener('close', (event) => {
    if (timeout < 1000) {
      timeout *= 2;
    } else {
      timeout = 1000;
    }
    setTimeout(connect, timeout);
  });

  ws.addEventListener('open', (event) => {
    timeout = 2;

    ws.addEventListener('message', function (event) {
      let callMessage = {};
      try {
        callMessage = JSON.parse(event.data);
      } catch (e) {
        console.log('error parsing call message: ' + e);
        return;
      }

      switch (callMessage.type) {
        case 'OpenTabCall':
          browser.tabs.create(
            {
              url: callMessage.args.address,
            },
            (tab) => {
              ws.send(
                JSON.stringify({
                  type: 'OpenTabReturn',
                  version: 0,
                  callId: callMessage.callId,
                  return: {
                    tabId: tab.id,
                    err: '',
                  },
                }),
              );
            },
          );
          break;

        case 'OpenWindowCall':
          browser.windows.create(
            {
              url: callMessage.args.address,
            },
            (window) => {
              ws.send(
                JSON.stringify({
                  type: 'OpenWindowReturn',
                  version: 0,
                  callId: callMessage.callId,
                  return: {
                    windowId: window.id,
                    err: '',
                  },
                }),
              );
            },
          );
          break;

        default:
          console.log('unknown call message type');
          break;
      }
    });

    browser.webNavigation.onBeforeNavigate.addListener((data) => {
      ws.send(
        JSON.stringify({
          type: 'NavigationEvent',
          version: 0,
          event: data,
        }),
      );
    });

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.message) {
        case 'TextSelection':
          ws.send(
            JSON.stringify({
              type: 'TextSelectionEvent',
              version: 0,
              event: {
                selectedText: request.data,
              },
            }),
          );
          break;

        default:
          sendResponse({ data: 'invalid arguments' });
          break;
      }
    });

    backgroundAction(true);
  });
};

connect();
