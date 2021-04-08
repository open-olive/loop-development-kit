import { ClipboardImpl } from './clipboard';

describe("Clipboard", () => {
    const subject = new ClipboardImpl()
    
   describe("read", () => {
       it("returns a promise result with expected clipboard value", () => {
           const expected = "expected string";
           oliveHelps.clipboard = {
               read: jest.fn(() => expected),
               write: jest.fn(),
               listen: jest.fn()
           };
           
           let actual = subject.read();
           
           expect(actual).resolves.toBe(expected)
       });
   }); 
});