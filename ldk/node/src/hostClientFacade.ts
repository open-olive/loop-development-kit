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
  private logger: Logger;

  public clipboard: ClipboardClient = new ClipboardClient();

  public cursor: CursorClient = new CursorClient();

  public fileSystem: FileSystemClient = new FileSystemClient();

  public keyboard: KeyboardClient = new KeyboardClient();

  public network: NetworkClient = new NetworkClient();

  public process: ProcessClient = new ProcessClient();

  public ui: UIClient = new UIClient();

  public vault: VaultClient = new VaultClient();

  public whisper: WhisperClient = new WhisperClient();

  public window: WindowClient = new WindowClient();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public connect(
    connInfo: ConnInfo.AsObject,
    session: Session.AsObject,
  ): Promise<void[]> {
    return Promise.all([
      this.clipboard.connect(connInfo, session, this.logger),
      this.cursor.connect(connInfo, session, this.logger),
      this.fileSystem.connect(connInfo, session, this.logger),
      this.keyboard.connect(connInfo, session, this.logger),
      this.network.connect(connInfo, session, this.logger),
      this.process.connect(connInfo, session, this.logger),
      this.ui.connect(connInfo, session, this.logger),
      this.vault.connect(connInfo, session, this.logger),
      this.whisper.connect(connInfo, session, this.logger),
      this.window.connect(connInfo, session, this.logger),
    ]);
  }
}
