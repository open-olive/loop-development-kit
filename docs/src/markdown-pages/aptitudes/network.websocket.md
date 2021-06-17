---
name: "WebSocket Connect"
links_js: "websocketconnect"
---
Initiates a WebSocket connection. Returns a Socket object which can be used to write to the socket or set a message handler function.

To initailize a WebSocket connection, you'll first need to create a SocketConfiguration object. The `url` of the WebSocket is the only required field (see the [SocketConfiguration docs](https://open-olive.github.io/loop-development-kit/ldk/javascript/interfaces/socketconfiguration.html) for more configuration options). This URL must use the `wss://` scheme.

```
const socketConfig: SocketConfiguration = {
    url: "wss://echo.websocket.org"
}

const socket: network.Socket = await network.webSocketConnect(socketConfig);
```

Once you have a Socket object, you can set a callback to handle incoming messages with `setMessageHandler`:
```
await socket.setMessageHandler(async (err, message) => {
    // do something with message contents
})
```

Write messages to the WebSocket with `writeMessage`:
```
await socket.writeMessage("Hello WebSocket!")
```

Close the Socket:
```
await socket.close()
```

Set a callback for when the WebSocket is closed:
```
await socket.setCloseHandler(async (err, code, text) => {
    // handle any tasks for closing out the connection
})
```