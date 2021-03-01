import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { Aptitudes } from './aptitudes';
import WhisperClient from './aptitudes/whisperClient';
import VaultClient from './aptitudes/vaultClient';
import KeyboardClient from './aptitudes/keyboardClient';
import { ClipboardClient } from './aptitudes/clipboardClient';
import { CursorClient } from './aptitudes/cursorClient';
// import { HoverClient } from './aptitudes/hoverClient';
import { FileSystemClient } from './aptitudes/fileSystemClient';
import { ProcessClient } from './aptitudes/processClient';
// import { BrowserClient } from './aptitudes/browserClient';
import { NetworkClient } from './aptitudes/networkClient';
import { UIClient } from './aptitudes/uiClient';
import { Logger } from './logging';
import { WindowClient } from './aptitudes/windowClient';

/**
 * @internal
 */
export default class AptitudeClients implements Aptitudes {
  private logger: Logger;

  public whisper: WhisperClient = new WhisperClient();

  public vault: VaultClient = new VaultClient();

  public keyboard: KeyboardClient = new KeyboardClient();

  public clipboard: ClipboardClient = new ClipboardClient();

  public cursor: CursorClient = new CursorClient();

  public fileSystem: FileSystemClient = new FileSystemClient();

  public process: ProcessClient = new ProcessClient();

  public ui: UIClient = new UIClient();

  public window: WindowClient = new WindowClient();

  // These services are not yet implemented.
  // public hover: HoverClient = new HoverClient();
  // public browser: BrowserClient = new BrowserClient();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public network: NetworkClient = new NetworkClient();

  public connect(
    connInfo: ConnInfo.AsObject,
    session: Session.AsObject,
  ): Promise<void[]> {
    return Promise.all([
      // These services are not yet implemented.
      // this.browser.connect(connInfo, session, this.logger),
      // this.hover.connect(connInfo, session, this.logger),
      // this.window.connect(connInfo, session, this.logger),
      this.whisper.connect(connInfo, session, this.logger),
      this.vault.connect(connInfo, session, this.logger),
      this.clipboard.connect(connInfo, session, this.logger),
      this.keyboard.connect(connInfo, session, this.logger),
      this.process.connect(connInfo, session, this.logger),
      this.cursor.connect(connInfo, session, this.logger),
      this.fileSystem.connect(connInfo, session, this.logger),
      this.network.connect(connInfo, session, this.logger),
    ]);
  }
}
