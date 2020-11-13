import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StorageClient as StorageGRPCClient } from '../grpc/storage_grpc_pb';
import messages from '../grpc/storage_pb';
import { StorageService } from './storageService';

/**
 * @internal
 */
export default class StorageClient
  extends BaseClient<StorageGRPCClient>
  implements StorageService {
  /**
   * Delete a key from storage.
   *
   * @async
   * @param key - The name of the key in storage.
   */
  storageDelete(key: string): Promise<void> {
    return this.buildQuery<messages.StorageDeleteRequest, Empty, void>(
      (message, callback) => this.client.storageDelete(message, callback),
      () => {
        const msg = new messages.StorageDeleteRequest();
        msg.setKey(key);
        return msg;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  /**
   * Delete all keys from storage.
   */
  storageDeleteAll(): Promise<void> {
    return this.buildQuery<messages.StorageDeleteAllRequest, Empty, void>(
      (message, callback) => this.client.storageDeleteAll(message, callback),
      () => new messages.StorageDeleteAllRequest(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  /**
   * Check if a key has a value defined in storage.
   *
   * @async
   * @param key - The name of the key in storage.
   * @returns Returns true if the key has a defined value.
   */
  storageHasKey(key: string): Promise<boolean> {
    return this.buildQuery<
      messages.StorageHasKeyRequest,
      messages.StorageHasKeyResponse,
      boolean
    >(
      (message, callback) => this.client.storageHasKey(message, callback),
      () => {
        const msg = new messages.StorageHasKeyRequest();
        msg.setKey(key);
        return msg;
      },
      (response) => response.getHaskey(),
    );
  }

  /**
   * Return a list of all keys.
   *
   * @async
   * @returns {string[]} - An array of the keys.
   */
  storageKeys(): Promise<string[]> {
    return this.buildQuery<
      messages.StorageKeysRequest,
      messages.StorageKeysResponse,
      string[]
    >(
      (message, callback) => this.client.storageKeys(message, callback),
      () => new messages.StorageKeysRequest(),
      (response) => response.getKeysList(),
    );
  }

  /**
   * Get the value of a key in storage.
   *
   * @param key - The name of the key in storage.
   * @returns Promise resolving with the value of the key in storage.
   */
  storageRead(key: string): Promise<string> {
    return this.buildQuery<
      messages.StorageReadRequest,
      messages.StorageReadResponse,
      string
    >(
      (message, callback) => this.client.storageRead(message, callback),
      () => {
        const msg = new messages.StorageReadRequest();
        msg.setKey(key);
        return msg;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (response) => response.getValue(),
    );
  }

  /**
   * Get an object of key value pairs in storage.
   *
   * @async
   * @returns Returns the storage object. Each key in the object
   * is a key in storage and the value of the key is the value in storage.
   */
  storageReadAll(): Promise<{ [index: string]: string }> {
    return this.buildQuery<
      messages.StorageReadAllRequest,
      messages.StorageReadAllResponse,
      { [index: string]: string }
    >(
      (message, callback) => this.client.storageReadAll(message, callback),
      () => new messages.StorageReadAllRequest(),
      (response) => {
        const entries = response
          .getEntriesMap()
          .toObject()
          .reduce((acc: { [index: string]: string }, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
        return entries;
      },
    );
  }

  /**
   * Get the value of a key in storage.
   *
   * @async
   * @param key - The name of the key in storage.
   * @param value - The value to assign to the key in storage.
   */
  storageWrite(key: string, value: string): Promise<void> {
    return this.buildQuery<messages.StorageWriteRequest, Empty, void>(
      (message, callback) => this.client.storageWrite(message, callback),
      () => {
        const msg = new messages.StorageWriteRequest();
        msg.setKey(key);
        msg.setValue(value);
        return msg;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  protected generateClient(): GRPCClientConstructor<StorageGRPCClient> {
    return StorageGRPCClient;
  }
}
