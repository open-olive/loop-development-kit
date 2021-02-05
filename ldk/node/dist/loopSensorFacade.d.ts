import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { LoopSensors } from './loopSensors';
import WhisperClient from './loopClients/whisperClient';
import StorageClient from './loopClients/storageClient';
import KeyboardClient from './loopClients/keyboardClient';
import { ClipboardClient } from './loopClients/clipboardClient';
import { CursorClient } from './loopClients/cursorClient';
import { FileSystemClient } from './loopClients/fileSystemClient';
import { ProcessClient } from './loopClients/processClient';
import { NetworkClient } from './loopClients/networkClient';
import { UIClient } from './loopClients/uiClient';
import { Logger } from './logging';
/**
 * @internal
 */
export default class LoopSensorFacade implements LoopSensors {
    private logger;
    whisper: WhisperClient;
    storage: StorageClient;
    keyboard: KeyboardClient;
    clipboard: ClipboardClient;
    cursor: CursorClient;
    fileSystem: FileSystemClient;
    process: ProcessClient;
    ui: UIClient;
    constructor(logger: Logger);
    network: NetworkClient;
    connect(connInfo: ConnInfo.AsObject, session: Session.AsObject): Promise<void[]>;
}
