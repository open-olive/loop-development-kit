"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSuite {
    constructor(tests, logger) {
        this.tests = tests;
        this.logger = logger;
    }
    async start(host) {
        const elements = {};
        let i = 0;
        for await (const test of this.tests) {
            try {
                await test.runTest(host, this.logger);
                elements[`${i}`] = {
                    value: test.getStatus(),
                    label: test.getId(),
                    order: i + 1,
                    type: 'pair',
                };
                i += 1;
            }
            catch (err) {
                // do nothing, already logging
            }
        }
        host.whisper.listWhisper({
            label: 'Self Test - Results',
            markdown: '',
            elements,
        });
        return true;
    }
}
exports.default = TestSuite;
