"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformingStream = void 0;
const logging_1 = require("../logging");
/**
 * The TransformingStream is a wrapper class that abstracts the grpc.ClientReadableStream interface away from the
 * user and transforms the input from the grpc format to Node objects.
 *
 * This is used when the Library sensor is providing a stream of events, instead of a one-time response.
 *
 * @internal
 */
class TransformingStream {
    /**
     * @param stream - the stream object
     * @param transformer - a transformer function that converts the grpc input to the desired output.
     * @param listener - an optional listener function provided by the consumer that is called whenever events are outputted.
     */
    constructor(stream, transformer, listener) {
        this.streamWatcher = (stream) => {
            if (this.listener) {
                const error = stream.getError();
                if (error !== '') {
                    this.listener(error);
                }
                else {
                    this.listener(null, this.transformer(stream));
                }
            }
        };
        this.errorWatcher = (error) => {
            if (this.listener) {
                this.listener(error.details);
                // Stream was stopped, need to remove the stream here
                // to handle the "error" from cancelling the stream
                if (error.code === 1) {
                    this.logger.debug('Cancelling stream');
                    this.stream.removeAllListeners('error');
                }
            }
        };
        this.stream = stream;
        this.transformer = transformer;
        this.listener = listener;
        this.stream.addListener('data', this.streamWatcher);
        this.stream.addListener('error', this.errorWatcher);
        this.logger = new logging_1.Logger('loop-core');
    }
    setListener(callback) {
        this.listener = callback;
    }
    stop() {
        this.stream.cancel();
        this.stream.removeAllListeners('data');
    }
}
exports.TransformingStream = TransformingStream;
