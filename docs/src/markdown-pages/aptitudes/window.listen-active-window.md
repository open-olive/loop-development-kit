---
name: "Listen to Active Window changes"
links_js: "listenActiveWindow"
---
Receive notifications whenever the currently focused window changes.

As of Olive Helps 0.16.3 - Notifications will not be sent when the currently focused window is changing to another window created under the same process, and either window's height OR width is less than 50 pixels. We filter these windows out because some applications will create and focus on small windows that are not visible to the user (Google Chrome on Mac creates a 500x25 px window), and those changes do not reflect a tangible change in the active window. 