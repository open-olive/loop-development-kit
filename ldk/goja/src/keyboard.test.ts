import { mocked } from 'ts-jest/utils';
import { KeyboardImpl } from './keyboard'

describe('Keyboard', () => {
    let subject: KeyboardImpl;

    beforeEach(() => {
        oliveHelps.keyboard = {
            listenHotkey: jest.fn(),
            listenText: jest.fn(),
            listenCharacter: jest.fn()
        };
        subject = new KeyboardImpl();
    });

    describe('listenHotkey', () => {
        it('calls olive helps with given hotkey and callback function', () => {
            const hotkey = 'q';
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
});