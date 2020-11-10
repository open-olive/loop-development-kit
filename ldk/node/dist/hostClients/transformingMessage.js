"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformingMessage = void 0;
class TransformingMessage {
    constructor(transformer) {
        this.callback = (error, response) => {
            if (error) {
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
    }
    promise() {
        return this.callbackPromise;
    }
    stop() {
        this.call.cancel();
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
