"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestGroup {
    constructor(name, tests) {
        this.id = name;
        this.tests = tests;
    }
    getId() {
        return this.id;
    }
    getTests() {
        return this.tests;
    }
}
exports.default = TestGroup;
