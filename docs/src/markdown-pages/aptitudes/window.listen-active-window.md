---
name: "Listen to Active Window changes"
links_js: "listenActiveWindow"
---
Receive notifications whenever the currently focused window changes.

Some applications will sometimes open small windows at certain times in the application lifecycle. These windows will share the same process ID as the previous one. Depending on your desired logic that change may or may not be relevant to you.

### Example

Google Chrome 89 on MacOS generates a new active window whenever the user moves their mouse over a link. These windows share the same process ID as the previous Chrome active window event but are very short. Consider these two events:

```
2021-05-07T10:56:28-07:00 INF Received Event {"title":"Google Chrome","path":"Google Chrome","pid":2650,"x":-1886,"y":2107,"width":536,"height":22} console=info loopID=def system=secureloops
2021-05-07T10:56:30-07:00 INF Received Event {"title":"`listenActiveWindow` sends notification upon mouse move in current active window · Issue #156 · open-olive/loop-development-kit","path":"Google Chrome","pid":2650,"x":-1885,"y":25,"width":1896,"height":2103} console=info loopID=def system=secureloops
```

The first event was triggered when the cursor moved over a link in Google Chrome. It is a window only 22 pixels high. The second event was triggered when the cursor moved away from the link in Chrome. It is a full sized window. Both windows share the same process ID.

The first window was only 22 pixels high and so it does not represent a context change.

If you're listening to active window changes to determine when the user has moved between applications, you should check to see if the process ID has also changed. 