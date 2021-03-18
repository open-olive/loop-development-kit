import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { HostServices } from './hostServices';
import { Logger } from './logging';
import { ClipboardClient } from './hostClients/clipboardClient';
import { CursorClient } from './hostClients/cursorClient';
import { FileSystemClient } from './hostClients/fileSystemClient';
import { KeyboardClient } from './hostClients/keyboardClient';
import { NetworkClient } from './hostClients/networkClient';
import { ProcessClient } from './hostClients/processClient';
import { UIClient } from './hostClients/uiClient';
import { VaultClient } from './hostClients/vaultClient';
import { WhisperClient } from './hostClients/whisperClient';
import { WindowClient } from './hostClients/windowClient';
/**
 * @internal
 */
export default class HostClientFacade implements HostServices {
    private logger;
    clipboard: ClipboardClient;
    cursor: CursorClient;
    fileSystem: FileSystemClient;
    keyboard: KeyboardClient;
    network: NetworkClient;
    process: ProcessClient;
    ui: UIClient;
    vault: VaultClient;
    whisper: WhisperClient;
    window: WindowClient;
    constructor(logger: Logger);
    connect(connInfo: ConnInfo.AsObject, session: Session.AsObject): Promise<void[]>;
}
