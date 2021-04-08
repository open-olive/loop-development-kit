import { ClipboardImpl } from './clipboard';
import { mocked } from 'ts-jest/utils';

describe("Clipboard", () => {
    let subject: ClipboardImpl;
    
    beforeEach(() => {
        oliveHelps.clipboard = {
            read: jest.fn(),
            write: jest.fn(),
            listen: jest.fn()
        };
        subject = new ClipboardImpl();
    });
    
    describe("read", () => {
       it("returns a promise result with expected clipboard value", () => {
           const expected = "expected string";
           mocked(oliveHelps.clipboard.read).mockImplementation((cb) => cb(expected));
           
           let actual = subject.read();
           
           return expect(actual).resolves.toBe(expected);
       });

        it("returns a rejected promise", () => {
            const exception = "Exception";
            mocked(oliveHelps.clipboard.read).mockImplementation(() => { throw exception });

            let actual = subject.read();

            return expect(actual).rejects.toBe(exception);
        });
   }); 
});