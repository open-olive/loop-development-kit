import BaseClient, { GRPCClientConstructor } from './baseClient';
import { VaultClient as VaultGRPCClient } from '../grpc/vault_grpc_pb';
import { Vault } from './vault';
/**
 * @internal
 */
export default class VaultClient extends BaseClient<VaultGRPCClient> implements Vault {
    /**
     * Delete a key from vault.
     *
     * @async
     * @param key - The name of the key in vault.
     */
    delete(key: string): Promise<void>;
    /**
     * Check if a key has a value defined in vault.
     *
     * @async
     * @param key - The name of the key in vault.
     * @returns Returns true if the key has a defined value.
     */
    exists(key: string): Promise<boolean>;
    /**
     * Get the value of a key in vault.
     *
     * @param key - The name of the key in vault.
     * @returns Promise resolving with the value of the key in vault.
     */
    read(key: string): Promise<string>;
    /**
     * Get the value of a key in vault.
     *
     * @async
     * @param key - The name of the key in vault.
     * @param value - The value to assign to the key in vault.
     */
    write(key: string, value: string): Promise<void>;
    protected generateClient(): GRPCClientConstructor<VaultGRPCClient>;
    protected serviceName(): string;
}
