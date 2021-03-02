"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopTest = exports.Status = void 0;
var Status;
(function (Status) {
    Status["PASS"] = "pass";
    Status["FAIL"] = "fail";
    Status["NOT_STARTED"] = "not_started";
})(Status = exports.Status || (exports.Status = {}));
class LoopTest {
    constructor(name, methodToExecute, timeoutTime, promptMarkdown) {
        this.timeout = setTimeout(() => {
            // Do nothing
        }, 0);
        this.id = name;
        this.methodToExecute = methodToExecute;
        this.status = Status.NOT_STARTED;
        this.timeoutTime = timeoutTime;
        this.promptMarkdown = promptMarkdown;
    }
    async runTest(host, logger) {
        try {
            await this.testWrapper(host);
            this.status = Status.PASS;
            logger.info(`✅ PASS - ${this.id}`);
            return new Promise((resolve) => {
                resolve(this.status);
            });
        }
        catch (error) {
            this.status = Status.FAIL;
            logger.error(`💀 FAIL - ${this.id}`);
            logger.error(typeof error === 'string' ? error : error.message);
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    async testWrapper(host) {
        return new Promise((resolve, reject) => {
            if (typeof host !== 'undefined') {
                try {
                    const prompt = host.whisper.markdownWhisper({
                        label: this.id,
                        markdown: this.promptMarkdown,
                    });
                    this.timeout = setTimeout(() => {
                        prompt.stop();
                        reject(new Error('Timeout - Too much time has passed'));
                    }, this.timeoutTime);
                    this.methodToExecute(host)
                        .then((response) => {
                        clearTimeout(this.timeout);
                        prompt.stop();
                        resolve(response);
                    })
                        .catch((error) => {
                        clearTimeout(this.timeout);
                        prompt.stop();
                        reject(error);
                    });
                }
                catch (e) {
                    reject(new Error(e));
                }
            }
            else {
                reject(new Error('Host services are unavailable'));
            }
        });
    }
    getStatus() {
        return this.status;
    }
    getId() {
        return this.id;
    }
}
exports.LoopTest = LoopTest;
