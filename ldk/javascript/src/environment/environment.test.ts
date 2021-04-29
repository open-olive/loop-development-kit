import { mocked } from 'ts-jest/utils';
import * as environment from '.';

describe('Environment', () => {
    beforeEach(() => {
        oliveHelps.environment = {
            read: jest.fn(),
        };
    });

    describe('read', () => {
        it('returns a promise with expected read value', () => {
            const expectedName = 'myReadName';
            const expectedValue = 'myReadValue';
            mocked(oliveHelps.environment.read).mockImplementation((name, callback) => callback(expectedValue));

            const actual = environment.read(expectedName);

            expect(oliveHelps.environment.read).toHaveBeenCalledWith(expectedName, expect.any(Function))
            return expect(actual).resolves.toBe(expectedValue)
        });

        it('returns a rejected promise', () => {
            const exception = 'Exception';
            mocked(oliveHelps.environment.read).mockImplementation(() => {
                throw exception;
            });

            const actual = environment.read('myName');

            return expect(actual).rejects.toBe(exception);
        });
    });
});
