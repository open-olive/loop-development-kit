---
slug: 'guides/troubleshooting'
title: 'Troubleshooting'
description: 'Running into problems? We have some ideas that could help!'
---

So you've ran into some unexpected behaviour and you're not sure how to deal with it? We have some ideas:

## Logs

Olive Helps saves logs, and they often include pertinent information:  

1. Open the Log folder. You can access them in the following locations:
   * Mac: `~/Library/Logs/Olive Helps`
   * Windows: `%AppData%\Olive Helps\Logs`
2. Open the log file for the current Olive Helps version. We generally recommend streaming changes to the log file, 
   which you can do with the following commands:
   * Mac Terminal: `tail -n 50 -f Olive\ Helps-X.Y.Z.log`
   * Windows Powershell: `Get-Content -Tail 50 -Wait -Path ".\Olive Helps.X.Y.Z.log"`
3. Repeat the steps you followed to generate the problem the first time around. You may need to restart your Loop to do 
   this. If you find that the application cannot restart the Loop due to an error, restart the application itself. 
4. If the logging data is inadequate, you can start the application with detailed logging:
   * Mac Terminal: `LOG_LEVEL=trace open /Applications/Olive\ Helps.app`
   * Windows Powershell: `$env:LOG_LEVEL='trace'; &"$($env:LOCALAPPDATA)/Olive Helps/olivehelps.exe"`
   
## Common Issues

### Cannot Add Local Loop

If you're not able to add a Local Loop successfully, that means that the command you provided could not be successfully 
run in the directory you selected. Often this is a compilation issue where the program fails to start up successfully. 
You should check whether the Loop starts up successfully in the Terminal. 

If it is starting up successfully, it should write to `STDOUT` a string in the format `1|1|tcp|{HOST}:{PORT}|grpc`.

If you are using the Go LDK, it should generate this error message instead:

> This binary is a plugin. These are not meant to be executed directly.
> Please execute the program that consumes these plugins, which will
> load any plugins automatically
> exit status 1


### MacOS - "Executable File not found in $PATH" Error when Adding Local Loop

This error means that the command you entered for the Loop didn't correspond to an executable that's available under 
the default `$PATH` environment variable. Often that means you entered a command that works in your terminal like
`node src/index.js` because your `.zshrc` file adds its location to the `$PATH` variable on launch.

To solve this error, use the direct path to the executable that you're missing. You can get that location with the `which` command:
```shell
which node
```

And then use that path to the executable in the Command field when adding Local Loops:

```shell
/Users/richardseviora/.nvm/versions/node/v15.7.0/bin/node src/index.js
```
