---
name: "User"
links_js: "User"
description: "Allows Loops to obtain a signed JWT which can be used to identify an Olive Helps user to 3rd party services."
---
Allows Loops to obtain a signed JWT which can be used to identify an Olive Helps user to 3rd party services.

This token is signed by Olive and contains claims which identify the current Olive Helps user. Loop Authors can use the JWT to authenticate the current user on their own services. The most likely use case for the JWT would be as an initial identifying token for an external service. The service in question could then issue its own JWT (or other authentication method) for future requests to that service.
