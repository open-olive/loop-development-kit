/* eslint-disable */

declare module 'fastestsmallesttextencoderdecoder';
declare const oliveHelps: OliveHelps.Aptitudes;

declare namespace OliveHelps {
  interface Aptitudes {
    browser: Browser.Aptitude;
    loopconfig: Config.Aptitude;
    clipboard: Clipboard.Aptitude;
    cursor: Cursor.Aptitude;
    document: Document.Aptitude;
    filesystem: Filesystem.Aptitude;
    keyboard: Keyboard.Aptitude;
    network: Network.Aptitude;
    process: Process.Aptitude;
    screen: Screen.Aptitude;
    search: Search.Aptitude;
    system: System.Aptitude;
    ui: UI.Aptitude;
    user: User.Aptitude;
    vault: Vault.Aptitude;
    whisper: WhisperService.Aptitude;
    window: Window.Aptitude;
  }
}
