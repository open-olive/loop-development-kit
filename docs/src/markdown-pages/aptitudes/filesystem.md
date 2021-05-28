---
name: "Filesystem"
links_js: "Filesystem"
description: "Provides read and write access to the filesystem, enabling Loop Authors to read and write files."
---
Provides read and write access to the filesystem, enabling Loop Authors to read and write files.

[Permissions must be declared](https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript#loop-permissions) for a Loop to use the Filesystem Aptitude. 

The filesystem permissions object must be populated with the locations you want to access in the following format:
```
ldk:
 permissions:
   filesystem:
     pathGlobs:
       -  value: '/tmp/*.txt'
```