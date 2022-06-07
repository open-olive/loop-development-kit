declare namespace Keyboard {
  interface Aptitude {
    listenHotkey: Common.ListenableWithParam<Hotkey, boolean>;

    listenText: Common.Listenable<string>;

    listenCharacter: Common.Listenable<string>;

    includeOliveHelpsEvents(enabled: boolean): void;
  }

  interface Hotkey {
    key: string;
    alt?: boolean;
    altLeft?: boolean;
    altRight?: boolean;
    control?: boolean;
    controlLeft?: boolean;
    controlRight?: boolean;
    meta?: boolean;
    metaLeft?: boolean;
    metaRight?: boolean;
    shift?: boolean;
    shiftLeft?: boolean;
    shiftRight?: boolean;
  }
}
