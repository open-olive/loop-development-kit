/* eslint-disable */

declare module 'fastestsmallesttextencoderdecoder';
declare const oliveHelps: OliveHelps.Aptitudes;

declare namespace OliveHelps {
  interface Aptitudes {
    browser: Browser.Aptitude;
    clipboard: Clipboard.Aptitude;
    whisper: WhisperService.Aptitude;
    filesystem: Filesystem.Aptitude;
    cursor: Cursor.Aptitude;
    keyboard: Keyboard.Aptitude;
    network: Network.Aptitude;
    process: Process.Aptitude;
    system: System.Aptitude;
    search: Search.Aptitude;
    ui: UI.Aptitude;
    user: User.Aptitude;
    vault: Vault.Aptitude;
    window: Window.Aptitude;
    document: Document.Aptitude;
    screen: Screen.Aptitude;
  }
}
