---
name: 'Filesystem'
links_js: 'Filesystem'
description: 'Provides read and write access to the filesystem, enabling Loop Authors to read and write files.'
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

### Filesystem Notes

When your Loop is executing within Olive Helps, it will generate its own unique "work directory" upon first run. This work directory is separate from every other Loop, and is empty at start.

#### Other rules pertaining to Loop's unique "work directory":

- Loops can do whatever they want in this directory, but they cannot destroy their "work directory" reference. For example, `filesystem.remove("./")` is **invalid**.
- If your Loop accesses a relative path (example: `./some-file.txt`), you do not have to specify that path in your `package.json` permission list as a `pathGlob`.
- All relative paths are automatically allowed as long as they actually resolve to something in the Loop's "work directory".
- Filepaths which refer to parent directories (example: `../`) will be securely handled/processed.
- The Loop's "work directory" is named as the Loop's `AppId` - anything in the directory should persist across Loop updates.

#### Working with files outside of Loop's unique "work directory":

- Files can be written outside of each Loop's "work directory", if an absolute path is provided. In this filepath scheme are **persisted across Loop fresh installs**. Permissions must be declared for the Loop specifying absolute file paths. For example, `/some/path/something.txt` can be written by specifying the following permissions:
```
"filesystem": {
  "pathGlobs": [
    { "value": "/some/path/something.txt" }
  ]
},
...
```
