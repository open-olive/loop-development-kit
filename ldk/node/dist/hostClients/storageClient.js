"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseClient_1 = __importDefault(require("./baseClient"));
const storage_grpc_pb_1 = require("../grpc/storage_grpc_pb");
const storage_pb_1 = __importDefault(require("../grpc/storage_pb"));
/**
 * @internal
 */
class StorageClient extends baseClient_1.default {
    /**
     * Delete a key from storage.
     *
     * @async
     * @param key - The name of the key in storage.
     */
    storageDelete(key) {
        return this.buildQuery((message, callback) => this.client.storageDelete(message, callback), () => {
            const msg = new storage_pb_1.default.StorageDeleteRequest();
            msg.setKey(key);
            return msg;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    /**
     * Check if a key has a value defined in storage.
     *
     * @async
     * @param key - The name of the key in storage.
     * @returns Returns true if the key has a defined value.
     */
    storageExists(key) {
        return this.buildQuery((message, callback) => this.client.storageExists(message, callback), () => {
            const msg = new storage_pb_1.default.StorageExistsRequest();
            msg.setKey(key);
            return msg;
        }, (response) => response.getExists());
    }
    /**
     * Get the value of a key in storage.
     *
     * @param key - The name of the key in storage.
     * @returns Promise resolving with the value of the key in storage.
     */
    storageRead(key) {
        return this.buildQuery((message, callback) => this.client.storageRead(message, callback), () => {
            const msg = new storage_pb_1.default.StorageReadRequest();
            msg.setKey(key);
            return msg;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (response) => response.getValue());
    }
    /**
     * Get the value of a key in storage.
     *
     * @async
     * @param key - The name of the key in storage.
     * @param value - The value to assign to the key in storage.
     */
    storageWrite(key, value) {
        return this.buildQuery((message, callback) => this.client.storageWrite(message, callback), () => {
            const msg = new storage_pb_1.default.StorageWriteRequest();
            msg.setKey(key);
            msg.setValue(value);
            return msg;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    generateClient() {
        return storage_grpc_pb_1.StorageClient;
    }
}
exports.default = StorageClient;
