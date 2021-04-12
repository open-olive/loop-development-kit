export interface Hotkey {
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

export interface Keyboard {
    /**
     * Calls callback function when the specified hotkey is pressed or released.
     *
     * @param hotkey - The hotkey to monitor to initiate callback.
     * @param callback - The callback function called when the specified hotkey is pressed or released.
     */
    listenHotkey(hotkey: Hotkey, callback: (pressed: boolean) => void): void
    
     /**
     * Calls callback function when text is detected from the clipboard.
     *
     * @param callback - The callback function called when text is detected from the clipboard.
     */
    listenText(callback: (text: string) => void): void

    /**
     * Calls callback function when a character is detected from the clipboard.
     *
     * @param callback - The callback function called when a character is detected from the clipboard.
     */
    listenCharacter(callback: (char: string) => void): void
}

export class KeyboardImpl implements Keyboard {
    listenHotkey(hotkey: Hotkey, callback: (pressed: boolean) => void): void {
        oliveHelps.keyboard.listenHotkey(hotkey, callback);
    }

    listenText(callback: (text: string) => void): void {
        oliveHelps.keyboard.listenText(callback);
    }

    listenCharacter(callback: (char: string) => void): void {
        oliveHelps.keyboard.listenCharacter(callback);
    }
}