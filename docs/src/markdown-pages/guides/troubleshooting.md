---
slug: 'guides/troubleshooting'
title: 'Troubleshooting'
description: 'Running into problems? We have some ideas that could help!'
---

So you've ran into some unexpected behavior and you're not sure how to deal with it? We have some ideas:

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

## Github Issues

The LDK provides [a location](https://github.com/open-olive/loop-development-kit/issues) for Loop Authors to open and track issues that they are experiencing when building Loops. We recommend searching issues to find solutions to common problems.

## Common Issues

### Cannot Add Local Loop

If you're not able to add a Local Loop successfully, that means that the compiled Loop you provided could not be successfully 
run in the directory you selected. Often this is a runtime issue where the program fails to evaluate your Loop successfully. 

If your Loop is failing in this way, please check the Olive Helps log as specified above.
