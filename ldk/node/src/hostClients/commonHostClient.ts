import { ConnInfo } from '../grpc/broker_pb';
import { Session } from '../grpc/session_pb';

/**
 * @internal
 */
export interface CommonHostClient {
  connect(conn: ConnInfo.AsObject, session: Session.AsObject): Promise<void>;
}
