import { mocked } from 'ts-jest/utils';
import { Hotkey, KeyboardImpl } from './keyboard'

class TestHotkey implements Hotkey {
    constructor(key: string) {
        this.key = key;
    }

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

describe('Keyboard', () => {
    let subject: KeyboardImpl;
    let hotkey: Hotkey;

    beforeEach(() => {
        oliveHelps.keyboard = {
            listenHotkey: jest.fn(),
            listenText: jest.fn(),
            listenCharacter: jest.fn()
        };
        subject = new KeyboardImpl();
        hotkey = new TestHotkey('q');
    });

    describe('listenHotkey', () => {
        it('calls olive helps with given hotkey and callback function', () => {
            const callback = jest.fn();

            subject.listenHotkey(hotkey, callback);
            expect(oliveHelps.keyboard.listenHotkey).toHaveBeenCalledWith(hotkey, callback);
        });

        it('throws exception when olive helps call fails', () => {
            const exception = 'Exception';
            mocked(oliveHelps.keyboard.listenHotkey).mockImplementation(() => {
              throw exception;
            });
      
            expect(subject.listenHotkey).toThrow(exception);
        });
    });

    describe('listenText', () => {
        it('calls olive helps with given callback function', () => {
            const callback = jest.fn();

            subject.listenText(callback);
            expect(oliveHelps.keyboard.listenText).toHaveBeenCalledWith(callback);
        });

        it('throws exception when olive helps call fails', () => {
            const exception = 'Exception';
            mocked(oliveHelps.keyboard.listenText).mockImplementation(() => {
              throw exception;
            });
      
            expect(subject.listenText).toThrow(exception);
        });
    });

    describe('listenCharacter', () => {
        it('calls olive helps with given callback function', () => {
            const callback = jest.fn();

            subject.listenCharacter(callback);
            expect(oliveHelps.keyboard.listenCharacter).toHaveBeenCalledWith(callback);
        });

        it('throws exception when olive helps call fails', () => {
            const exception = 'Exception';
            mocked(oliveHelps.keyboard.listenCharacter).mockImplementation(() => {
              throw exception;
            });
      
            expect(subject.listenCharacter).toThrow(exception);
        });
    });
});