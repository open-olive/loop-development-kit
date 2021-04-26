/* eslint-disable */

global.console = {
    log: jest.fn(), // Override console.log in all unit tests
    error: jest.fn(), // Also console.log
};