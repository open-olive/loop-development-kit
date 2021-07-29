---
name: 'Filesystem'
links_js: 'Filesystem'
description: 'Provides read and write access to the filesystem, enabling Loop Authors to read and write files.'
---

Provides read and write access to the filesystem, enabling Loop Authors to read and write files.

[Permissions must be declared](https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript#loop-permissions) for a Loop to use the Filesystem Aptitude.

### Permissions

The filesystem permissions object must be populated with the absolute paths of the files and directories you want to access in the following format:

```json5
{
  "ldk": {
    "permissions": {
      "filesystem": {
        "pathGlobs": [
          {
            // Provides access to all files in the /tmp directory that have a .txt extension.
            "value": "/tmp/*.txt"
          },
          {
            // Provides access to all directories and files under the /tmp directory.
            "value": "/tmp/**"
          },
          {
            // Provides access to all files with .txt extensions in the /tmp directory or any of its subdirectories.
            "value": "/tmp/**/*.txt"
          },
          {
            // Provides access to all files with .txt extensions in any subdirectory of /tmp.
            "value": "/tmp/*/*.txt"
          }
        ]
      }
    }
  }
}
```

Attempts to access a file or directory you have not added permissions for will fail.

### Working Directory

Each Loop gets a dedicated working directory that it can use to store files that don't need to be placed in a specific location. 

Other Loops will not be able to access this directory.

Each Loop with filesystem permissions requested will automatically have access to this directory, its subdirectories, and any files within. If you only need access to the working directory, provide an empty `filesystem` permissions object:

```json
{
  "ldk": {
    "permissions": {
      "filesystem": {}
    }
  }
}
```

To access a file or directory inside the working directory, provide a relative path:
```js
const csvContents = await ldk.filesystem.readFile('./my-file.csv');
```

- Loops can do whatever they want in this directory, but they cannot destroy their working directory. For example `filesystem.remove("./")` will fail.
- All relative paths are automatically allowed as long as they actually resolve to something in the Loop's "work directory".
- Fil epaths which refer to parent directories (example: `../`) requires permissions to be specifically provided as normal.
- Shutting down or updating a Loop does not delete the working directory or its contents.
