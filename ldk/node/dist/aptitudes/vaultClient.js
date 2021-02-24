"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseClient_1 = __importDefault(require("./baseClient"));
const vault_grpc_pb_1 = require("../grpc/vault_grpc_pb");
const vault_pb_1 = __importDefault(require("../grpc/vault_pb"));
/**
 * @internal
 */
class VaultClient extends baseClient_1.default {
    /**
     * Delete a key from vault.
     *
     * @async
     * @param key - The name of the key in vault.
     */
    vaultDelete(key) {
        return this.buildQuery((message, callback) => this.client.vaultDelete(message, callback), () => {
            const msg = new vault_pb_1.default.VaultDeleteRequest();
            msg.setKey(key);
            return msg;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    /**
     * Check if a key has a value defined in vault.
     *
     * @async
     * @param key - The name of the key in vault.
     * @returns Returns true if the key has a defined value.
     */
    vaultExists(key) {
        return this.buildQuery((message, callback) => this.client.vaultExists(message, callback), () => {
            const msg = new vault_pb_1.default.VaultExistsRequest();
            msg.setKey(key);
            return msg;
        }, (response) => response.getExists());
    }
    /**
     * Get the value of a key in vault.
     *
     * @param key - The name of the key in vault.
     * @returns Promise resolving with the value of the key in vault.
     */
    vaultRead(key) {
        return this.buildQuery((message, callback) => this.client.vaultRead(message, callback), () => {
            const msg = new vault_pb_1.default.VaultReadRequest();
            msg.setKey(key);
            return msg;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (response) => response.getValue());
    }
    /**
     * Get the value of a key in vault.
     *
     * @async
     * @param key - The name of the key in vault.
     * @param value - The value to assign to the key in vault.
     */
    vaultWrite(key, value) {
        return this.buildQuery((message, callback) => this.client.vaultWrite(message, callback), () => {
            const msg = new vault_pb_1.default.VaultWriteRequest();
            msg.setKey(key);
            msg.setValue(value);
            return msg;
        }, 
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { });
    }
    generateClient() {
        return vault_grpc_pb_1.VaultClient;
    }
    serviceName() {
        return 'vault';
    }
}
exports.default = VaultClient;
