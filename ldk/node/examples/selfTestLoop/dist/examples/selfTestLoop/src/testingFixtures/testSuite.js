"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSuite {
    constructor(tests) {
        this.tests = tests;
    }
    start() {
        this.tests.forEach((test) => {
            test.runTest();
        });
    }
}
exports.default = TestSuite;
