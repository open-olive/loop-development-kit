"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLogger = void 0;
/**
 * This ILogger implementation swallows logging statements.
 *
 * @internal
 */
class TestLogger {
    debug() { }
    error() { }
    info() { }
    trace() { }
    warn() { }
    with() {
        return this;
    }
}
exports.TestLogger = TestLogger;
