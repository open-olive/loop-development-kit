---
slug: 'guides/permissions-configuration'
title: 'Configure Loop Permissions'
description: "Learn how to set up Loop permissions"
---

# Permission Configuration

If your Loop requires different permissions for different development environments, you can create special configuration files which can be loaded when running your Loop build.

These configuration files should be named according to this pattern: `ldk-config.env.json`, where `env` can any string that indicates the name of a development environment. For example: `ldk-config.dev.json` or `ldk-config.qa.json`.

Per-environment configs can be activated by setting the `LDK_CONFIG` environment variable when running the Loop transpilation process. For example, running `LDK_CONFIG=dev npm run build` will load the configuration in `ldk-config.dev.json`.

The permissions you declare in the `ldk` configuration section of your Loop's `package.json` are considered the "base" permissions config. For Aptitudes which require specific configuration (namely, the Network and Filesystem Aptitudes), any configuration in the environment specific config file will **replace** any values for these permissions in the base configuration. Running the build with no value for `LDK_CONFIG` set will result in only the base configuration being applied.

## Example
As an example of this feature, consider the following two configurations:

`package.json`
```
 "ldk": {
    "permissions": {
      "network": {
          "urlDomains": [
              { "value": "example.com" }
          ]},
      "whisper": {},
      "clipboard": {}
    }
  }
```

`ldk-config.dev.json`
```
 "ldk": {
    "permissions": {
      "network": {
          "urlDomains": [
              { "value": "example-dev.com" }
          ]
      }
    }
}
```

The `package.json` represents the 'base' configuration, while `ldk-config.dev.json` overrides the configuration of the Network aptitude permissions.

In this example, if the Loop is built with no `LDK_CONFIG` specified, the base configuration will be used. The Network Aptitude will have permission to make requests to `example.com`.

If, instead, `LDK_CONFIG` is set to `dev`, the dev configuration will be loaded. In this case, the Network Aptitude will have permission to make requests to `example-dev.com` (and _not_ `example.com`).

In either case, since the Whisper and Clipboard Aptitude permissions are granted in the base configuration, those permissions will be present in both the dev and base configurations.