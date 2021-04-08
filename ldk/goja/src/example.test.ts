import createMockInstance from 'jest-create-mock-instance';
import { Example } from "./example";
import { Example2 } from "./example2"

const MockExample2 = createMockInstance(Example2);

describe('Example', () => {
    it('multiplies two numbers', () => {
        let subject = new Example();
        expect(subject.multiply(2)).toEqual(4);
    });

    it('mocks out dependency', () => {
        let subject = new Example();
        let expectedString = "You got this from a mock!";
        MockExample2.getString.mockImplementation(() => expectedString);
        subject.example2 = MockExample2
        
        // subject.example2.getString = jest.fn(() => {return expectedString});

        expect(subject.exampleDependency()).toEqual(expectedString);
    });
});