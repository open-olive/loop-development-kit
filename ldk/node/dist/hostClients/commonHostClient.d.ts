import { ConnInfo } from '../grpc/broker_pb';
/**
 * @internal
 */
export interface CommonHostClient {
    connect(conn: ConnInfo.AsObject): Promise<void>;
}
