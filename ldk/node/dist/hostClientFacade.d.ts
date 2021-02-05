import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { HostSensors } from './hostSensors';
import WhisperClient from './hostClients/whisperClient';
import StorageClient from './hostClients/storageClient';
import KeyboardClient from './hostClients/keyboardClient';
import { ClipboardClient } from './hostClients/clipboardClient';
import { CursorClient } from './hostClients/cursorClient';
import { FileSystemClient } from './hostClients/fileSystemClient';
import { ProcessClient } from './hostClients/processClient';
import { NetworkClient } from './hostClients/networkClient';
import { UIClient } from './hostClients/uiClient';
import { Logger } from './logging';
/**
 * @internal
 */
export default class HostClientFacade implements HostSensors {
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
