import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StorageClient as StorageGRPCClient } from '../grpc/storage_grpc_pb';
import { StorageSensor } from './storageSensor';
/**
 * @internal
 */
export default class StorageClient extends BaseClient<StorageGRPCClient> implements StorageSensor {
    /**
     * Delete a key from storage.
     *
     * @async
     * @param key - The name of the key in storage.
     */
    storageDelete(key: string): Promise<void>;
    /**
     * Check if a key has a value defined in storage.
     *
     * @async
     * @param key - The name of the key in storage.
     * @returns Returns true if the key has a defined value.
     */
    storageExists(key: string): Promise<boolean>;
    /**
     * Get the value of a key in storage.
     *
     * @param key - The name of the key in storage.
     * @returns Promise resolving with the value of the key in storage.
     */
    storageRead(key: string): Promise<string>;
    /**
     * Get the value of a key in storage.
     *
     * @async
     * @param key - The name of the key in storage.
     * @param value - The value to assign to the key in storage.
     */
    storageWrite(key: string, value: string): Promise<void>;
    protected generateClient(): GRPCClientConstructor<StorageGRPCClient>;
    protected sensorName(): string;
}
