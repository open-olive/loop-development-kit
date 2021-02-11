"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformingMessage = void 0;
const logging_1 = require("../logging");
class TransformingMessage {
    constructor(transformer) {
        this.callback = (error, response) => {
            // Error code = 1 is what happens when we call stop()
            if (error && error.code !== 1) {
                this.promiseReject(error);
            }
            else if (response) {
                this.promiseResolve(this.transformer(response));
            }
        };
        this.callbackPromise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
        this.transformer = transformer;
        this.logger = new logging_1.Logger('loop-core');
    }
    promise() {
        return this.callbackPromise;
    }
    stop() {
        setImmediate(() => {
            this.call.cancel();
        });
    }
    assignCall(call) {
        if (this._call != null) {
            throw new Error("Call already assigned, can't assigned another");
        }
        this._call = call;
    }
    get call() {
        if (this._call == null) {
            throw new Error('Getting call before assignment');
        }
        return this._call;
    }
}
exports.TransformingMessage = TransformingMessage;
