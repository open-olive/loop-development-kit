import BaseClient, { GRPCClientConstructor } from './baseClient';
import { VaultClient as VaultGRPCClient } from '../grpc/vault_grpc_pb';
import { VaultService } from './vaultService';
/**
 * @internal
 */
export default class VaultClient extends BaseClient<VaultGRPCClient> implements VaultService {
    /**
     * Delete a key from vault.
     *
     * @async
     * @param key - The name of the key in vault.
     */
    vaultDelete(key: string): Promise<void>;
    /**
     * Check if a key has a value defined in vault.
     *
     * @async
     * @param key - The name of the key in vault.
     * @returns Returns true if the key has a defined value.
     */
    vaultExists(key: string): Promise<boolean>;
    /**
     * Get the value of a key in vault.
     *
     * @param key - The name of the key in vault.
     * @returns Promise resolving with the value of the key in vault.
     */
    vaultRead(key: string): Promise<string>;
    /**
     * Get the value of a key in vault.
     *
     * @async
     * @param key - The name of the key in vault.
     * @param value - The value to assign to the key in vault.
     */
    vaultWrite(key: string, value: string): Promise<void>;
    protected generateClient(): GRPCClientConstructor<VaultGRPCClient>;
    protected serviceName(): string;
}
