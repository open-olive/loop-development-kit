import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { VaultClient as VaultGRPCClient } from '../grpc/vault_grpc_pb';
import messages from '../grpc/vault_pb';
import { VaultService } from './vaultService';

/**
 * @internal
 */
export default class VaultClient
  extends BaseClient<VaultGRPCClient>
  implements VaultService {
  /**
   * Delete a key from vault.
   *
   * @async
   * @param key - The name of the key in vault.
   */
  vaultDelete(key: string): Promise<void> {
    return this.buildQuery<messages.VaultDeleteRequest, Empty, void>(
      (message, callback) => this.client.vaultDelete(message, callback),
      () => {
        const msg = new messages.VaultDeleteRequest();
        msg.setKey(key);
        return msg;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  /**
   * Check if a key has a value defined in vault.
   *
   * @async
   * @param key - The name of the key in vault.
   * @returns Returns true if the key has a defined value.
   */
  vaultExists(key: string): Promise<boolean> {
    return this.buildQuery<
      messages.VaultExistsRequest,
      messages.VaultExistsResponse,
      boolean
    >(
      (message, callback) => this.client.vaultExists(message, callback),
      () => {
        const msg = new messages.VaultExistsRequest();
        msg.setKey(key);
        return msg;
      },
      (response) => response.getExists(),
    );
  }

  /**
   * Get the value of a key in vault.
   *
   * @param key - The name of the key in vault.
   * @returns Promise resolving with the value of the key in vault.
   */
  vaultRead(key: string): Promise<string> {
    return this.buildQuery<
      messages.VaultReadRequest,
      messages.VaultReadResponse,
      string
    >(
      (message, callback) => this.client.vaultRead(message, callback),
      () => {
        const msg = new messages.VaultReadRequest();
        msg.setKey(key);
        return msg;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (response) => response.getValue(),
    );
  }

  /**
   * Get the value of a key in vault.
   *
   * @async
   * @param key - The name of the key in vault.
   * @param value - The value to assign to the key in vault.
   */
  vaultWrite(key: string, value: string): Promise<void> {
    return this.buildQuery<messages.VaultWriteRequest, Empty, void>(
      (message, callback) => this.client.vaultWrite(message, callback),
      () => {
        const msg = new messages.VaultWriteRequest();
        msg.setKey(key);
        msg.setValue(value);
        return msg;
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  protected generateClient(): GRPCClientConstructor<VaultGRPCClient> {
    return VaultGRPCClient;
  }

  protected serviceName(): string {
    return 'vault';
  }
}
