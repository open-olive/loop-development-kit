import {mocked} from 'ts-jest/utils';
import * as excel from '.';

describe('Excel', () => {
    beforeEach(() => {
        oliveHelps.excel = {
            encode: jest.fn(),
            decode: jest.fn(),
        };
    });


})