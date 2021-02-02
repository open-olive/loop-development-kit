"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopTest = exports.Status = void 0;
const logging_1 = require("../../../../src/logging");
var Status;
(function (Status) {
    Status["PASS"] = "pass";
    Status["FAIL"] = "fail";
})(Status = exports.Status || (exports.Status = {}));
class LoopTest {
    constructor(name, methodToExecute) {
        this.id = name;
        this.methodToExecute = methodToExecute;
        this.logger = new logging_1.Logger('test-logger');
    }
    runTest() {
        try {
            this.methodToExecute();
            this.logger.info(`${this.id} - PASS`);
            return Status.PASS;
        }
        catch (error) {
            this.logger.error(`${this.id} - ERROR`);
            this.logger.error(error);
            return Status.FAIL;
        }
    }
}
exports.LoopTest = LoopTest;
