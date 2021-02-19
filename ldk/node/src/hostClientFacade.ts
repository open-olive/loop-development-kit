import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { HostServices } from './hostServices';
import WhisperClient from './hostClients/whisperClient';
import StorageClient from './hostClients/storageClient';
import KeyboardClient from './hostClients/keyboardClient';
import { ClipboardClient } from './hostClients/clipboardClient';
import { CursorClient } from './hostClients/cursorClient';
// import { HoverClient } from './hostClients/hoverClient';
import { FileSystemClient } from './hostClients/fileSystemClient';
import { ProcessClient } from './hostClients/processClient';
// import { WindowClient } from './hostClients/windowClient';
// import { BrowserClient } from './hostClients/browserClient';
import { NetworkClient } from './hostClients/networkClient';
import { UIClient } from './hostClients/uiClient';
import { Logger } from './logging';

/**
 * @internal
 */
export default class HostClientFacade implements HostServices {
  private logger: Logger;

  public whisper: WhisperClient = new WhisperClient();

  public storage: StorageClient = new StorageClient();

  public keyboard: KeyboardClient = new KeyboardClient();

  public clipboard: ClipboardClient = new ClipboardClient();

  public cursor: CursorClient = new CursorClient();

  public fileSystem: FileSystemClient = new FileSystemClient();

  public process: ProcessClient = new ProcessClient();

  public ui: UIClient = new UIClient();

  // These services are not yet implemented.
  // public hover: HoverClient = new HoverClient();

  // public window: WindowClient = new WindowClient();

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
      this.storage.connect(connInfo, session, this.logger),
      this.clipboard.connect(connInfo, session, this.logger),
      this.keyboard.connect(connInfo, session, this.logger),
      this.process.connect(connInfo, session, this.logger),
      this.cursor.connect(connInfo, session, this.logger),
      this.fileSystem.connect(connInfo, session, this.logger),
      this.network.connect(connInfo, session, this.logger),
      this.ui.connect(connInfo, session, this.logger),
    ]);
  }
}
