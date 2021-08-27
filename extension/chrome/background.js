let connect = () => {
  console.log('connecting');

  const ws = new WebSocket('ws://127.0.0.1:24984');

  ws.addEventListener('close', (event) => {
    setTimeout(connect, 1000);
  });

  ws.addEventListener('open', (event) => {
    console.log('connected');

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
          chrome.tabs.create(
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
          chrome.windows.create(
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

    chrome.webNavigation.onBeforeNavigate.addListener((data) => {
      ws.send(
        JSON.stringify({
          type: 'NavigationEvent',
          version: 0,
          event: data,
        }),
      );
    });

    chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
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
  });
};

connect();
