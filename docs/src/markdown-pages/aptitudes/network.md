---
name: "Network"
links_js: "Network"
description: "Allows Loops to make network requests to external services."
---
Allows Loops to make network requests to external services.

[Permissions must be declared](https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript#loop-permissions) for a Loop to use the Network Aptitude. 

The network permissions object must be populated with the domains you want to access in the following format:
```
ldk:
 permissions:
   network:
     urlDomains:
       -  value: 'api.fda.gov'
```
