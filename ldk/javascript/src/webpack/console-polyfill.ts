// Need to be able to use any[] to copy what console uses
/* eslint-disable @typescript-eslint/no-explicit-any */

const jsonStringifier = (consoleFunction: (...messages: any[]) => void, messages: any[]) => {
  if (messages.length) {
    if (messages.length === 1) {
      return consoleFunction(JSON.stringify(messages[0]));
    }
    return consoleFunction(JSON.stringify(messages));
  }
  return consoleFunction();
};

const consoleDebug = (...messages: any[]): void => jsonStringifier(global.console.debug, messages);
const consoleError = (...messages: any[]): void => jsonStringifier(global.console.error, messages);
const consoleInfo = (...messages: any[]): void => jsonStringifier(global.console.info, messages);
const consoleLog = (...messages: any[]): void => jsonStringifier(global.console.log, messages);
const consoleWarn = (...messages: any[]): void => jsonStringifier(global.console.warn, messages);

export {
  consoleDebug as debug,
  consoleError as error,
  consoleInfo as info,
  consoleLog as log,
  consoleWarn as warn,
};
