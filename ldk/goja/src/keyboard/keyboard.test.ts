import { mocked } from 'ts-jest/utils';
import { Hotkey, keyboard } from '.'

describe('Keyboard', () => {

    beforeEach(() => {
        oliveHelps.keyboard = {
            listenHotkey: jest.fn(),
            listenText: jest.fn(),
            listenCharacter: jest.fn()
        };
    });

    describe('listenHotkey', () => {
        it('calls olive helps with given hotkey and callback function', () => {
            const callback = jest.fn();
            const hotkey: Hotkey = {
                key: 'q'
            };

            keyboard.listenHotkey(hotkey, callback);
            expect(oliveHelps.keyboard.listenHotkey).toHaveBeenCalledWith(hotkey, callback);
        });

        it('throws exception when olive helps call fails', () => {
            const exception = 'Exception';
            mocked(oliveHelps.keyboard.listenHotkey).mockImplementation(() => {
              throw exception;
            });
      
            expect(keyboard.listenHotkey).toThrow(exception);
        });
    });

    describe('listenText', () => {
        it('calls olive helps with given callback function', () => {
            const callback = jest.fn();

            keyboard.listenText(callback);
            expect(oliveHelps.keyboard.listenText).toHaveBeenCalledWith(callback);
        });

        it('throws exception when olive helps call fails', () => {
            const exception = 'Exception';
            mocked(oliveHelps.keyboard.listenText).mockImplementation(() => {
              throw exception;
            });
      
            expect(keyboard.listenText).toThrow(exception);
        });
    });

    describe('listenCharacter', () => {
        it('calls olive helps with given callback function', () => {
            const callback = jest.fn();

            keyboard.listenCharacter(callback);
            expect(oliveHelps.keyboard.listenCharacter).toHaveBeenCalledWith(callback);
        });

        it('throws exception when olive helps call fails', () => {
            const exception = 'Exception';
            mocked(oliveHelps.keyboard.listenCharacter).mockImplementation(() => {
              throw exception;
            });
      
            expect(keyboard.listenCharacter).toThrow(exception);
        });
    });
});