import { Example } from "./example";
// import * as example2 from "./example2";
import { getString } from "./example2";

jest.mock('./example2');

describe('Example', () => {
    let subject: Example;
    
    beforeEach(() => {
        subject = new Example();
    });
    
    it('multiplies two numbers', () => {
        expect(subject.multiply(2)).toEqual(4);
    });

    it('mocks out dependency', () => {
        let expectedString = "You got this from a mock!";
        // @ts-ignore
        // example2.getString = jest.fn(() => expectedString)
        (getString as jest.Mock).mockReturnValueOnce(expectedString);
        
        const actual = subject.exampleDependency()

        expect(actual).toBe(expectedString);
    });
});