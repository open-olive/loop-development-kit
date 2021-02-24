import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { Aptitudes } from './aptitudes';
import WhisperClient from './aptitudes/whisperClient';
import VaultClient from './aptitudes/vaultClient';
import KeyboardClient from './aptitudes/keyboardClient';
import { ClipboardClient } from './aptitudes/clipboardClient';
import { CursorClient } from './aptitudes/cursorClient';
import { FileSystemClient } from './aptitudes/fileSystemClient';
import { ProcessClient } from './aptitudes/processClient';
import { NetworkClient } from './aptitudes/networkClient';
import { UIClient } from './aptitudes/uiClient';
import { Logger } from './logging';
/**
 * @internal
 */
export default class AptitudeClients implements Aptitudes {
    private logger;
    whisper: WhisperClient;
    vault: VaultClient;
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
