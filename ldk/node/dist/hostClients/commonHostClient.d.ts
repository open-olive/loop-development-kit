import { ConnInfo } from '../grpc/broker_pb';
import { Session } from '../grpc/session_pb';
import { Logger } from '../logging';
/**
 * @internal
 */
export interface CommonHostClient {
    connect(conn: ConnInfo.AsObject, session: Session.AsObject, logger: Logger): Promise<void>;
}
