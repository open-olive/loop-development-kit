chrome.runtime.onInstalled.addListener(() => {
  const ws = new WebSocket("ws://localhost:24984")
  ws.addEventListener('open', function(event) {
    console.log('Connection open')
  });

  ws.addEventListener('message', function (event) {
    let callMessage = {};
    try {
      callMessage = JSON.parse(event.data);
    } catch (e) {
      console.log("error parsing call message: " + e);
    }

    switch (callMessage.type) {
      case 'OpenTabCall':
        chrome.tabs.create({
          url: callMessage.args.address
        }).then((tab) => {
          ws.send(JSON.stringify({
            'type': 'OpenTabReturn',
            'version': 0,
            'callId': callMessage.callId,
            'return': {
              'tabId': tab.id,
              'err': ''
            }
          }));
        }, (reason) => {
          ws.send(JSON.stringify({
            'type': 'OpenTabReturn',
            'version': 0,
            'callId': callMessage.callId,
            'return': {
              'tabId': -1,
              'err': 'promise rejected: ' + reason
            }
          }));
        });
      break;

      case 'OpenWindowCall':
        chrome.windows.create({
          url: callMessage.args.address
        }).then((window) => {
          ws.send(JSON.stringify({
            'type': 'OpenWindowReturn',
            'version': 0,
            'callId': callMessage.callId,
            'return': {
              'windowId': window.id,
              'err': ''
            }
          }));
        }, (reason) => {
          ws.send(JSON.stringify({
            'type': 'OpenWindowReturn',
            'version': 0,
            'callId': callMessage.callId,
            'return': {
              'windowId': -1,
              'err': 'promise rejected: ' + reason
            }
          }));
        });
      break;

      default:
        console.log('unknown call message type');
      break;
    }
  });

  chrome.webNavigation.onBeforeNavigate.addListener((data) => {
    ws.send(JSON.stringify({
      'type': 'NavigationEvent',
      'version': 0,
      'event': data
    }));
  });

  chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    switch(request.message) {
      case 'TextSelection':
        ws.send(JSON.stringify({
          'type': 'TextSelectionEvent',
          'version': 0,
          'event': {
            'selectedText': request.data
          }
        }));
      break;

      default:
        sendResponse({data: 'invalid arguments'});
      break;
    }
  });
});

